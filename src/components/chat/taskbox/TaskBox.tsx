import React from "react";
import {TaskDescriptionData} from "../../../types/taskdescriptionData/TaskDescriptionData";
import css from "./TaskBox.module.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';


interface TaskBoxProps {
    completedTaskDescriptions: TaskDescriptionData[];
    allTaskDescriptions: TaskDescriptionData[];
}

export const TaskBox: React.FunctionComponent<TaskBoxProps> = ({completedTaskDescriptions, allTaskDescriptions}) => {
    const isChecked = (description: string) => completedTaskDescriptions.some(task => task.description === description);

    return (
        <div className={css.taskBoxContainer}>
            <table className={css.taskTable}>
                {allTaskDescriptions.map((taskDescription, index) => (
                    <tr>
                        <td>
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                className={isChecked(taskDescription.description) ? css.checkIcon : css.hiddenIcon}
                            />
                        </td>
                        <td>
                            <div key={index} className={css.taskDescription}>
                                {taskDescription.description}
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
