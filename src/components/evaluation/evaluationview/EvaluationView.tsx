import React, {useEffect} from "react";
import {useEvaluation} from "../../../hooks/evaluationhook/useEvaluation";
import {MistakeTile} from "../mistaketile/MistakeTile";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";
import {getGradeValue} from "../../../types/evaluationdata/Grade";


export const EvaluationView = () => {

    const {postConversationIdToGetLanguageCheck, evaluationResponseDTO} = useEvaluation();
    const navigate = useNavigate();

    const goBackToExerciseOverview = () => {
        navigate('/exercises');
    }

    useEffect(() => {
        postConversationIdToGetLanguageCheck();
    }, []);


    return (
        <div>
            <h2>Übungsauswertung</h2>
            <div>
                {evaluationResponseDTO?.mistakeResponseDTOS.map((mistake, index) => (
                    <div key={index}>
                        <MistakeTile mistake={mistake}/>
                    </div>
                ))}
            </div>
            <div>
                Ai Bewertung: {evaluationResponseDTO?.evaluation}
            </div>
            <div>
                <div>Note: {parseFloat(getGradeValue(evaluationResponseDTO?.grade) || '0.0')}</div>
                <div>Punkte: {evaluationResponseDTO?.points}</div>

            </div>
            <div>
                <PrimaryButton buttonFunction={goBackToExerciseOverview} title={"Zurück zu den Übungen"}
                               disabled={false}/>
            </div>
        </div>
    )
}
