import React, {createContext, useState} from "react";
import {LearnerResponseDTO} from "../../types/learnerdata/LearnerResponseDTO";

/**
 * Context for user data that must be made available globally in the application.
 */
interface LearnerContextProps {
    learnerId: number | null;
    setLearnerId: (id: number | null) => void;
    resetLearnerContext: () => void;
    learner: LearnerResponseDTO | undefined;
    setLearner: (learner: LearnerResponseDTO) => void;
}

const LearnerContext = createContext<LearnerContextProps | null>(null);

const LearnerProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [learnerId, setLearnerId] = useState<number | null>(null);
    const [learner, setLearner] = useState<LearnerResponseDTO>();

    const resetLearnerContext = () => {
        setLearnerId(null);
    };

    return (
        <LearnerContext.Provider value={{learnerId, setLearnerId, resetLearnerContext, learner, setLearner}}>
            {children}
        </LearnerContext.Provider>
    );
};

export {LearnerContext, LearnerProvider};
