import {InputBox} from "../inputbox/InputBox";
import React, {useEffect, useRef, useState} from "react";
import css from "./ChatView.module.css"
import {ChatMessage} from "../chatmessage/ChatMessage";
import {MessageData} from "../../../types/messagedata/MessageData";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";
import {useConversation} from "../../../hooks/conversationhook/useConversation";

export const ChatView = () => {
    const [message, setMessage] = useState<MessageData>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null
    });
    const [messageString, setMessageString] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        sendNewMessage,
        newConversationResponseState,
        postNewConversation,
        currentConversationId,
        receiveFirstMessage
    } = useConversation();
    const [conversationCreated, setConversationCreated] = useState(false);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    //at initialization 
    useEffect(() => {
        if (!conversationCreated && currentConversationId != null) {
            setConversationCreated(true);
            receiveFirstMessage();
        }
    }, [currentConversationId]);

    useEffect(() => {
        if (newConversationResponseState.message !== "" && newConversationResponseState.conversationMember !== ConversationMember.NONE) {
            setMessages(prevMessages => [...prevMessages, {
                message: newConversationResponseState.message,
                conversationMember: newConversationResponseState.conversationMember,
                conversationID: currentConversationId
            }]);
        }
    }, [newConversationResponseState]);


    const appendMessage = (messageString: string) => {
        const newMessageData: MessageData = {
            message: messageString,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId
        }
        setMessage(newMessageData);
        setMessages(prevMessages => [...prevMessages, newMessageData]);
        sendNewMessage(messageString);
    }

    return (
        <>
            <div>
                Chat
                <div className={css.chatContainer}>
                    {messages.map((messageData, index) => (
                        [<div
                            className={messageData.conversationMember === ConversationMember.PARTNER ? css.chatMessagePartner : css.chatMessageUser}>
                            <ChatMessage key={index} messageData={messageData}/>
                        </div>]
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
                <div className={css.chatBox}>
                    <InputBox setMessage={setMessageString} appendMessage={appendMessage}/>
                </div>
            </div>
        </>
    );
}