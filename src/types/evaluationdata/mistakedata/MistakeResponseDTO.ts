export interface MistakeResponseDTO {
    message: string;
    shortMessage: string;
    replacement: string[];
    offset: number;
    length: number;
    sentence: string;
}