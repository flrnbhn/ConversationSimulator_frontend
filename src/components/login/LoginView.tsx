import React, {ChangeEvent, useEffect, useState} from "react";
import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";
import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import css from "../registration/RegistrationView.module.css";

export const LoginView = () => {
    const {postLogin, learnerId} = useLearner();
    const navigate = useNavigate();
    const [nameState, setNameState] = useState<string>("");
    const [errorString, setErrorString] = useState<string>("");

    useEffect(() => {
        if (learnerId === -1) {
            setErrorString("Der angegebene User existiert nicht")
        }
        if (learnerId !== -1 && learnerId !== null) {
            navigate('/home');
        }
    }, [learnerId]);

    const navToRegistration = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/registration');
    };

    const nameStateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNameState(event.target.value);
    }

    const login = () => {
        postLogin(nameState);
    }
    return (
        <div>
            <h2>Anmeldung</h2>
            <div>
                <form>
                    <div>
                        <div><label>Gebe deinen Benutzernamen ein:</label></div>
                        <div><input value={nameState} onChange={(event) => nameStateChanged(event)}/></div>
                        <div><PrimaryButton buttonFunction={login} title={"Anmelden"} disabled={false}/></div>
                        <a href="/registration" onClick={navToRegistration}>Registrieren</a>
                        <div className={css.errorMessage}>{errorString}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
