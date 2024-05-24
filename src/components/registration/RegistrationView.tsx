import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import css from "./RegistrationView.module.css"
import {useNavigate} from "react-router";

export const RegistrationView = () => {
    const navigate = useNavigate();
    const {postRegistration, learnerId} = useLearner();
    const [nameState, setNameState] = useState<string>("");
    const [learningLanguageState, setLearningLanguageState] = useState<string>("");
    const [errorString, setErrorString] = useState<string>("");

    useEffect(() => {
        if (learnerId === -1) {
            setErrorString("Username existiert bereits")
        }
        if (learnerId !== -1 && learnerId !== null) {
            navigate('/exercises');
        }
    }, [learnerId]);

    const nameStateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNameState(event.target.value);
    }

    const learningLanguageStateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLearningLanguageState(event.target.value);
    }

    const registrate = () => {
        postRegistration(nameState, learningLanguageState);
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
                        <div><input value={learningLanguageState}
                                    onChange={(event) => learningLanguageStateChanged(event)}/></div>
                        <div><PrimaryButton buttonFunction={registrate} title={"Registrieren"} disabled={false}/></div>
                        <div className={css.errorMessage}>{errorString}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}