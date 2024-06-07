import React, {Dispatch, FormEvent, MouseEvent, SetStateAction, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone, faTrash, faVolumeUp, faVolumeXmark, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {useRecording} from "../../../hooks/conversationhook/useRecording";
import css from "./InputBox.module.css"


interface InputBoxProps {
    setMessage: Dispatch<SetStateAction<string | null>>;
    appendMessage: (messageString: string) => void;
    isDisabled: boolean;
    setIsMuted: (isMuted: boolean) => void;
    isMuted: boolean;
    transcribeAndSendSpeechInput: (message: string) => void;
    finishConversation: () => void;
}

export const InputBox: React.FunctionComponent<InputBoxProps> = ({
                                                                     setMessage,
                                                                     appendMessage,
                                                                     isDisabled,
                                                                     setIsMuted,
                                                                     isMuted,
                                                                     transcribeAndSendSpeechInput,
                                                                     finishConversation
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

    return (
        <div className={css.inputBox}>
            <input
                className={css.inputField}
                type="text"
                placeholder="Nachricht eingeben..."
                value={value}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown} // Event-Handler für das Keydown-Ereignis hinzufügen
            />
            <button className={css.sendButton} onClick={handleSend} disabled={isDisabled}><FontAwesomeIcon
                icon={faArrowRight}/></button>
            <button className={isRecording ? css.speechButton_recorded : css.speechButton_notRecorded}
                    onClick={handleSpeechInput} disabled={isDisabled}><FontAwesomeIcon
                icon={faMicrophone}/></button>
        </div>
    );
}
