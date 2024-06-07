import {MistakeResponseDTO} from "../../../types/evaluationdata/mistakedata/MistakeResponseDTO";
import React, {useContext} from "react";
import css from "./MistakeTile.module.css";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";

interface MistakeTileProps {
    mistake: MistakeResponseDTO;
}

export const MistakeTile: React.FunctionComponent<MistakeTileProps> = ({mistake}) => {
    const {sentence, offset, length} = mistake;
    const beforeError = sentence.slice(0, offset);
    const error = sentence.slice(offset, offset + length);
    const afterError = sentence.slice(offset + length);
    const {isLighMode} = useContext(StylingContext)!


    return (
        <div className={isLighMode ? css.mistakeTileContainer_white : css.mistakeTileContainer_black}>
            <h3>Fehler: {mistake.shortMessage}</h3>
            <div className={css.mistakePart}>
                <p className={css.subheading}>Fehlerpassage:</p>
            <p>
                <span>
                    {beforeError}
                    <span className={css.errorHighlight}>{error}</span>
                    {afterError}
                </span>
            </p>
            </div>

            <div className={css.mistakeExplanation}>
                <p className={css.subheading}>Fehlerbeschreibung:</p>
                <p>{mistake.message}</p>
            </div>

        </div>
    );
}
