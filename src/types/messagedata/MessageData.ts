import {ConversationMember} from "../conversationmember/ConversationMember";

export interface MessageData {
    conversationID: number | null;
    message: string | null;
    conversationMember: ConversationMember;
    translation: string | null;
}

export interface MessageRequestDTO {
    conversationID: number | null;
    message: string | null;
    conversationMember: ConversationMember;
}

export interface MessageResponseDTO {
    conversationID: number | null;
    message: string | null;
    conversationMember: ConversationMember;
    synthesizedMessage: string | null;
}

export interface TranscriptionRequestDTO {
    base64String: string;
}