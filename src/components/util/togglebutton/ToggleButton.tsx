import React, {useContext, useEffect, useState} from 'react';
import './ToggleButton.css';
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {StylingContext} from "../../../context/stylingcontext/StylingContext"; // Importiere die CSS-Datei

export const ToggleButton = () => {
    const [isToggled, setIsToggled] = useState(false);
    const {setIsLightMode} = useContext(StylingContext)!

    useEffect(() => {
        if (isToggled) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            setIsLightMode(true);
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            setIsLightMode(false);

        }
    }, [isToggled]);

    const toggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={toggle}>
            <div className="toggle-thumb"><FontAwesomeIcon icon={isToggled ? faSun : faMoon}/></div>
        </div>
    );
};
