import React, {createContext, useState} from "react";
import {HighScoreConversationResponseDTO} from "../../types/conversationdata/HighScoreConversationResponseDTO";

interface ConversationContextProps {
    currentConversationId: number | null;
    setCurrentConversationId: (id: number | null) => void;
    isHighscore: boolean
    setIsHighscore: (isHighscore: boolean) => void;
    highScoreConversation: HighScoreConversationResponseDTO | undefined;
    setHighScoreConversation: (highScoreConversation: HighScoreConversationResponseDTO | undefined) => void;
    resetConversationContext: () => void;
}

const ConversationContext = createContext<ConversationContextProps | null>(null);

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
    const [isHighscore, setIsHighscore] = useState<boolean>(false);
    const [highScoreConversation, setHighScoreConversation] = useState<HighScoreConversationResponseDTO | undefined>();

    const resetConversationContext = () => {
        setCurrentConversationId(null);
        setIsHighscore(false);
        const initialHighScoreConversation: HighScoreConversationResponseDTO = {
            conversationId: -1,
            roleSystem: "",
            roleUser: "",
            szenario: ""
        }
        setHighScoreConversation(initialHighScoreConversation);
    }

    return (
        <ConversationContext.Provider value={{
            currentConversationId,
            setCurrentConversationId,
            isHighscore,
            setIsHighscore,
            highScoreConversation,
            setHighScoreConversation,
            resetConversationContext
        }}>
            {children}
        </ConversationContext.Provider>
    );
};

export {ConversationContext, ConversationProvider};
