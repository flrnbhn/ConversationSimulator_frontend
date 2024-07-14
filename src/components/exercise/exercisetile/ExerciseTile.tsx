import {ExerciseData} from "../../../types/exercisedata/ExerciseData";
import React, {MouseEvent, useContext} from "react";
import css from "../../exercise/exercisetile/ExerciseTile.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "react-tooltip";

interface ExerciseTileProps {
    exerciseData: ExerciseData;
    buttonFunction: (exerciseId: number) => void;
    deleteExerciseById: (exerciseId: number) => void;
}

/**
 * component represent one exercise.
 */
export const ExerciseTile: React.FunctionComponent<ExerciseTileProps> = ({
                                                                             exerciseData,
                                                                             buttonFunction,
                                                                             deleteExerciseById
                                                                         }) => {

    const {isLighMode} = useContext(StylingContext)!

    if (!exerciseData || !exerciseData.taskResponseDTO) {
        return <div>No exercise data available</div>;
    }

    const deleteExercise = (event: MouseEvent<HTMLButtonElement>) => {
        deleteExerciseById(exerciseData.exerciseId);

    }

    return (
        <>
            <div className={isLighMode ? css.exerciseTileContainer_white : css.exerciseTileContainer_black}>
                <div className={css.exerciseTileHeader}>
                    <h3>{exerciseData.title}</h3>
                    {exerciseData.createdByUser
                        ?
                        <button className={css.deleteButton} onClick={deleteExercise}><FontAwesomeIcon
                            icon={faXmark} data-tooltip-id="delete_tooltip"
                            data-tooltip-content="Übung löschen"/></button>

                        :
                        ""}
                </div>
                <Tooltip id={"delete_tooltip"}/>
                <hr className={isLighMode ? css.exerciseHeadingUnderline_white : css.exerciseHeadingUnderline_black}/>

                <div className={css.contentContainer}>
                    <div className={isLighMode ? css.descriptionContainer_white : css.descriptionContainer_black}>
                        <div className={isLighMode ? css.contentHeader_white : css.contentHeader_black}>Szenario
                        </div>
                        <div>{exerciseData.szenario}</div>
                    </div>

                    <div className={isLighMode ? css.roleContainer_white : css.roleContainer_black}>
                        <div className={isLighMode ? css.contentHeader_white : css.contentHeader_black}>Rollen</div>
                        <table className={css.roleTable}>
                            <thead>
                            <tr>
                                <th>Deine Rolle</th>
                                <th>System</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{exerciseData.roleUser}</td>
                                <td>{exerciseData.roleSystem}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={isLighMode ? css.taskContainer_white : css.taskContainer_black}>
                        <div className={isLighMode ? css.contentHeader_white : css.contentHeader_black}>Aufgaben während
                            des Gesprächs
                        </div>
                        <ol className={css.taskList}>
                            {exerciseData.taskResponseDTO.map((taskDescription, index) => (
                                <li key={index} className={css.taskDescription}>
                                    {taskDescription.description}
                                </li>
                            ))}
                        </ol>
                    </div>

                </div>

                <div className={css.exerciseTileButton}>
                    <PrimaryButton buttonFunction={buttonFunction} title={"Übung starten"} disabled={false}/>
                </div>

            </div>
        </>
    );
}