import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import {useContext, useEffect, useState} from "react";
import {Table} from "../util/table/Table";
import css from "./LearnProgressView.module.css"
import {getGradeValue} from "../../types/evaluationdata/Grade";
import {Chart} from "../util/chart/Chart";
import {StylingContext} from "../../context/stylingcontext/StylingContext";

export const LearnProgressView = () => {
    const {setCurrentHeadline, isLighMode} = useContext(StylingContext)!

    const {
        getLearnerById,
        learner,
        learnerId,
        learnerConversations,
        getConversationsFromLearner
    } = useLearner();

    const [averageGrades, setAverageGrades] = useState<number[]>([]);

    useEffect(() => {
        setCurrentHeadline("Lernfortschritt");
        if (learnerId !== null && learnerId !== -1) {
            getLearnerById();
            getConversationsFromLearner();
        }
    }, []);


    const tableData = learnerConversations.filter(conversation => getGradeValue(conversation.gradeOfConversation) !== "Keine Note vorhanden").map((conversation, index) => {

        const date = new Date(conversation.conversationStartDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${day}.${month}.${year}`;
        const formattedTime = `${hours}:${minutes}`;

        return {
            Datum: formattedDate,
            Uhrzeit: formattedTime,
            Übung: conversation.exerciseResponseDTO.title,
            Note: getGradeValue(conversation.gradeOfConversation)
        };
    });

    const calcAverages = (grades: number[]) => {
        const averages: number[] = [];
        for (let i = 0; i < grades.length; i++) {
            if (i === 0) {
                averages.push(grades[i]);
            } else {
                let j = i;
                let addition = 0;
                while (j >= 0) {
                    addition += grades[j];
                    j--;
                }
                let average = addition / (i + 1);
                averages.push(average)
            }
        }
        return averages;
    }

    return (
        <div>
            <div className={css.chartContainer}>
                <Chart header={"Notenentwicklung"}
                       dataset={calcAverages(tableData.map(dataSet => Number(dataSet.Note)))
                           .map(average => String(average))}
                       labels={tableData.map(dataset => dataset.Datum)}/>
            </div>
            <div className={css.gradeAverage}>
                Aktueller Notendurchschnitt: {learner?.gradeAverage}
            </div>
            <div>
                <div className={isLighMode ? css.gradeTable_white : css.gradeTable_black}>
                    {learnerConversations.length !== 0 ?
                        <Table header={"Vergangene Übungen"} data={tableData.reverse()}/> :
                        <h3>Keine Noten vorhanden</h3>}
                </div>
            </div>
        </div>
    )
}
