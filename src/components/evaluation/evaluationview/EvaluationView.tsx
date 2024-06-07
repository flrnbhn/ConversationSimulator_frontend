import React, {useContext, useEffect} from "react";
import {useEvaluation} from "../../../hooks/evaluationhook/useEvaluation";
import {MistakeTile} from "../mistaketile/MistakeTile";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";
import {getGradeValue} from "../../../types/evaluationdata/Grade";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";
import css from "./EvaluationView.module.css";


export const EvaluationView = () => {

    const {postConversationIdToGetLanguageCheck, evaluationResponseDTO} = useEvaluation();
    const navigate = useNavigate();
    const {setCurrentHeadline, isLighMode} = useContext(StylingContext)!


    const goBackToExerciseOverview = () => {
        navigate('/exercises');
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
            <div className={isLighMode ? css.gradeAndPointBox_white : css.gradeAndPointBox_black}>
                <div>Note: {parseFloat(getGradeValue(evaluationResponseDTO?.grade) || '0.0')}</div>
                <hr className={css.seperator}/>

                <div className={css.points}>Punkte: {evaluationResponseDTO?.points}</div>

            </div>
            <div className={css.backToExerciseButton}>
                <PrimaryButton buttonFunction={goBackToExerciseOverview} title={"Zurück zu den Übungen"}
                               disabled={false}/>
            </div>
        </div>
    )
}
