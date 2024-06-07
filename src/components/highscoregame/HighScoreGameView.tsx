import {useConversation} from "../../hooks/conversationhook/useConversation";
import React, {useContext, useEffect} from "react";
import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";
import {StylingContext} from "../../context/stylingcontext/StylingContext";
import css from "./HighScoreGameView.module.css"

export const HighScoreGameView = () => {
    const navigate = useNavigate();
    const {setCurrentHeadline} = useContext(StylingContext)!
    const {isLighMode} = useContext(StylingContext)!

    const {
        highScoreConversation,
        postHighscoreConversation,
        postNewConversation,
        setIsHighscore,
        deleteConversation
    } = useConversation();

    const enterConversation = (exerciseId: number) => {
        setIsHighscore(true);
        navigate('/chat');
    }

    const goBack = () => {
        navigate('/home');
        deleteConversation();
    }

    useEffect(() => {
        setCurrentHeadline("Highscore Spiel")
        postHighscoreConversation();
    }, []);

    return (
        <div>
            <div className={isLighMode ? css.explanationContainer_white : css.explanationContainer_black}>
                <div className={isLighMode ? css.szenarioContainer_white : css.szenarioContainer_black}>
                    <div className={css.szenarioHeader}>
                        Szenario
                    </div>
                    <div>{highScoreConversation?.szenario} </div>
                </div>
                <div className={css.roles}>
                    <div className={isLighMode ? css.yourRoleContainer_white : css.systemRoleContainer_black}>
                        <div className={css.yourRoleHeader}>
                            Du bist
                        </div>
                        <div className={css.yourRole}>{highScoreConversation?.roleUser}</div>
                    </div>
                    <div className={isLighMode ? css.systemRoleContainer_white : css.systemRoleContainer_black}>
                        <div className={css.systemRoleHeader}>
                            Das System ist
                        </div>
                        <div className={css.systemRole}>{highScoreConversation?.roleSystem}</div>

                    </div>
                </div>
            </div>
            <div className={css.startButton}>
                <PrimaryButton buttonFunction={enterConversation} title={"Starten"} disabled={false}/>
            </div>
            <div>
                <PrimaryButton buttonFunction={goBack} title={"Zurück"} disabled={false}/>
            </div>
        </div>
    )
}
