import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router";
import {StylingContext} from "../../context/stylingcontext/StylingContext";
import {HomeTile} from "./HomeTile";
import css from "./HomeView.module.css"

export const HomeView = () => {
    const navigate = useNavigate();
    const {setCurrentHeadline} = useContext(StylingContext)!

    const exerciseExplanation = "Tauche ein in spannende Übungen und führe interaktive Gespräche in deiner gewählten Fremdsprache! Nach jeder Übung erhältst du wertvolles Feedback, eine Bewertung und kannst dabei Punkte sammeln. Viel Spaß beim Lernen und Punkten!";
    const learnProgressExplanation = "Behalte deinen Lernfortschritt im Blick! Hier kannst du all deine Bewertungen sehen. Verfolge, wie sich deine Fähigkeiten über die Zeit verbessert haben.";
    const achievementExplanation = "Miss dich mit anderen! Hier kannst du sehen, wie gut du im Vergleich zu anderen Spielern abschneidest. Schau dir die globale Rangliste an, um zu sehen, wer die meisten Punkte hat, und finde heraus, wer im Highscore-Spiel die besten Ergebnisse erzielt hat.";
    const highscoreExplanation = "Zeig dein Können im Highscore-Spiel! Hier zählt jeder Moment. Hier führst du so lange eine Konversation, bis du einen Fehler machst. Bist du bereit, dich mit anderen zu messen und deinen Platz an der Spitze zu sichern?";



    const navToView = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
        event.preventDefault();
        navigate(path);

    };

    useEffect(() => {
        setCurrentHeadline("Home")
    }, []);

    return (
        <div className={css.homeTileContainer}>
            <div><HomeTile navPath={"/exercises"} displayString={"Zu den Übungen"} imageName={'/assets/exercise.jpg'}
                           header={"Übungen"} explanationString={exerciseExplanation}/></div>
            <div><HomeTile navPath={"/highscore"} displayString={"Zum Highscore Spiel"}
                           imageName={'/assets/highscore_game.jpg'} header={"Highscore Spiel"}
                           explanationString={highscoreExplanation}/></div>

            <div><HomeTile navPath={"/learnProgress"} displayString={"Zum Lernfortschritt"}
                           imageName={'/assets/learn_progress.jpg'} header={"Lernfortschritt"}
                           explanationString={learnProgressExplanation}/></div>
            <div><HomeTile navPath={"/achievement"} displayString={"Zu deinen Erfolgen"}
                           imageName={'/assets/achievements.jpg'} header={"Erfolge"}
                           explanationString={achievementExplanation}/></div>
        </div>
    )
}
