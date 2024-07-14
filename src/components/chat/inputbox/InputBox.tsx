import React, {Dispatch, FormEvent, MouseEvent, SetStateAction, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faComment, faCommentSlash, faInfo, faMicrophone} from "@fortawesome/free-solid-svg-icons";
import {useRecording} from "../../../hooks/conversationhook/useRecording";
import css from "./InputBox.module.css"
import {Tooltip} from 'react-tooltip'


interface InputBoxProps {
    setMessage: Dispatch<SetStateAction<string | null>>;
    appendMessage: (messageString: string) => void;
    isDisabled: boolean;
    setIsMuted: (isMuted: boolean) => void;
    isMuted: boolean;
    transcribeAndSendSpeechInput: (message: string) => void;
    finishConversation: () => void;
    hideChat: boolean;
    setHideChat: (hideChat: boolean) => void;
    openInfoModal: () => void;
}

export const InputBox: React.FunctionComponent<InputBoxProps> = ({
                                                                     setMessage,
                                                                     appendMessage,
                                                                     isDisabled,
                                                                     setIsMuted,
                                                                     isMuted,
                                                                     transcribeAndSendSpeechInput,
                                                                     finishConversation,
                                                                     hideChat,
                                                                     setHideChat,
                                                                     openInfoModal
                                                                 }) => {
    const [value, setValue] = useState<string>('');
    const {record, stopRecording} = useRecording();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordState] = useState(() => record);
    const [stopRecordingState] = useState(() => stopRecording);


    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSend = (submitEvent: FormEvent) => {
        submitEvent.preventDefault();
        sendMessage();
        clearChat();
    }


    const handleSpeechInput = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isRecording) {
            setIsRecording(false);
            stopRecordingState();
        } else {
            setIsRecording(true);
            const base64String = await recordState();
            transcribeAndSendSpeechInput(base64String);
        }
    };

    const handleFinishConversation = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        finishConversation();
    }

    const sendMessage = () => {
        setMessage(value);
        appendMessage(value);
    }

    const clearChat = () => {
        setValue("");
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
            clearChat()
        }
    };

    const handleHideChat = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (hideChat) {
            setHideChat(false);
        } else {
            setHideChat(true);
        }
    }

    const handleInfoForConversation = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        openInfoModal();
    }

    return (
        <div className={css.inputBox}>
            <button className={css.infoConversationButton} onClick={handleInfoForConversation}>
                <FontAwesomeIcon icon={faInfo}
                                 data-tooltip-id="info_tooltip"
                                 data-tooltip-content="Lasse dir Informationen über die Konversation anzeigen"
                />
            </button>
            <Tooltip id="info_tooltip"/>
            <button className={css.hideChatButton} onClick={handleHideChat}>
                {hideChat ? <FontAwesomeIcon icon={faCommentSlash}
                                             data-tooltip-id="hideChat_tooltip"
                                             data-tooltip-content="Chat ausblenden"/> :
                    <FontAwesomeIcon icon={faComment}
                                     data-tooltip-id="hideChat_tooltip"
                                     data-tooltip-content="Chat ausblenden"/>}
            </button>
            <Tooltip id="hideChat_tooltip"/>

            {hideChat ? "" :
                <>
                    <input
                        className={css.inputField}
                        type="text"
                        placeholder="Nachricht eingeben..."
                        value={value}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown} // Event-Handler für das Keydown-Ereignis hinzufügen
                    />
                    <button className={css.sendButton} onClick={handleSend} disabled={isDisabled}><FontAwesomeIcon
                        icon={faArrowRight}
                        data-tooltip-id="sendMessage_tooltip"
                        data-tooltip-content="Nachricht absenden"
                    /></button>
                    <Tooltip id="sendMessage_tooltip"/>
                </>
            }
            <button className={isRecording ? css.speechButton_recorded : css.speechButton_notRecorded}
                    onClick={handleSpeechInput} disabled={isDisabled}><FontAwesomeIcon
                icon={faMicrophone}
                data-tooltip-id="speechMessage_tooltip"
                data-tooltip-content="Sprachnachricht aufnehmen"/></button>
            <Tooltip id="speechMessage_tooltip"/>

        </div>
    );
}
