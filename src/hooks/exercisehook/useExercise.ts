import axios from "axios";
import {ExerciseData} from "../../types/exercisedata/ExerciseData";
import {useContext} from "react";
import {ExerciseContext} from "../../context/exercisecontext/ExerciseContext";
import {TaskDescriptionData} from "../../types/taskdescriptionData/TaskDescriptionData";

export const useExercise = () => {

    const {allExercisesState, setAllExercisesState} = useContext(ExerciseContext)!;

    const {currentExerciseId, setCurrentExerciseId} = useContext(ExerciseContext)!;

    const {allTasksForExercise, setAllTasksForExercise} = useContext(ExerciseContext)!;

    const {setCurrentExercise} = useContext(ExerciseContext)!;
    ;



    function fetchAllExercises() {
        axios.get<ExerciseData[]>('/exercise')
            .then((res) => res.data)
            .then((data: ExerciseData[]) => {
                setAllExercisesState(data);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Übungen:', error);
            });
    }

    function fetchAllTasksForExercise() {
        axios.get<TaskDescriptionData[]>("/exercise/tasks/" + currentExerciseId)
            .then(res => res.data)
            .then((data: TaskDescriptionData[]) => {
                console.log(data);
                setAllTasksForExercise(data);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Übungen:', error);
            });
    }

    function fetchExerciseById() {
        axios.get<ExerciseData>("/exercise/" + currentExerciseId)
            .then(res => res.data)
            .then((data: ExerciseData) => {
                console.log(data);
                setCurrentExercise(data);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Übungen:', error);
            });
    }


    return {
        fetchAllExercises,
        allExercisesState,
        setCurrentExerciseId,
        currentExerciseId,
        allTasksForExercise,
        fetchAllTasksForExercise,
        fetchExerciseById
    }
}
