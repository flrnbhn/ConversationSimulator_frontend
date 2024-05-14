import React, {createContext, useState} from "react";

// Interface for the context value
interface ConversationContextProps {
    currentConversationId: number | null;
    setCurrentConversationId: (id: number | null) => void;
}

const ConversationContext = createContext<ConversationContextProps | null>(null);

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);

    return (
        <ConversationContext.Provider value={{currentConversationId, setCurrentConversationId}}>
            {children}
        </ConversationContext.Provider>
    );
};

export {ConversationContext, ConversationProvider};
