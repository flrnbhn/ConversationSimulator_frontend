import {ExerciseData} from "../../../types/exercisedata/ExerciseData";
import React, {useContext} from "react";
import css from "../../exercise/exercisetile/ExerciseTile.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";

interface ExerciseTileProps {
    exerciseData: ExerciseData;
    buttonFunction: (exerciseId: number) => void;
}

export const ExerciseTile: React.FunctionComponent<ExerciseTileProps> = ({exerciseData, buttonFunction}) => {

    const {isLighMode} = useContext(StylingContext)!

    if (!exerciseData || !exerciseData.taskResponseDTO) {
        return <div>No exercise data available</div>;
    }
    return (
        <>
            <div className={isLighMode ? css.exerciseTileContainer_white : css.exerciseTileContainer_black}>
                <div className={css.exerciseTileHeader}>
                    <h3>{exerciseData.title}</h3>
                </div>
                <hr className={isLighMode ? css.exerciseHeadingUnderline_white : css.exerciseHeadingUnderline_black}/>

                <div className={css.contentContainer}>
                    <div className={isLighMode ? css.descriptionContainer_white : css.descriptionContainer_black}>
                        <div className={isLighMode ? css.contentHeader_white : css.contentHeader_black}>Beschreibung
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
                        <div className={isLighMode ? css.contentHeader_white : css.contentHeader_black}>Aufgaben</div>
                        {exerciseData.taskResponseDTO.map((taskDescription, index) => (
                            <div key={index}
                                 className={css.taskDescription}>{index + 1}. {taskDescription.description}</div>
                        ))}
                    </div>
                </div>

                <div className={css.exerciseTileButton}>
                    <PrimaryButton buttonFunction={buttonFunction} title={"Übung starten"} disabled={false}/>
                </div>

            </div>
        </>
    );
}