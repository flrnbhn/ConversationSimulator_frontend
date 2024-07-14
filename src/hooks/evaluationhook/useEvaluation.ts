import {useContext, useState} from "react";
import {ConversationContext} from "../../context/conversationcontext/ConversationContext";
import axios from "axios";
import {EvaluationResponseDTO} from "../../types/evaluationdata/EvaluationResponseDTO";
import {MistakeResponseDTO} from "../../types/evaluationdata/mistakedata/MistakeResponseDTO";

/**
 * Custom-Hook that interacts with evaluation module from the backend
 */
export const useEvaluation = () => {

    const {currentConversationId} = useContext(ConversationContext)!;
    const [evaluationResponseDTO, setEvaluationResponseDTO] = useState<EvaluationResponseDTO>();
    const [mistakeHighscoreDTOs, setMistakeHighscoreDTOs] = useState<MistakeResponseDTO[]>([]);


    function postConversationIdToGetLanguageCheck() {
        axios.post<EvaluationResponseDTO>("/evaluation/" + currentConversationId)
            .then(res => res.data)
            .then(data => {
                setEvaluationResponseDTO(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function postConversationIdToGetLanguageCheckForHighscoreGame() {
        axios.post<MistakeResponseDTO[]>("/evaluation/highscore/" + currentConversationId)
            .then(res => res.data)
            .then(data => {
                setMistakeHighscoreDTOs(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    return {
        postConversationIdToGetLanguageCheck,
        evaluationResponseDTO,
        postConversationIdToGetLanguageCheckForHighscoreGame,
        mistakeHighscoreDTOs
    };

}
