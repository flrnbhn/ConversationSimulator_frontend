import React, {createContext, useState} from "react";
import {HighScoreConversationResponseDTO} from "../../types/conversationdata/HighScoreConversationResponseDTO";

// Interface for the context value
interface ConversationContextProps {
    currentConversationId: number | null;
    setCurrentConversationId: (id: number | null) => void;
    isHighscore: boolean
    setIsHighscore: (isHighscore: boolean) => void;
    highScoreConversation: HighScoreConversationResponseDTO | undefined;
    setHighScoreConversation: (highScoreConversation: HighScoreConversationResponseDTO) => void;
}

const ConversationContext = createContext<ConversationContextProps | null>(null);

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
    const [isHighscore, setIsHighscore] = useState<boolean>(false);
    const [highScoreConversation, setHighScoreConversation] = useState<HighScoreConversationResponseDTO>();


    return (
        <ConversationContext.Provider value={{
            currentConversationId,
            setCurrentConversationId,
            isHighscore,
            setIsHighscore,
            highScoreConversation,
            setHighScoreConversation
        }}>
            {children}
        </ConversationContext.Provider>
    );
};

export {ConversationContext, ConversationProvider};
