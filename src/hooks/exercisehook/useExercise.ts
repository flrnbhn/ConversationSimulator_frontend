import axios from "axios";
import {ExerciseData} from "../../types/exercisedata/ExerciseData";
import {useState} from "react";

export const useExercise = () => {

    const [allExercisesState, setAllExercisesState] = useState<ExerciseData[]>([]);

    function fetchAllExercises() {
        axios.get<ExerciseData[]>('/exercise')
            .then((res) => res.data)
            .then((data: ExerciseData[]) => {
                console.log(data);
                setAllExercisesState(data);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Übungen:', error);
            })
    }


    return {
        fetchAllExercises,
        allExercisesState
    }
}
