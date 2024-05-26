import React from "react";
import {useNavigate} from "react-router";

export const HomeView = () => {
    const navigate = useNavigate();

    const navToView = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
        event.preventDefault();
        navigate(path);
    };

    return (
        <div>
            <h2>Home</h2>
            <div><a href="/exercises" onClick={(event) => navToView(event, "/exercises")}>Zu den Übungen </a></div>
            <div><a href="/learnProgress" onClick={(event) => navToView(event, "/learnProgress")}> Zu deinem
                Lernfortschritt</a></div>
            <div><a href="/achievement" onClick={(event) => navToView(event, "/achievement")}> Zu deinen
                Erfolgen</a></div>
        </div>
    )
}
