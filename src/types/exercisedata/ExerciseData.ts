export interface ExerciseData {
    exerciseId: number;
    title: string;
    szenario: string;
    furtherInformation: string;
    roleUser: string;
    roleSystem: string;
    numberOfMessagesTillFailure: number;
    taskResponseDTO: TaskResponseDTO[];
    createdByUser: boolean;
}


export interface TaskResponseDTO {
    description: string;
}

export interface TaskRequestDTO {
    description: string;
}

export interface ExerciseRequestDTO {
    title: string;
    szenario: string;
    furtherInformation: string;
    roleUser: string;
    roleSystem: string;
    numberOfMessagesTillFailure: number;
    taskRequestDTO: TaskRequestDTO[];
}