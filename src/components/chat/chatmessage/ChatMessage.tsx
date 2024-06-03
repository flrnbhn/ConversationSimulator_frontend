import React, {MouseEvent, useEffect, useState} from "react";
import {MessageData} from "../../../types/messagedata/MessageData";
import css from "../chatmessage/ChatMessage.module.css";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faQuestion} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


interface ChatMessageProps {
    messageData: MessageData;
    role: string | undefined;
    translateMessage: (message: string, index: number) => void;
    index: number;
}

export const ChatMessage: React.FunctionComponent<ChatMessageProps> = ({
                                                                           messageData,
                                                                           role,
                                                                           translateMessage,
                                                                           index
                                                                       }) => {
    const [{conversationMember, message}] = useState<MessageData>(messageData);

    const [isTranslationVisible, setIsTranslationVisible] = useState(false);

    useEffect(() => {
        if (messageData.translation !== null) {
            console.log("MessageData:" + messageData.translation);
            setIsTranslationVisible(true);
        }
    }, [messageData.translation]);


    const handleTranslate = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                <p
                    className={css.chatMessage}><strong>{role}:</strong> {message}
                    {(messageData.conversationMember === ConversationMember.PARTNER && messageData.translation === null)
                        ?
                        <>
                            <button onClick={handleTranslate}
                                    data-tooltip-id="translation_tooltip"
                                    data-tooltip-content="Übersetzen: Beachte, dass dies sich auf die Note auswirkt.">
                                <FontAwesomeIcon icon={faQuestion}/>
                            </button>
                            <Tooltip id="translation_tooltip"/>

                        </>

                        :
                        null
                    }
                </p>
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