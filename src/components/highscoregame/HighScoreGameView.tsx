import {useConversation} from "../../hooks/conversationhook/useConversation";
import React, {useEffect} from "react";
import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";

export const HighScoreGameView = () => {
    const navigate = useNavigate();
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
        postHighscoreConversation();
    }, []);

    return (
        <div>
            <div>
                <h2> Highscore Spiel </h2>
            </div>
            <div>
                <p>Szenario: {highScoreConversation?.szenario} </p>
                <p>Du bist: {highScoreConversation?.roleUser}</p>
                <p>Das System ist: {highScoreConversation?.roleSystem}</p>
            </div>
            <div>
                <PrimaryButton buttonFunction={enterConversation} title={"starten"} disabled={false}/>
            </div>
            <div>
                <PrimaryButton buttonFunction={goBack} title={"Zurück"} disabled={false}/>
            </div>
        </div>
    )
}
