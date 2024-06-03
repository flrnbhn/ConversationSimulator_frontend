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
