import React, {useState} from "react";
import {MessageData} from "../../../types/messagedata/MessageData";
import css from "../chatmessage/ChatMessage.module.css";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";

interface ChatMessageProps {
    messageData: MessageData;
}

export const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({messageData}) => {
    const [{conversationMember, message}] = useState<MessageData>(messageData);
    return (
        <>
            <div
                className={conversationMember === ConversationMember.PARTNER ? css.messageBoxUser : css.messageBoxPartner}>
                <p className={css.chatMessage}><strong>{conversationMember}:</strong> {message}</p>
            </div>
        </>
    );
}