import React, {ChangeEvent, useEffect, useState} from "react";
import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";
import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import css from "./LoginView.module.css";
import {Title} from "../util/title/Title";

export const LoginView = () => {
    const {postLogin, learnerId, getLearnerById} = useLearner();
    const navigate = useNavigate();
    const [nameState, setNameState] = useState<string>("");
    const [errorString, setErrorString] = useState<string>("");
    const [loginTried, setLoginTried] = useState(false);

    useEffect(() => {
        if (learnerId === -1 && loginTried) {
            setErrorString("Der angegebene User existiert nicht.")
            setLoginTried(false);
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
        getLearnerById();
        setLoginTried(true);
    }
    return (
        <div className={css.formContainer}>
            <Title title={"Anmeldung"}/>
            <div className={css.formContent}>
                <form>
                    <div className={css.formGroup}>
                        <label className={css.formLabel}>Gebe deinen Benutzernamen ein:</label>
                        <input
                            className={css.formInput}
                            value={nameState}
                            onChange={(event) => nameStateChanged(event)}
                        />
                    </div>
                    <div className={css.formGroup}>
                        <PrimaryButton
                            buttonFunction={login}
                            title={"Anmelden"}
                            disabled={false}
                        />
                    </div>
                    <div className={css.formGroup}>
                        <a className={css.formLink} href="/registration" onClick={navToRegistration}>Registrieren</a>
                    </div>
                    {errorString && <div className={css.errorMessage}>{errorString}</div>}
                </form>
            </div>
        </div>
    );
};
