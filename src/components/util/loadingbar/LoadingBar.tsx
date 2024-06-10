import css from './LoadingBar.module.css';
import {useContext} from "react";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";


export const LoadingBar = () => {
    const {isLighMode} = useContext(StylingContext)!

    return (
        <div className={isLighMode ? css.loader_white : css.loader_black}></div>
    );
}


