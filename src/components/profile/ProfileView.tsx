import {useLearner} from "../../hooks/learneradministrationhook/useLearner";
import {
    getLearningLanguageEnumByStringValue,
    getLearningLanguageStringValueByEnum,
    LearningLanguage
} from "../../types/learnerdata/LearningLanguage";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {LearnerResponseDTO} from "../../types/learnerdata/LearnerResponseDTO";
import {StylingContext} from "../../context/stylingcontext/StylingContext";
import css from './ProfileView.module.css';

export const ProfileView = () => {

    const {learner, setLearner, changeLearningLanguage} = useLearner();
    const [learningLanguageState, setLearningLanguageState] = useState<string>(getLearningLanguageStringValueByEnum(learner?.learningLanguage));
    const {setCurrentHeadline} = useContext(StylingContext)!


    const learningLanguageStateChanged = (event: ChangeEvent<HTMLSelectElement>) => {
        const newLearningLanguage = getLearningLanguageEnumByStringValue(event.target.value);
        setLearningLanguageState(event.target.value);
        changeLearningLanguage(newLearningLanguage);
        if (learner !== undefined) {
            const updatedLearner: LearnerResponseDTO = {
                ...learner,
                learningLanguage: newLearningLanguage
            };
            setLearner(updatedLearner);
        }
    }

    useEffect(() => {
        setCurrentHeadline("Profil");
    }, []);

    return (
        <div className={css.container}>
            <div className={css.section}>
                <label htmlFor="learnerName" className={css.label}>Name:</label>
                <div className={css.input}>{learner?.name}</div>
            </div>
            <div className={css.section}>
                <label htmlFor="learningLanguage" className={css.label}>Lernende Sprache:</label>
                <select
                    id="learningLanguage"
                    className={css.select}
                    value={learningLanguageState}
                    onChange={(event) => learningLanguageStateChanged(event)}
                >
                    <option value={LearningLanguage.GERMAN}>Deutsch</option>
                    <option value={LearningLanguage.ENGLISH}>Englisch</option>
                    <option value={LearningLanguage.FRENCH}>Französisch</option>
                    <option value={LearningLanguage.SPANISH}>Spanisch</option>
                </select>
            </div>
        </div>
    );

}