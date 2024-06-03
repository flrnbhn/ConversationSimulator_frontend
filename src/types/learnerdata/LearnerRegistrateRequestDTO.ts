import {LearningLanguage} from "./LearningLanguage";

export interface LearnerRegistrateRequestDTO {
    name: string;
    learningLanguage: LearningLanguage;
}