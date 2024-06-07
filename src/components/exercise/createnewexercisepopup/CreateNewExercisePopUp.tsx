import React, {ChangeEvent, MouseEvent, useContext, useEffect, useState} from "react";
import css from "./CreateNewExercisePopUp.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Title} from "../../util/title/Title";
import {Tooltip} from "react-tooltip";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";

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
    const {isLighMode} = useContext(StylingContext)!;

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
        <div className={isLighMode ? css.popUpWapper_white : css.popUpWapper_black}>
            <div>
                <button className={css.closeButton} onClick={closeModal}><FontAwesomeIcon
                    icon={faXmark} data-tooltip-id="close_tooltip"
                    data-tooltip-content="Schließen"/></button>
            </div>
            <div className={css.titleContainer}>
                <Title title={"Neue Übung erstellen"}/>
            </div>
            <Tooltip id={"close_tooltip"}/>
            <div className={isLighMode ? css.createNewExercisePopUp_white : css.createNewExercisePopUp_black}>
                <form className={css.formContainer}>
                    <div className={css.inputContainer}>
                        <label>Titel</label>
                        <input className={css.inputField} value={titel}
                               onChange={(event) => inputStateChanged(event, setTitel)}/>
                    </div>
                    <div className={css.inputContainer}>
                        <label>Wer bist du?</label>
                        <input className={css.inputField} value={roleUser}
                               onChange={(event) => inputStateChanged(event, setRoleUser)}/>
                    </div>
                    <div className={css.inputContainer}>
                        <label>Wer ist dein Gesprächspartner?</label>
                        <input className={css.inputField} value={roleSystem}
                               onChange={(event) => inputStateChanged(event, setRoleSystem)}/>
                    </div>
                    <div className={css.inputSzenario}>
                        <label>Beschreibe das Szenario.</label>
                        <textarea
                            value={szenario}
                            onChange={(event) => inputStateChanged(event, setSzenario)}
                            rows={6}
                            cols={35}/>
                    </div>
                    <div className={css.inputContainer}>
                        <label>In wie viel Nachrichten meisterst du die Übung?</label>
                        <input className={css.inputField} value={numberOfMessagesTillFailure}
                               onChange={(event) => inputStateChanged(event, setNumberOfMessagesTillFailure)}/>
                    </div>
                    <div className={css.inputContainer}>
                        <label>Füge Aufgaben hinzu.</label>
                        {taskList.map((value, index) => (
                            <div className={css.taskInputFieldContainer} key={index}>
                                <input className={css.taskInputField} value={taskList[index]}
                                       onChange={(event) => taskStateChanged(event, index)}/>
                                {index > 0 && (
                                    <button className={css.deleteButton}
                                            onClick={(event) => onDeleteTaskButtonClicked(event, index)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className={css.newTaskButtonContainer}>
                            <button className={css.newTaskButton} onClick={onNewTaskButtonClicked}>
                                <FontAwesomeIcon
                                    icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                </form>
                <div className={css.sendButton}>
                    <PrimaryButton buttonFunction={createExercise} title={"Übung anlegen"}
                                   disabled={createExercisesDisabled}/>
                </div>
            </div>
        </div>
    );
}
