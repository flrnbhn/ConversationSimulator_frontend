import React, {Dispatch, FormEvent, SetStateAction, useState} from 'react';

interface InputBoxProps {
    setMessage: Dispatch<SetStateAction<string | null>>;
    appendMessage: (messageString: string) => void;
}

export const InputBox: React.FunctionComponent<InputBoxProps> = ({setMessage, appendMessage}) => {
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
