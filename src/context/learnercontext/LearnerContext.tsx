import React, {createContext, useState} from "react";

// Interface for the context value
interface LearnerContextProps {
    learnerId: number | null;
    setLearnerId: (id: number | null) => void;
}

const LearnerContext = createContext<LearnerContextProps | null>(null);

const LearnerProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [learnerId, setLearnerId] = useState<number | null>(null);

    return (
        <LearnerContext.Provider value={{learnerId, setLearnerId}}>
            {children}
        </LearnerContext.Provider>
    );
};

export {LearnerContext, LearnerProvider};
