import React, {useEffect} from "react";
import {useEvaluation} from "../../../hooks/evaluationhook/useEvaluation";
import {MistakeTile} from "../mistaketile/MistakeTile";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {useNavigate} from "react-router";

export const EvaluationView = () => {

    const {postConversationIdToGetLanguageCheck, mistakeResponseDTOs} = useEvaluation();
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
                {mistakeResponseDTOs.map((mistake, index) => (
                    <div key={index}>
                        <MistakeTile mistake={mistake}/>
                    </div>
                ))}
            </div>
            <div>
                <PrimaryButton buttonFunction={goBackToExerciseOverview} title={"Zurück zu den Übungen"}
                               disabled={false}/>
            </div>
        </div>
    )
}
