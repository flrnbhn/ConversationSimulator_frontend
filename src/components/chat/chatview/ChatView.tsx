import {InputBox} from "../inputbox/InputBox";
import React, {useEffect, useRef, useState} from "react";
import css from "./ChatView.module.css"
import {ChatMessage} from "../chatmessage/ChatMessage";
import {MessageData} from "../../../types/messagedata/MessageData";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";
import {useConversation} from "../../../hooks/conversationhook/useConversation";
import {TaskBox} from "../taskbox/TaskBox";
import {useExercise} from "../../../hooks/exercisehook/useExercise";
import Modal from 'react-modal';
import {ConversationFinishedPopUp} from "../conversationfinishedpopup/ConversationFinishedPopUp";

Modal.setAppElement('#root');

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
        receiveFirstMessage,
        completedTaskDescriptions,
        conversationStatus,
        currentExercise
    } = useConversation();
    const [conversationCreated, setConversationCreated] = useState(false);
    const {fetchAllTasksForExercise, allTasksForExercise, fetchExerciseById,} = useExercise();


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    //at initialization 
    useEffect(() => {
        console.log("!!!!!!!!!!!!!!!CurrentConversationId:" + currentConversationId);
        if (!conversationCreated && currentConversationId != null) {
            setConversationCreated(true);
            receiveFirstMessage();
        }
    }, [currentConversationId]);

    useEffect(() => {
        fetchAllTasksForExercise();
        fetchExerciseById();
    }, []);

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
                            <ChatMessage key={index} messageData={messageData}
                                         role={messageData.conversationMember === ConversationMember.PARTNER ? currentExercise?.roleSystem : currentExercise?.roleUser}/>
                        </div>]
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
                <div className={css.taskBox}>
                    <TaskBox completedTaskDescriptions={completedTaskDescriptions}
                             allTaskDescriptions={allTasksForExercise}/>
                </div>
                <div className={css.chatBox}>
                    <InputBox setMessage={setMessageString} appendMessage={appendMessage}/>
                </div>
                <div>
                    <ConversationFinishedPopUp conversationStatus={conversationStatus}/>
                </div>
            </div>
        </>
    );
}