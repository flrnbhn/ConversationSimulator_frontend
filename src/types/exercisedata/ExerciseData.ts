export interface ExerciseData {
    exerciseId: number;
    title: string;
    szenario: string;
    furtherInformation: string;
    numberOfMessagesTillFailure: number;
    taskResponseDTO: TaskResponseDTO[];
}


export interface TaskResponseDTO {
    description: string;
}