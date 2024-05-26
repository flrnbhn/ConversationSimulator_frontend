import {Grade} from "../evaluationdata/Grade";

export interface LearnerResponseDTO {
    name: string;
    learningLanguage: string;
    totalPoints: number;
    allGrades: Grade[];
    gradeAverage: number;
}