import {useEffect, useState} from "react";
import {MessageData} from "../../types/messagedata/MessageData";
import {ConversationMember} from "../../types/conversationmember/ConversationMember";
import axios from "axios";
import {ConversationData} from "../../types/conversationdata/ConversationData";


export const useConversation = () => {

    const [newConversationResponseState, setNewConversationResponseState] = useState<MessageData>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null
    });
    const [newConversationRequestState, setNewConversationRequestState] = useState<MessageData>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null
    });
    const [allMessagesState, setAllMessagesState] = useState<MessageData[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null)

    useEffect(() => {
        console.log(allMessagesState);
    }, [allMessagesState]);

    function sendNewMessage(message: string | null) {
        const newConversationRequestMessage = {
            message: message,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId
        }
        const updatedMessagesState = updateMessagesState(newConversationRequestMessage);
        setNewConversationRequestState(newConversationRequestMessage)
        postMessageResponse(newConversationRequestMessage, updatedMessagesState);
    }

    function updateMessagesState(messageData: MessageData): MessageData[] {
        const updatedMessagesState = [...allMessagesState, messageData];
        setAllMessagesState(updatedMessagesState);
        return updatedMessagesState;
    }

    function postMessageResponse(newConversationRequestMessage: MessageData, updatedMessagesState: MessageData[]) {
        axios.post<MessageData>('/conversation/newMessage', newConversationRequestMessage)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const updatedMessagesWithResponse = [...updatedMessagesState, data];
                setAllMessagesState(updatedMessagesWithResponse);
                setNewConversationResponseState(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    function postNewConversation() {
        const newConversation: ConversationData = {conversationStartDate: new Date()};

        axios.post<number>("/conversation", newConversation)
            .then(response => {
                return response.data;
            })
            .then(data => {
                console.log('Conversation creation successful, conversationID:', data);
                setCurrentConversationId(data)
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    return {
        newConversationResponseState,
        sendNewMessage,
        setNewConversationRequestState,
        postNewConversation,
        currentConversationId
    }
}
