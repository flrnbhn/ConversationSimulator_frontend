import {ExerciseData} from "../../../types/exercisedata/ExerciseData";
import React from "react";
import css from "../../exercise/exercisetile/ExerciseTile.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";

interface ExerciseTileProps {
    exerciseData: ExerciseData;
    buttonFunction: (exerciseId: number) => void;
}

export const ExerciseTile: React.FunctionComponent<ExerciseTileProps> = ({exerciseData, buttonFunction}) => {

    if (!exerciseData || !exerciseData.taskResponseDTO) {
        return <div>No exercise data available</div>;
    }
    return (
        <>
            <div className={css.exerciseTileContainer}>
                <h3>{exerciseData.title}</h3>
                <p>{exerciseData.szenario}</p>
                <p>Aufgaben:</p>
                {exerciseData.taskResponseDTO.map((taskDescription, index) => (
                    <div key={index}>{taskDescription.description}</div>
                ))}

                <PrimaryButton buttonFunction={buttonFunction} title={"Übung starten"} disabled={false}/>
            </div>
        </>
    );
}