import React, {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import css from "./CreateNewExercisePopUp.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

interface CreateNewExercisePopUpProps {
    postNewExercise: (title: string,
                      szenario: string,
                      furtherInformation: string,
                      roleUser: string,
                      roleSystem: string,
                      numberOfMessagesTillFailure: number,
                      taskDescriptions: string []) => void;
    closeModal: () => void;
}

export const CreateNewExercisePopUp: React.FunctionComponent<CreateNewExercisePopUpProps> = ({
                                                                                                 postNewExercise,
                                                                                                 closeModal
                                                                                             }) => {
    const [titel, setTitel] = useState("");
    const [roleUser, setRoleUser] = useState("");
    const [roleSystem, setRoleSystem] = useState("");
    const [szenario, setSzenario] = useState("");
    const [numberOfMessagesTillFailure, setNumberOfMessagesTillFailure] = useState(0);
    const [taskList, setTaskList] = useState<string[]>([""]);
    const [createExercisesDisabled, setCreateExercisesDisabled] = useState(true);

    useEffect(() => {
        setCreateExercisesDisabled(validateButtonUse);
    }, [titel, roleUser, roleSystem, szenario, numberOfMessagesTillFailure, taskList]);

    const onNewTaskButtonClicked = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addInput();
    }

    const onDeleteTaskButtonClicked = (event: MouseEvent<HTMLButtonElement>, deletionIndex: number) => {
        event.preventDefault();
        deleteInput(deletionIndex);
    }

    const addInput = () => {
        setTaskList([...taskList, '']);
    };

    const deleteInput = (deletionIndex: number) => {
        const newTaskList = [...taskList];
        newTaskList.splice(deletionIndex, 1);
        setTaskList(newTaskList);
    }


    const inputStateChanged = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, setTaskAttribut: React.Dispatch<React.SetStateAction<any>>) => {
        setTaskAttribut(event.target.value);
    }

    const taskStateChanged = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const tasks = [...taskList];
        tasks[index] = event.target.value;
        setTaskList(tasks);
    }

    const createExercise = () => {
        console.log("titel: " + titel);
        console.log("roleUser: " + roleUser);
        console.log("roleSystem: " + roleSystem);
        console.log("szenario: " + szenario);
        console.log("numberOfMessagesTillFailure: " + numberOfMessagesTillFailure);
        console.log("taskList: " + taskList);

        postNewExercise(titel, szenario, "", roleUser, roleSystem, numberOfMessagesTillFailure, taskList);
        closeModal();
    }

    const validateButtonUse = () => {
        return titel === "" || roleUser === "" || roleSystem === "" || szenario === "" || numberOfMessagesTillFailure === 0 || taskList[0] === "";
    }


    return (
        <div className={css.createNewExercisePopUp}>
            <h2> Neue Übung erstellen </h2>
            <form>
                <div>
                    <label>Titel</label>
                    <br/>
                    <input value={titel} onChange={(event) => inputStateChanged(event, setTitel)}/>
                </div>
                <div>
                    <label>Wer bist du?</label>
                    <br/>
                    <input value={roleUser} onChange={(event) => inputStateChanged(event, setRoleUser)}/>
                </div>
                <div>
                    <label>Wer ist dein Gesprächspartner?</label>
                    <br/>
                    <input value={roleSystem} onChange={(event) => inputStateChanged(event, setRoleSystem)}/>
                </div>
                <div>
                    <label>Beschreibe das Szenario.</label>
                    <br/>
                    <textarea
                        value={szenario}
                        onChange={(event) => inputStateChanged(event, setSzenario)}
                        rows={6}
                        cols={35}/>
                </div>
                <div>
                    <label>In wie viel Nachrichten meisterst du die Übung?</label>
                    <br/>
                    <input value={numberOfMessagesTillFailure}
                           onChange={(event) => inputStateChanged(event, setNumberOfMessagesTillFailure)}/>
                </div>
                <div>
                    <label>Füge Aufgaben hinzu</label>
                    <br/>
                    {taskList.map((value, index) => (
                        <div key={index}>
                            <input value={taskList[index]} onChange={(event) => taskStateChanged(event, index)}/>
                            {index > 0 && (
                                <button onClick={(event) => onDeleteTaskButtonClicked(event, index)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            )}
                        </div>
                    ))}
                    <br/>
                    <button onClick={onNewTaskButtonClicked}>
                        <FontAwesomeIcon
                            icon={faPlus}/>
                    </button>
                </div>
            </form>
            <PrimaryButton buttonFunction={createExercise} title={"Übung anlegen"} disabled={createExercisesDisabled}/>
        </div>
    );
}
