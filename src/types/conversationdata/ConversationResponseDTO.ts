import {Grade} from "../evaluationdata/Grade";
import {ExerciseData} from "../exercisedata/ExerciseData";

export interface ConversationResponseDTO {
    conversationStartDate: Date;
    gradeOfConversation: Grade;
    pointsOfConversation: number;
    exerciseResponseDTO: ExerciseData;
}
