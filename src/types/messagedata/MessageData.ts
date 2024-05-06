import {ConversationMember} from "../conversationmember/ConversationMember";

export interface MessageData {
    message: string | null;
    conversationMember: ConversationMember;
    conversationID: number | null;
}