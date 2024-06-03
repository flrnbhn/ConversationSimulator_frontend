import OpenAI from "openai";
import {useEffect, useState} from "react";
import {MessageData, MessageRequestDTO, MessageResponseDTO} from "../../types/messagedata/MessageData";
import {ConversationMember} from "../../types/conversationmember/ConversationMember";
import {ChatCompletionCreateParamsBase} from "openai/resources/chat/completions";


export const useLLM = () => {

    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true
    });
    const [newLlmResponseState, setNewLlmResponseState] = useState<MessageResponseDTO>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: 0,
        synthesizedMessage: null,
    });
    const [newRequestState, setNewRequestState] = useState<MessageRequestDTO>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: 0,
    });
    const [allMessagesState, setAllMessagesState] = useState<MessageData[]>([]);
    const LLM_MODEL = "gpt-3.5-turbo-0125";


    useEffect(() => {
        console.log(allMessagesState);
    }, [allMessagesState]);

    function sendMessageToLLM(message: string | null) {
        const updatedMessagesState = updateMessagesState(message);
        const messages = createMessages(updatedMessagesState);
        setNewRequestState({message: message, conversationMember: ConversationMember.USER, conversationID: 0})
        callLlmApi(messages, updatedMessagesState);
    }

    function updateMessagesState(message: string | null): MessageData[] {
        const updatedMessagesState = [...allMessagesState, {
            message: message,
            conversationMember: ConversationMember.USER,
            conversationID: 0,
            synthesizedMessage: null,
            translation: null
        }];
        setAllMessagesState(updatedMessagesState);
        return updatedMessagesState;
    }

    function createMessages(messagesState: MessageData[]): ChatCompletionCreateParamsBase["messages"] {
        const messages: ChatCompletionCreateParamsBase["messages"] = [
            {"role": "system", "content": "You are a helpful assistant."}
        ];

        messagesState.forEach(({message, conversationMember}) => {
            const role = conversationMember === ConversationMember.USER ? "user" : "assistant";
            messages.push({"role": role as "user" | "assistant", "content": message as string});
        });

        return messages;
    }

    function callLlmApi(messages: ChatCompletionCreateParamsBase["messages"], updatedMessagesState: MessageData[]) {
        openai.chat.completions.create({
            messages: messages,
            model: LLM_MODEL,
        }).then(completion => {
            // Aktualisieren des States mit der Antwort des LLM
            const updatedMessagesWithResponse = [...updatedMessagesState, {
                message: completion.choices[0].message.content,
                conversationMember: ConversationMember.PARTNER,
                conversationID: 0,
                synthesizedMessage: null,
                translation: null
            }];
            setAllMessagesState(updatedMessagesWithResponse);
            setNewLlmResponseState({
                message: completion.choices[0].message.content,
                conversationMember: ConversationMember.PARTNER,
                conversationID: 0,
                synthesizedMessage: null,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    function sendMessageToLLMTest() {

        let message: string | null = "";

        openai.chat.completions.create({
            messages: [{role: 'user', content: 'Was ergibt eins plus eins'}],
            model: LLM_MODEL,
        }).then(completion => {
            // setNewLlmResponseState(completion.choices[0].message.content);
            console.log(completion.choices[0].message);
        }).catch(error => {
            //console.log(error);
        });
    }

    return {
        newLlmResponseState,
        sendMessageToLLM,
        setNewRequestState
    }

}