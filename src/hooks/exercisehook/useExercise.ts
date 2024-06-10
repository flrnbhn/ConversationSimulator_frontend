import axios from "axios";
import {ExerciseData, ExerciseRequestDTO, TaskRequestDTO} from "../../types/exercisedata/ExerciseData";
import {useContext, useState} from "react";
import {ExerciseContext} from "../../context/exercisecontext/ExerciseContext";
import {TaskDescriptionData} from "../../types/taskdescriptionData/TaskDescriptionData";

export const useExercise = () => {

    const {allExercisesState, setAllExercisesState} = useContext(ExerciseContext)!;

    const {currentExerciseId, setCurrentExerciseId} = useContext(ExerciseContext)!;

    const {allTasksForExercise, setAllTasksForExercise} = useContext(ExerciseContext)!;

    const [newCreatedExerciseId, setNewCreatedExerciseId] = useState<number>(-1);

    const {setCurrentExercise} = useContext(ExerciseContext)!;

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

    function postNewExercise(title: string,
                             szenario: string,
                             furtherInformation: string,
                             roleUser: string,
                             roleSystem: string,
                             numberOfMessagesTillFailure: number,
                             taskDescriptions: string []) {
        const exerciseRequestData: ExerciseRequestDTO = createExerciseData(title, szenario, furtherInformation, roleUser, roleSystem, numberOfMessagesTillFailure, taskDescriptions);
        axios.post<number>("/exercise", exerciseRequestData)
            .then(res => res.data)
            .then((data: number) => {
                console.log("id der neu angelegten Übung: " + data)
                setNewCreatedExerciseId(data);
            })
            .catch((error) => {
                console.error('Fehler beim erstellen der Übungen:', error);
            });
    }

    function deleteExerciseById(exerciseId: number) {
        axios.delete("/exercise/" + exerciseId)
            .catch((error) => {
                console.error("Löschen hat nicht funktioniert", error);
            })
        fetchAllExercises();
    }


    function createExerciseData(title: string,
                                szenario: string,
                                furtherInformation: string,
                                roleUser: string,
                                roleSystem: string,
                                numberOfMessagesTillFailure: number,
                                taskDescriptions: string []) {
        const taskRequestDTO: TaskRequestDTO[] = taskDescriptions
            .map(taskDescription => {
                const taskRequestDTO: TaskRequestDTO = {
                    description: taskDescription
                };
                return taskRequestDTO;
            })

        const exerciseRequestData: ExerciseRequestDTO = {
            title: title,
            szenario: szenario,
            furtherInformation: furtherInformation,
            roleUser: roleUser,
            roleSystem: roleSystem,
            numberOfMessagesTillFailure: numberOfMessagesTillFailure,
            taskRequestDTO: taskRequestDTO
        }

        return exerciseRequestData;
    }


    return {
        fetchAllExercises,
        allExercisesState,
        setCurrentExerciseId,
        currentExerciseId,
        allTasksForExercise,
        fetchAllTasksForExercise,
        fetchExerciseById,
        postNewExercise,
        newCreatedExerciseId,
        deleteExerciseById
    }
}
