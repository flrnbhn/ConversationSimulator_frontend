import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import {useEffect} from "react";
import {Table} from "../util/table/Table";
import css from "./LearnProgressView.module.css"
import {getGradeValue} from "../../types/evaluationdata/Grade";

export const LearnProgressView = () => {

    const {
        getLearnerById,
        learner,
        learnerId,
        learnerConversations,
        getConversationsFromLearner
    } = useLearner();

    //const exampleData = null ;

    useEffect(() => {
        if (learnerId !== null && learnerId !== -1) {
            getLearnerById();
            getConversationsFromLearner();
        }
    }, []);


    const tableData = learnerConversations.map((conversation, index) => {
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


    return (
        <div>
            <h2>Lernfortschritt</h2>
            <div>
                Aktueller Notendurchschnitt: {learner?.gradeAverage}
            </div>
            <div>
                <div className={css.gradeTable}>
                    {learnerConversations.length !== 0 ? <Table header={"Vergangene Übungen"} data={tableData}/> :
                        <h3>Keine Noten vorhanden</h3>}
                </div>
            </div>
        </div>
    )
}
