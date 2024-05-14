import React, {createContext, useState} from "react";
import {TaskDescriptionData} from "../../types/taskdescriptionData/TaskDescriptionData";
import {ExerciseData} from "../../types/exercisedata/ExerciseData";

// Interface for the context value
interface ExerciseContextProps {
    currentExerciseId: number | null;
    setCurrentExerciseId: (id: number | null) => void;
    allTasksForExercise: TaskDescriptionData[];
    setAllTasksForExercise: (taskDescriptionData: TaskDescriptionData[]) => void;
    allExercisesState: ExerciseData[];
    setAllExercisesState: (exerciseData: ExerciseData[]) => void;
    currentExercise: ExerciseData | null;
    setCurrentExercise: (currentExercise: ExerciseData | null) => void;
}

const ExerciseContext = createContext<ExerciseContextProps | null>(null);

const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);
    const [allTasksForExercise, setAllTasksForExercise] = useState<TaskDescriptionData[]>([]);
    const [allExercisesState, setAllExercisesState] = useState<ExerciseData[]>([]);
    const [currentExercise, setCurrentExercise] = useState<ExerciseData | null>(null);


    return (
        <ExerciseContext.Provider value={{
            currentExerciseId,
            setCurrentExerciseId,
            allTasksForExercise,
            setAllTasksForExercise,
            allExercisesState,
            setAllExercisesState,
            currentExercise,
            setCurrentExercise
        }}>
            {children}
        </ExerciseContext.Provider>
    );
};

export {ExerciseContext, ExerciseProvider};
