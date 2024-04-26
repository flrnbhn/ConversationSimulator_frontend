import {InputBox} from "../inputbox/InputBox";
import React, {useEffect, useRef, useState} from "react";
import css from "./ChatView.module.css"
import {ChatMessage} from "../chatmessage/ChatMessage";
import {MessageData} from "../../../types/messagedata/MessageData";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";
import {useLLM} from "../../../hooks/llmhook/useLLM";

export const ChatView = () => {
    const [message, setMessage] = useState<MessageData>({message: "", conversationMember: ConversationMember.NONE});
    const [messages, setMessages] = useState<MessageData[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {sendMessageToLLM, newLlmResponseState} = useLLM();


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (newLlmResponseState.message !== "" && newLlmResponseState.conversationMember !== ConversationMember.NONE) {
            setMessages(prevMessages => [...prevMessages, {
                message: newLlmResponseState.message,
                conversationMember: newLlmResponseState.conversationMember
            }]);
        }
    }, [newLlmResponseState]);


    const appendMessage = (messageData: MessageData) => {
        setMessages(prevMessages => [...prevMessages, messageData]);
        sendMessageToLLM(messageData.message);
    }

    // next steps: fallunterscheidung machen wer schreibt, chat css, chat zeilenumbruch ermöglichen, verhindern nachrichten spam,  chatgpt

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
                    <InputBox setMessage={setMessage} appendMessage={appendMessage}/>
                </div>
            </div>
        </>
    );
}