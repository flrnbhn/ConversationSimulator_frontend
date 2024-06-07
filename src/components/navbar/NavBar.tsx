import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {LearnerContext} from "../../context/learnercontext/LearnerContext";
import {ExerciseContext} from "../../context/exercisecontext/ExerciseContext";
import {ConversationContext} from "../../context/conversationcontext/ConversationContext";
import {ToggleButton} from "../util/togglebutton/ToggleButton";
import './NavBar.css';
import {faHome, faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {Title} from "../util/title/Title";
import {StylingContext} from "../../context/stylingcontext/StylingContext";

export const NavBar = () => {
    const {resetLearnerContext, learner} = useContext(LearnerContext)!;
    const {resetExerciseContext} = useContext(ExerciseContext)!;
    const {resetConversationContext} = useContext(ConversationContext)!;
    const {currentHeadline} = useContext(StylingContext)!


    const logout = () => {
        resetLearnerContext();
        resetExerciseContext();
        resetConversationContext();
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <ToggleButton/>
                </div>
                <div className="navbar-left">
                    <Link to="/home" className="nav-link">
                        <FontAwesomeIcon icon={faHome} data-tooltip-id="home_tooltip"
                                         data-tooltip-content="Zur Startseite"/>
                    </Link>
                </div>
                <div className="navbar-center">
                    <Title title={currentHeadline !== null ? currentHeadline : ""}/>
                </div>
                <div className="navbar-right">
                    <span className="nav-text">
                         <Link to="/profile" className="nav-link" data-tooltip-id="learner_tooltip"
                               data-tooltip-content="Zum Profil">
                             <FontAwesomeIcon icon={faUser}/>
                         </Link>
                    </span>
                    <Link onClick={logout} to="/login" className="nav-link" data-tooltip-id="logout_tooltip"
                          data-tooltip-content="Ausloggen">
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                    </Link>
                </div>
                <Tooltip id="home_tooltip"/>
                <Tooltip id="learner_tooltip"/>
                <Tooltip id="logout_tooltip"/>
            </div>
        </nav>
    );
}
