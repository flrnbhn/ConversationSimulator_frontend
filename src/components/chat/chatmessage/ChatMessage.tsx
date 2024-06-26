import React, {MouseEvent, useEffect, useState} from "react";
import {MessageData} from "../../../types/messagedata/MessageData";
import css from "../chatmessage/ChatMessage.module.css";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import {ConversationStatus} from "../../../types/conersationstatus/ConversationStatus";


interface ChatMessageProps {
    messageData: MessageData;
    role: string | undefined;
    translateMessage: (message: string, index: number) => void;
    index: number;
    translationIsLoading: boolean;
    isWaitingForMessage: boolean;
    conversationStatus: ConversationStatus
}

export const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({
                                                                           messageData,
                                                                           role,
                                                                           translateMessage,
                                                                           index,
                                                                           translationIsLoading,
                                                                           isWaitingForMessage,
                                                                           conversationStatus,
                                                                       }) => {
    const [{conversationMember, message}] = useState<MessageData>(messageData);

    const [isTranslationVisible, setIsTranslationVisible] = useState(false);
    const [isTranslationClicked, setIsTranslationClicked] = useState(false);


    useEffect(() => {
        if (messageData.translation !== null) {
            console.log("MessageData:" + messageData.translation);
            setIsTranslationVisible(true);
        }
    }, [messageData.translation]);


    const handleTranslate = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsTranslationClicked(true);
        if (messageData.message !== null) {
            translateMessage(messageData.message, index)
        }
    }

    const toggleTranslationVisibility = () => {
        setIsTranslationVisible(!isTranslationVisible);
    }

    return (
        <>

            <div
                className={conversationMember === ConversationMember.PARTNER ? css.messageBoxUser : css.messageBoxPartner}>
                {isWaitingForMessage ? (
                    <div className={css.typingDots}>
                        <div className={css.dot}></div>
                        <div className={css.dot}></div>
                        <div className={css.dot}></div>
                    </div>
                ) : (
                    <p className={css.chatMessage}>
                        <strong>{role}:</strong> {message}
                        <span
                            className={conversationStatus === ConversationStatus.FAILED || conversationStatus === ConversationStatus.PASSED ? css.translateButtonContainer_nonClickable : css.translateButtonContainer_clickable}>
                {messageData.conversationMember === ConversationMember.PARTNER && messageData.translation === null ? (
                    <>
                        {!translationIsLoading || !isTranslationClicked ? (
                            <button
                                onClick={handleTranslate}
                                className={css.translateButton}
                                data-tooltip-id="translation_tooltip"
                                data-tooltip-content="Übersetzen: Beachte, dass dies sich auf die Note auswirkt."
                            >
                                <FontAwesomeIcon icon={faQuestion} className={css.icon}/>
                            </button>
                        ) : (
                            <div className={css.translateLoader}></div>
                        )}
                        <Tooltip id="translation_tooltip"/>
                    </>
                ) : null}
            </span>
                    </p>
                )}

                {messageData.translation !== null && (
                    <>
                        <button onClick={toggleTranslationVisibility} className={css.toggleButton}>
                            <FontAwesomeIcon icon={isTranslationVisible ? faChevronUp : faChevronDown}/>
                        </button>

                        {isTranslationVisible && (
                            <div className={css.translationBox}>
                                <p className={css.translationHeader}>Übersetzung</p>
                                <p>{messageData.translation}</p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </>
    );
}