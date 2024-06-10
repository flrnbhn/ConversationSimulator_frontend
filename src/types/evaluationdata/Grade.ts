export enum Grade {
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE",
    FOUR = "FOUR",
    FIVE = "FIVE",
    SIX = "SIX",
    UNRATED = "undefined",
}

export const getGradeValue = (grade: Grade | undefined): string => {
    console.log("moin")
    console.log(grade)
    switch (grade) {
        case Grade.ONE:
            return "1.0";
        case Grade.TWO:
            return "2.0";
        case Grade.THREE:
            return "3.0";
        case Grade.FOUR:
            return "4.0";
        case Grade.FIVE:
            return "5.0";
        case Grade.SIX:
            return "6.0";
        case Grade.UNRATED:
            return "-1.0";
        default:
            return "Keine Note vorhanden";
    }
};

export const getGradeValueNumber = (grade: Grade | undefined): number | null => {
    console.log("moin")
    console.log(grade)
    switch (grade) {
        case Grade.ONE:
            return 1.0;
        case Grade.TWO:
            return 2.0;
        case Grade.THREE:
            return 3.0;
        case Grade.FOUR:
            return 4.0;
        case Grade.FIVE:
            return 5.0;
        case Grade.SIX:
            return 6.0;
        case Grade.UNRATED:
            return null;
        default:
            return null;
    }
};


//    const gradeValue = GradeValues[grade];