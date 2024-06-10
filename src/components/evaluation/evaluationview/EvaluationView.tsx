import React, {useContext, useEffect} from "react";
import {useEvaluation} from "../../../hooks/evaluationhook/useEvaluation";
import {MistakeTile} from "../mistaketile/MistakeTile";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";
import {getGradeValue} from "../../../types/evaluationdata/Grade";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";
import css from "./EvaluationView.module.css";
import {LoadingBar} from "../../util/loadingbar/LoadingBar";
import {useConversation} from "../../../hooks/conversationhook/useConversation";


export const EvaluationView = () => {

    const {postConversationIdToGetLanguageCheck, evaluationResponseDTO} = useEvaluation();
    const navigate = useNavigate();
    const {setCurrentHeadline, isLighMode} = useContext(StylingContext)!
    const {isHighscore} = useConversation();


    const goBackToExerciseOverview = () => {
        navigate('/exercises');
    }

    const goBackToHome = () => {
        navigate('/home');
    }

    useEffect(() => {
        setCurrentHeadline("Übungsauswertung");
        postConversationIdToGetLanguageCheck();
    }, []);

    const textWithHeader = (evaluationString: string) => {
        const parts: string[] = evaluationString.split('**');
        return (
            <div>
                {parts.map((part, index) => {
                    if (index % 2 === 0) {
                        return <div className={css.aiDescription} key={index}>{part}</div>;
                    } else {
                        return <div className={css.aiHeader} key={index}>{part}</div>;
                    }
                })}
            </div>
        );
    }


    return (
        evaluationResponseDTO === undefined || evaluationResponseDTO === null
            ?
            <LoadingBar/>
            :
            <div className={css.evaluationContainer}>
                <div>
                    {evaluationResponseDTO?.mistakeResponseDTOS.map((mistake, index) => (
                        <div key={index}>
                            <MistakeTile mistake={mistake}/>
                        </div>
                    ))}
                </div>
                <div className={isLighMode ? css.aiEvaluationContainer_white : css.aiEvaluationContainer_black}>
                    <div className={isLighMode ? css.aiEvaluationHeadline_white : css.aiEvaluationHeadline_black}>
                        Verbesserungsvorschläge
                    </div>
                    {evaluationResponseDTO !== undefined ? textWithHeader(evaluationResponseDTO.evaluation) : ""}

                </div>
                {!isHighscore
                    ?
                    <div className={css.evaluationCountExplanation}>{evaluationResponseDTO.translationCount > 0
                        ?
                        "Du hast die Übersetzungsfunktion " + evaluationResponseDTO.translationCount + "x genutzt. Um fair zu bleiben wirkt sich dies leicht auf deine Note und deine Punkte aus"
                        : ""}</div>
                    :
                    ""}
                {!isHighscore
                    ?
                    <div className={isLighMode ? css.gradeAndPointBox_white : css.gradeAndPointBox_black}>
                        <div>Note: {parseFloat(getGradeValue(evaluationResponseDTO?.grade) || '0.0')}</div>
                        <hr className={css.seperator}/>

                        <div className={css.points}>Punkte: {evaluationResponseDTO?.points}</div>
                    </div>
                    : ""}
                <div className={css.backToExerciseButton}>
                    <PrimaryButton buttonFunction={!isHighscore ? goBackToExerciseOverview : goBackToHome}
                                   title={!isHighscore ? "Zurück zu den Übungen" : "Zurück zur Startseite"}
                                   disabled={false}/>
                </div>
            </div>
    )
}
