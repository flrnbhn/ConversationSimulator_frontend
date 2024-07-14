import {InputBox} from "../inputbox/InputBox";
import React, {MouseEvent, useEffect, useRef, useState} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVolumeUp, faVolumeXmark, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ToggleButton} from "../../util/togglebutton/ToggleButton";
import {Tooltip} from "react-tooltip";
import {ConversationContextInfoBox} from "../inputbox/ConversationContextInfoBox";

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
        translateMessage,
        translationIsLoading,
        isWaitingForMessage
    } = useConversation();
    const [conversationCreated, setConversationCreated] = useState(false);
    const {fetchAllTasksForExercise, allTasksForExercise, fetchExerciseById,} = useExercise();
    const {postConversationIdToGetLanguageCheckForHighscoreGame, mistakeHighscoreDTOs} = useEvaluation();
    const [hideChat, setHideChat] = useState<boolean>(false);
    const emptyMessageData: MessageData = {
        conversationID: null,
        message: "",
        conversationMember: ConversationMember.PARTNER,
        translation: null
    };
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };


    useEffect(() => {
        console.log("Highscore: ---------------------- " + isHighscore);
    }, [isHighscore]);


    useEffect(() => {
        if (mistakeHighscoreDTOs.length !== 0 && isHighscore) {
            finishConversation();
            //setIsHighscore(false);
        }
    }, [mistakeHighscoreDTOs]);


    useEffect(() => {
        scrollToBottom();
    }, [allMessagesState]);


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

    const finishConversation = () => {
        setConversationStatus(ConversationStatus.FAILED);
        postNewConversationStatus(ConversationStatus.FAILED, currentConversationId);
    }


    const appendMessage = (messageString: string) => {
        const newMessageData: MessageData = {
            message: messageString,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId,
            translation: null
        }
        setMessage(newMessageData);
        setMessages(prevMessages => [...prevMessages, newMessageData]);
        sendNewMessage(messageString, false);
    }

    const handleFinishConversation = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        finishConversation();
    }

    const handleMute = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isMuted) {
            setIsMuted(true);

        }
        if (isMuted) {
            setIsMuted(false);
        }
    }

    const closeInfoModal = () => {
        setInfoModalIsOpen(false);
    };

    const openInfoModal = () => {
        setInfoModalIsOpen(true);
    };

    return (
        <>
            <div>
                <div className={css.chatHeaderContainer}>
                    <ToggleButton/>
                    <div className={css.chatHeader}>
                        <span>{isHighscore ? highScoreConversation?.roleSystem : currentExercise?.roleSystem}</span>
                        <button className={audioPlayed ? css.muteButton_played : css.muteButton} onClick={handleMute}>
                            <FontAwesomeIcon
                                icon={isMuted ? faVolumeXmark : faVolumeUp}/></button>
                    </div>
                    <button className={css.cancelButton} onClick={handleFinishConversation}><FontAwesomeIcon
                        icon={faXmark} data-tooltip-id="cancel_tooltip"
                        data-tooltip-content="Übung vorzeitig beenden"/></button>
                </div>
                <Tooltip id="cancel_tooltip"/>
                {hideChat ? <div className={css.chatHided}>Chat ausgeblendet</div> :
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
                                        translationIsLoading={translationIsLoading}
                                        isWaitingForMessage={false}
                                        conversationStatus={conversationStatus}
                                        infoModalIsOpen={infoModalIsOpen}
                                    />
                                ) : (
                                    <ChatMessage
                                        messageData={messageData}
                                        role={messageData.conversationMember === ConversationMember.PARTNER ? currentExercise?.roleSystem : currentExercise?.roleUser}
                                        translateMessage={translateMessage}
                                        index={index}
                                        translationIsLoading={translationIsLoading}
                                        isWaitingForMessage={false}
                                        conversationStatus={conversationStatus}
                                        infoModalIsOpen={infoModalIsOpen}
                                    />
                                )}
                            </div>
                        ))}
                        {isWaitingForMessage ? (
                            <ChatMessage
                                messageData={emptyMessageData}
                                role={currentExercise?.roleSystem}
                                translateMessage={translateMessage}
                                index={-1}
                                translationIsLoading={translationIsLoading}
                                isWaitingForMessage={true}
                                conversationStatus={conversationStatus}
                                infoModalIsOpen={infoModalIsOpen}

                            />
                        ) : null}

                        <div ref={messagesEndRef}/>
                    </div>
                }

                <div className={css.taskBox}>
                    {!isHighscore &&
                        <TaskBox completedTaskDescriptions={completedTaskDescriptions}
                                 allTaskDescriptions={allTasksForExercise}/>
                    }
                </div>


                <div className={css.chatBox}>
                    <InputBox setMessage={setMessageString} appendMessage={appendMessage}
                              isDisabled={audioPlayed}
                              isMuted={isMuted} setIsMuted={setIsMuted}
                              transcribeAndSendSpeechInput={transcribeAndSendSpeechInput}
                              finishConversation={finishConversation}
                              hideChat={hideChat}
                              setHideChat={setHideChat}
                              openInfoModal={openInfoModal}/>
                </div>
                <Modal
                    isOpen={infoModalIsOpen}
                    onRequestClose={closeInfoModal}
                    contentLabel="Information zur Konversation erhalten"
                    className={css.popUpInfo}
                >
                    {!isHighscore ?
                        <ConversationContextInfoBox closeModal={closeInfoModal} szenario={currentExercise?.szenario}
                                                    roleSystem={currentExercise?.roleSystem}
                                                    roleUser={currentExercise?.roleUser}/>
                        :
                        <ConversationContextInfoBox closeModal={closeInfoModal}
                                                    szenario={highScoreConversation?.szenario}
                                                    roleSystem={highScoreConversation?.roleSystem}
                                                    roleUser={highScoreConversation?.roleUser}/>
                    }
                </Modal>
                <div>
                    <ConversationFinishedPopUp conversationStatus={conversationStatus}/>
                </div>
            </div>
        </>
    );
}