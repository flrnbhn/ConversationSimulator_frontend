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
import {useEvaluation} from "../../../hooks/evaluationhook/useEvaluation";
import {ConversationStatus} from "../../../types/conersationstatus/ConversationStatus";

Modal.setAppElement('#root');

export const ChatView = () => {
    const [message, setMessage] = useState<MessageData>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null,
        translation: null
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
        currentExercise,
        isHighscore,
        setIsHighscore,
        highScoreConversation,
        setConversationStatus,
        postNewConversationStatus,
        allMessagesState,
        audioPlayed,
        setIsMuted,
        isMuted,
        transcribeAndSendSpeechInput,
        translateMessage
    } = useConversation();
    const [conversationCreated, setConversationCreated] = useState(false);
    const {fetchAllTasksForExercise, allTasksForExercise, fetchExerciseById,} = useExercise();
    const {postConversationIdToGetLanguageCheckForHighscoreGame, mistakeHighscoreDTOs} = useEvaluation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    /* useEffect(() => {
         const handleBeforeUnload = (event: BeforeUnloadEvent) => {
             event.preventDefault();
             console.log("isTriggered")
             if (audioState !== null && audioState.played) {
                 audioState.pause();
             }
         };
         window.addEventListener('beforeunload', handleBeforeUnload);

         return () => {
             window.removeEventListener('beforeunload', handleBeforeUnload);
         };
     }, []);*/

    useEffect(() => {
        if (mistakeHighscoreDTOs.length !== 0 && isHighscore) {
            setConversationStatus(ConversationStatus.FAILED);
            postNewConversationStatus(ConversationStatus.FAILED, currentConversationId);
            setIsHighscore(false);
        }
    }, [mistakeHighscoreDTOs]);


    useEffect(() => {
        scrollToBottom();
    }, [allMessagesState]);

    //at initialization 
    useEffect(() => {
        if (!conversationCreated && currentConversationId != null) {
            setConversationCreated(true);
            receiveFirstMessage();
        }
    }, [currentConversationId]);

    useEffect(() => {
        if (!isHighscore) {
            fetchAllTasksForExercise();
            fetchExerciseById();
        }
    }, []);

    useEffect(() => {
        if (newConversationResponseState.message !== "" && newConversationResponseState.conversationMember !== ConversationMember.NONE) {
            if (isHighscore && allMessagesState.length > 2) {
                postConversationIdToGetLanguageCheckForHighscoreGame();
            }
            setMessages(prevMessages => [...prevMessages, {
                message: newConversationResponseState.message,
                conversationMember: newConversationResponseState.conversationMember,
                conversationID: currentConversationId,
                synthesizedMessage: newConversationResponseState.synthesizedMessage,
                translation: null
            }]);
        }
    }, [newConversationResponseState]);


    const appendMessage = (messageString: string) => {
        const newMessageData: MessageData = {
            message: messageString,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId,
            translation: null
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
                    {allMessagesState.map((messageData, index) => (
                        <div
                            key={index}
                            className={messageData.conversationMember === ConversationMember.PARTNER ? css.chatMessagePartner : css.chatMessageUser}>
                            {isHighscore ? (
                                <ChatMessage
                                    messageData={messageData}
                                    role={messageData.conversationMember === ConversationMember.PARTNER ? highScoreConversation?.roleSystem : highScoreConversation?.roleUser}
                                    translateMessage={translateMessage}
                                    index={index}
                                />
                            ) : (
                                <ChatMessage
                                    messageData={messageData}
                                    role={messageData.conversationMember === ConversationMember.PARTNER ? currentExercise?.roleSystem : currentExercise?.roleUser}
                                    translateMessage={translateMessage}
                                    index={index}
                                />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>

                <div className={css.taskBox}>
                    {!isHighscore &&
                        <TaskBox completedTaskDescriptions={completedTaskDescriptions}
                                 allTaskDescriptions={allTasksForExercise}/>
                    }
                </div>

                <div className={css.chatBox}>
                    <InputBox setMessage={setMessageString} appendMessage={appendMessage} isDisabled={audioPlayed}
                              isMuted={isMuted} setIsMuted={setIsMuted}
                              transcribeAndSendSpeechInput={transcribeAndSendSpeechInput}/>
                </div>
                <div>
                    <ConversationFinishedPopUp conversationStatus={conversationStatus}/>
                </div>
            </div>
        </>
    );
}