import React, {createContext, useState} from "react";

// Interface for the context value
interface ConversationContextProps {
    currentConversationId: number | null;
    setCurrentConversationId: (id: number | null) => void;
}

const ConversationContext = createContext<ConversationContextProps | null>(null); // Initialize the context with type

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null); // Initial state for currentConversationId with type

    return (
        <ConversationContext.Provider value={{currentConversationId, setCurrentConversationId}}>
            {children}
        </ConversationContext.Provider>
    );
};

export {ConversationContext, ConversationProvider};
