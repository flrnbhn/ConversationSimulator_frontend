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
import {Title} from "../util/title/Title";

export const RegistrationView = () => {
    const navigate = useNavigate();
    const {postRegistration, learnerId, setLearnerId, getLearnerById} = useLearner();
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
        getLearnerById();
    }

    const navToLogin = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/login');
    }

    return (
        <div className={css.formContainer}>
            <Title title={"Registrieren"}/>
            <div className={css.formContent}>
                <form>
                    <div>
                        <div className={css.formGroup}>
                            <div><label className={css.formLabel}>Gebe deinen Benutzernamen ein:</label></div>
                            <div><input className={css.formInput} value={nameState}
                                        onChange={(event) => nameStateChanged(event)}/></div>
                        </div>
                        <div><label className={css.formLabel}>Welche Sprache möchtest du lernen?</label></div>
                        <div>
                            <select className={css.select} value={learningLanguageState}
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
                        <div><PrimaryButton buttonFunction={registrate} title={"Registrieren"} disabled={false}/>
                        </div>
                        <div className={css.formGroup}>
                            <a className={css.formLink} href="/login"
                               onClick={navToLogin}>Anmeldung</a>
                        </div>
                        <div className={css.errorMessage}>{errorString}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}