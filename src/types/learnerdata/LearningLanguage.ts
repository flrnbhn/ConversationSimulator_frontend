import {Grade} from "../evaluationdata/Grade";

export enum LearningLanguage {
    GERMAN = 'GERMAN',
    ENGLISH = 'ENGLISH',
    FRENCH = 'FRENCH',
    SPANISH = 'SPANISH'
}

export const getLearningLanguageValue = (learningLanguage: LearningLanguage | undefined): string => {
    switch (learningLanguage) {
        case LearningLanguage.GERMAN:
            return "Deutsch";
        case LearningLanguage.ENGLISH:
            return "Englisch";
        case LearningLanguage.FRENCH:
            return "Französisch";
        case LearningLanguage.SPANISH:
            return "Spanisch";
        default:
            return "Sprache nicht vorhanden";
    }
};

export const getLearningLanguageEnum = (learningLanguage: string | undefined): LearningLanguage => {
    switch (learningLanguage) {
        case "Deutsch":
            return LearningLanguage.GERMAN;
        case "Englisch" :
            return LearningLanguage.ENGLISH;
        case "Französisch":
            return LearningLanguage.FRENCH;
        case "Spanisch":
            return LearningLanguage.SPANISH;
        default:
            return LearningLanguage.ENGLISH;
    }
};

export const getLearningLanguageEnumByStringValue = (learningLanguage: string | undefined): LearningLanguage => {
    switch (learningLanguage) {
        case "GERMAN":
            return LearningLanguage.GERMAN;
        case "ENGLISH" :
            return LearningLanguage.ENGLISH;
        case "FRENCH":
            return LearningLanguage.FRENCH;
        case "SPANISH":
            return LearningLanguage.SPANISH;
        default:
            return LearningLanguage.ENGLISH;
    }
};

export const getLearningLanguageStringValueByEnum = (learningLanguage: LearningLanguage | undefined): string => {
    switch (learningLanguage) {
        case LearningLanguage.GERMAN:
            return "GERMAN";
        case LearningLanguage.ENGLISH :
            return "ENGLISH";
        case LearningLanguage.FRENCH:
            return "FRENCH";
        case LearningLanguage.SPANISH:
            return "SPANISH";
        default:
            return "ENGLISH";

    }
};


export interface LearningLanguageDTO {
    learningLanguage: LearningLanguage
}
