import {MistakeResponseDTO} from "./mistakedata/MistakeResponseDTO";
import {Grade} from "./Grade";

export interface EvaluationResponseDTO {
    mistakeResponseDTOS: MistakeResponseDTO[];
    grade: Grade;
    points: number;
}