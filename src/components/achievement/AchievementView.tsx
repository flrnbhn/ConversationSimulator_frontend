import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import {useContext, useEffect} from "react";
import css from "./AchievementView.module.css";
import {Table} from "../util/table/Table";
import {StylingContext} from "../../context/stylingcontext/StylingContext";


/**
 * Component to visualize rankings
 */
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
            Rang: allLearners.length - index,
            Spieler: learner.name,
            Punkte: learner.totalPoints
        };
    });

    const tableDataHighScore = learnerHighscores.filter(highscore => highscore.anz >= 0).map((highscore, index) => {
        return {
            Rang: 1,
            Spieler: highscore.name,
            Score: highscore.anz
        };
    }).sort((a, b) => b.Score - a.Score)
        .map((highscore, index) => {
            highscore.Rang = index + 1;
            return highscore;
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
                        <Table header={"Highscore-Tabelle"} data={tableDataHighScore}
                               marker={learner?.name !== undefined ? learner?.name : ""}
                               markedColumn={"Spieler"}/> :
                        <h3>Keine Scores vorhanden</h3>}
                </div>
            </div>
        </div>
    )
}
