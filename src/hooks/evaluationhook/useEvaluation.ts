import {useContext, useState} from "react";
import {ConversationContext} from "../../context/conversationcontext/ConversationContext";
import axios from "axios";
import {EvaluationResponseDTO} from "../../types/evaluationdata/EvaluationResponseDTO";

export const useEvaluation = () => {

    const {currentConversationId} = useContext(ConversationContext)!;
    const [evaluationResponseDTO, setEvaluationResponseDTO] = useState<EvaluationResponseDTO>();

    function postConversationIdToGetLanguageCheck() {
        axios.post<EvaluationResponseDTO>("/evaluation/" + currentConversationId)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setEvaluationResponseDTO(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    return {
        postConversationIdToGetLanguageCheck,
        evaluationResponseDTO
    };

}
