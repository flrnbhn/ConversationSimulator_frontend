import {ExerciseData} from "../../../types/exercisedata/ExerciseData";
import React from "react";
import css from "../../exercise/exercisetile/ExerciseTile.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";

interface ExerciseTileProps {
    exerciseData: ExerciseData;
    buttonFunction: (exerciseId: number) => void;
}

export const ExerciseTile: React.FunctionComponent<ExerciseTileProps> = ({exerciseData, buttonFunction}) => {

    return (
        <>
            <div className={css.exerciseTileContainer}>
                <h3>{exerciseData.title}</h3>
                <p>{exerciseData.szenario}</p>
                <PrimaryButton buttonFunction={buttonFunction} title={"Übung starten"}/>
            </div>
        </>
    );
}