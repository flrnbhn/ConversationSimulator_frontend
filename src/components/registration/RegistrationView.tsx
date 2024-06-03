import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import css from "./RegistrationView.module.css"
import {useNavigate} from "react-router";
import {
    getLearningLanguageEnum,
    getLearningLanguageValue,
    LearningLanguage
} from "../../types/learnerdata/LearningLanguage";

export const RegistrationView = () => {
    const navigate = useNavigate();
    const {postRegistration, learnerId, setLearnerId} = useLearner();
    const [nameState, setNameState] = useState<string>("");
    const [learningLanguageState, setLearningLanguageState] = useState<string>("Englisch");
    const [errorString, setErrorString] = useState<string>("");

    useEffect(() => {
        if (learnerId === -1) {
            setErrorString("Username existiert bereits")
        }
        if (learnerId !== -1 && learnerId !== null) {
            navigate('/home');
        }
        if (learnerId === null) {
            setErrorString("");
        }

    }, [learnerId]);

    useEffect(() => {
        if (learnerId === -1) {
            setLearnerId(null);
        }
    }, []);

    const nameStateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNameState(event.target.value);
    }

    const learningLanguageStateChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        setLearningLanguageState(event.target.value);

    }

    const registrate = () => {
        postRegistration(nameState, getLearningLanguageEnum(learningLanguageState));
    }
    return (
        <div>
            <h2>Registrieren</h2>
            <div>
                <form>
                    <div>
                        <div><label>Gebe deinen Benutzernamen ein:</label></div>
                        <div><input value={nameState} onChange={(event) => nameStateChanged(event)}/></div>
                        <div><label>Welche Sprache möchtest du lernen?</label></div>
                        <div>
                            <select value={learningLanguageState}
                                    onChange={(event) => learningLanguageStateChanged(event)}>
                                <option value="">Bitte wählen</option>
                                <option
                                    value={getLearningLanguageValue(LearningLanguage.GERMAN)}>{getLearningLanguageValue(LearningLanguage.GERMAN)}</option>
                                <option
                                    value={getLearningLanguageValue(LearningLanguage.ENGLISH)}>{getLearningLanguageValue(LearningLanguage.ENGLISH)}</option>
                                <option
                                    value={getLearningLanguageValue(LearningLanguage.FRENCH)}>{getLearningLanguageValue(LearningLanguage.FRENCH)}</option>
                                <option
                                    value={getLearningLanguageValue(LearningLanguage.SPANISH)}>{getLearningLanguageValue(LearningLanguage.SPANISH)}</option>
                            </select>
                        </div>
                        <div><PrimaryButton buttonFunction={registrate} title={"Registrieren"} disabled={false}/></div>
                        <div className={css.errorMessage}>{errorString}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}