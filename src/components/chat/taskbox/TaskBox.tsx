import React, {useContext} from "react";
import {TaskDescriptionData} from "../../../types/taskdescriptionData/TaskDescriptionData";
import css from "./TaskBox.module.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {StylingContext} from "../../../context/stylingcontext/StylingContext";


interface TaskBoxProps {
    completedTaskDescriptions: TaskDescriptionData[];
    allTaskDescriptions: TaskDescriptionData[];
}

/**
 * Box that shows finished tasks
 */
export const TaskBox: React.FunctionComponent<TaskBoxProps> = ({completedTaskDescriptions, allTaskDescriptions}) => {
    const isChecked = (description: string) => completedTaskDescriptions.some(task => task.description === description);
    const {isLighMode} = useContext(StylingContext)!;

    return (
        <div className={css.taskBoxContainer}> {}
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
                            <div key={index}
                                 className={isLighMode ? css.taskDescription_white : css.taskDescription_black}>
                                {index + 1}. {taskDescription.description}
                            </div>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
