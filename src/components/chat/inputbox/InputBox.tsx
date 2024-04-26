import React, {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {MessageData} from "../../../types/messagedata/MessageData";
import {ConversationMember} from "../../../types/conversationmember/ConversationMember";
import {useLLM} from "../../../hooks/llmhook/useLLM";

interface InputBoxProps {
    setMessage: Dispatch<SetStateAction<MessageData>>;
    appendMessage: (mesasage: MessageData) => void;
}

export const InputBox : React.FunctionComponent<InputBoxProps> = ({ setMessage, appendMessage }) => {
    const [value, setValue] = useState<string>('');

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSend = (submitEvent: FormEvent) => {
        submitEvent.preventDefault();
        sendMessage();
        clearChat();
    }

    const sendMessage = () => {
        setMessage({message: value, conversationMember: ConversationMember.USER});
        appendMessage({message: value, conversationMember: ConversationMember.USER});
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
            <input
                type="text"
                placeholder="Nachricht eingeben..."
                value={value}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown} // Event-Handler für das Keydown-Ereignis hinzufügen
            />
            <button onClick={handleSend}>Senden</button>
        </div>
    );
}
