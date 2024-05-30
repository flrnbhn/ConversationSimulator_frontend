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
        learnerId,
        getAllHighscoresFromAllLearners,
        learnerHighscores
    } = useLearner();

    useEffect(() => {
        if (learnerId !== null && learnerId !== -1) {
            getLearnerById();
            getAllLearnersSortedByTotalPoints();
            getAllHighscoresFromAllLearners();
        }
    }, []);

    const tableDataPoints = allLearners.map((learner, index) => {
        return {
            Spieler: learner.name,
            Punkte: learner.totalPoints,
            Rang: ""
        };
    });

    const tableDataHighScore = learnerHighscores.map((highscore, index) => {
        return {
            Spieler: highscore.name,
            Anzahl: highscore.anz
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
                    {allLearners.length !== 0 ? <Table header={"Rangliste"} data={tableDataPoints}
                                                       marker={learner?.name !== undefined ? learner?.name : ""}
                                                       markedColumn={"Spieler"}/> :
                        <h3>Keine Spieler vorhanden</h3>}
                </div>
                <div className={css.gradeTable}>
                    {learnerHighscores.length !== 0 ?
                        <Table header={"Die höchsten Highscores"} data={tableDataHighScore}
                               marker={learner?.name !== undefined ? learner?.name : ""}
                               markedColumn={"Spieler"}/> :
                        <h3>Keine Scores vorhanden</h3>}
                </div>
            </div>
        </div>
    )
}
