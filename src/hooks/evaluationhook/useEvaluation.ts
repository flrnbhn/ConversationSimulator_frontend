import {useContext, useState} from "react";
import {ConversationContext} from "../../context/conversationcontext/ConversationContext";
import axios from "axios";
import {MistakeResponseDTO} from "../../types/evaluationdata/mistakedata/MistakeResponseDTO";

export const useEvaluation = () => {

    const {currentConversationId} = useContext(ConversationContext)!;
    const [mistakeResponseDTOs, setMistakeResponseDTOs] = useState<MistakeResponseDTO[]>([]);

    function postConversationIdToGetLanguageCheck() {
        axios.post<MistakeResponseDTO[]>("/evaluation/" + currentConversationId)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setMistakeResponseDTOs(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    return {
        postConversationIdToGetLanguageCheck,
        mistakeResponseDTOs
    };

}
