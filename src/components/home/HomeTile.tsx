import React, {useContext} from "react";
import {useNavigate} from "react-router";
import css from './HomeTile.module.css'
import {PrimaryButton} from "../util/primarybutton/PrimaryButton";
import {StylingContext} from "../../context/stylingcontext/StylingContext";

export interface HomeTileProps {
    navPath: string;
    displayString: string;
    imageName: string;
    header: string;
    explanationString: string;
}

/**
 * Explains and enables access to one functionality
 */
export const HomeTile: React.FunctionComponent<HomeTileProps> = ({
                                                                     navPath,
                                                                     displayString,
                                                                     imageName,
                                                                     header,
                                                                     explanationString
                                                                 }) => {
    const navigate = useNavigate();
    const {isLighMode} = useContext(StylingContext)!


    const navToView = (event: React.MouseEvent<MouseEvent>, path: string) => {
        navigate(path);

    };
    return (
        <div>
            <div>
                <div className={isLighMode ? css.textImageContainer_white : css.textImageContainer_black}>
                    <h3 className={css.headerText}>{header}</h3>
                    <hr className={css.tileHeaderLine}/>
                    <div>
                        <img className={css.image} src={imageName} alt={"Bild nicht vorhanden"}/>
                    </div>
                    <div className={css.textContainer}>
                        <p className={css.descriptionText}>{explanationString}</p>
                    </div>
                    <div className={css.tileButton}>
                        <PrimaryButton
                            buttonFunction={(event: React.MouseEvent<MouseEvent>) => navToView(event, navPath)}
                            title={displayString}
                            disabled={false}/>
                    </div>
                </div>


            </div>
        </div>
    )
}