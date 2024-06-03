import React, {Dispatch, FormEvent, MouseEvent, SetStateAction, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone, faTrash, faVolumeUp, faVolumeXmark} from "@fortawesome/free-solid-svg-icons";
import {useRecording} from "../../../hooks/conversationhook/useRecording";


interface InputBoxProps {
    setMessage: Dispatch<SetStateAction<string | null>>;
    appendMessage: (messageString: string) => void;
    isDisabled: boolean;
    setIsMuted: (isMuted: boolean) => void;
    isMuted: boolean;
    transcribeAndSendSpeechInput: (message: string) => void;
}

export const InputBox: React.FunctionComponent<InputBoxProps> = ({
                                                                     setMessage,
                                                                     appendMessage,
                                                                     isDisabled,
                                                                     setIsMuted,
                                                                     isMuted,
                                                                     transcribeAndSendSpeechInput
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

    const handleMute = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!isMuted) {
            setIsMuted(true);

        }
        if (isMuted) {
            setIsMuted(false);
        }
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
        <div>
            <div>
                <button onClick={handleMute}><FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeUp}/></button>
            </div>
            <div>
                <button onClick={handleSpeechInput} disabled={isDisabled}><FontAwesomeIcon
                    icon={isRecording ? faTrash : faMicrophone}/></button>
            </div>
            <input
                type="text"
                placeholder="Nachricht eingeben..."
                value={value}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown} // Event-Handler für das Keydown-Ereignis hinzufügen
            />
            <button onClick={handleSend} disabled={isDisabled}>Senden</button>
        </div>
    );
}
