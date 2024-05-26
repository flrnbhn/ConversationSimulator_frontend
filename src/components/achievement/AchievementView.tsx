import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import {useEffect} from "react";
import css from "../learnprogress/LearnProgressView.module.css";
import {Table} from "../util/table/Table";

export const AchievementView = () => {

    const {
        getAllLearnersSortedByTotalPoints,
        allLearners,
        learner,
        getLearnerById,
        learnerId
    } = useLearner();

    useEffect(() => {
        if (learnerId !== null && learnerId !== -1) {
            getLearnerById();
            getAllLearnersSortedByTotalPoints();
        }
    }, []);

    const tableData = allLearners.map((learner, index) => {
        return {
            Spieler: learner.name,
            Punkte: learner.totalPoints,
            Rang: ""
        };
    });

    return (
        <div>
            <div>
                <h2>Erfolge</h2>
            </div>
            <div>
                Deine Punktzahl: {learner?.totalPoints}
            </div>
            <div>
                <div className={css.gradeTable}>
                    {allLearners.length !== 0 ? <Table header={"Rangliste"} data={tableData}
                                                       marker={learner?.name !== undefined ? learner?.name : ""}
                                                       markedColumn={"Spieler"}/> :
                        <h3>Keine Spieler vorhanden</h3>}
                </div>
            </div>
        </div>
    )
}
