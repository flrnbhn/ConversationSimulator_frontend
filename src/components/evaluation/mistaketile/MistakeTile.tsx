import {MistakeResponseDTO} from "../../../types/evaluationdata/mistakedata/MistakeResponseDTO";
import React from "react";
import css from "./MistakeTile.module.css";

interface MistakeTileProps {
    mistake: MistakeResponseDTO;
}

export const MistakeTile: React.FunctionComponent<MistakeTileProps> = ({mistake}) => {
    const {sentence, offset, length} = mistake;
    const beforeError = sentence.slice(0, offset);
    const error = sentence.slice(offset, offset + length);
    const afterError = sentence.slice(offset + length);

    return (
        <div className={css.mistakeTileContainer}>
            <h3>Fehler: {mistake.shortMessage}</h3>
            <p className={css.subheading}>Fehlerpassage:</p>
            <p>
                <span>
                    {beforeError}
                    <span className={css.errorHighlight}>{error}</span>
                    {afterError}
                </span>
            </p>
            <p className={css.subheading}>Fehlerbeschreibung:</p>
            <p>{mistake.message}</p>
        </div>
    );
}
