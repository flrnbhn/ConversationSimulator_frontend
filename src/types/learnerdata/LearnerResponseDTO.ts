import {Grade} from "../evaluationdata/Grade";
import {LearningLanguage} from "./LearningLanguage";

export interface LearnerResponseDTO {
    name: string;
    learningLanguage: LearningLanguage;
    totalPoints: number;
    allGrades: Grade[];
    gradeAverage: number;
}