import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import {useContext, useEffect} from "react";
import css from "./AchievementView.module.css";
import {Table} from "../util/table/Table";
import {StylingContext} from "../../context/stylingcontext/StylingContext";

export const AchievementView = () => {

    const {setCurrentHeadline, isLighMode} = useContext(StylingContext)!

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
        setCurrentHeadline("Erfolge");
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
            Score: highscore.anz
        };
    });

    return (
        <div>
            <div className={css.pointNumber}>
                Deine Gesamtpunktzahl: {learner?.totalPoints}
            </div>
            <div>
                <div className={isLighMode ? css.rankTable_white : css.rankTable_black}>
                    {allLearners.length !== 0 ? <Table header={"Rangliste"} data={tableDataPoints.reverse()}
                                                       marker={learner?.name !== undefined ? learner?.name : ""}
                                                       markedColumn={"Spieler"}/> :
                        <h3>Keine Spieler vorhanden</h3>}
                </div>
                <div className={isLighMode ? css.rankTable_white : css.rankTable_black}>
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
