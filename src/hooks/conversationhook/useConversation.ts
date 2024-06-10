import {useContext, useEffect, useState} from "react";
import {
    MessageData,
    MessageRequestDTO,
    MessageResponseDTO,
    TranscriptionRequestDTO
} from "../../types/messagedata/MessageData";
import {ConversationMember} from "../../types/conversationmember/ConversationMember";
import axios from "axios";
import {ConversationData} from "../../types/conversationdata/ConversationData";
import {ConversationContext} from "../../context/conversationcontext/ConversationContext";
import {TaskDescriptionData} from "../../types/taskdescriptionData/TaskDescriptionData";
import {ExerciseContext} from "../../context/exercisecontext/ExerciseContext";
import {ConversationStatus} from "../../types/conersationstatus/ConversationStatus";
import {ConversationStatusDTO} from "../../types/conersationstatus/ConversationStatusDTO";
import {useLocation} from "react-router";
import {LearnerContext} from "../../context/learnercontext/LearnerContext";
import {HighScoreConversationResponseDTO} from "../../types/conversationdata/HighScoreConversationResponseDTO";


export const useConversation = () => {

    const [newConversationResponseState, setNewConversationResponseState] = useState<MessageResponseDTO>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null,
        synthesizedMessage: null,
    });
    const [newConversationRequestState, setNewConversationRequestState] = useState<MessageRequestDTO>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null,
        isAudioMessage: false
    });
    let currentConversationIdNumber: number | null = null;
    const location = useLocation();
    const [allMessagesState, setAllMessagesState] = useState<MessageData[]>([]);
    //const [currentConversationId, setCurrentConversationId] = useState<number | null>(currentConversationIdNumber);
    const {
        currentConversationId,
        setCurrentConversationId,
        isHighscore,
        setIsHighscore,
        highScoreConversation,
        setHighScoreConversation
    } = useContext(ConversationContext)!;
    const [completedTaskDescriptions, setCompletedTaskDescriptions] = useState<TaskDescriptionData[]>([]);
    const {allTasksForExercise} = useContext(ExerciseContext)!;
    const {currentExercise} = useContext(ExerciseContext)!;
    const [conversationStatus, setConversationStatus] = useState<ConversationStatus>(ConversationStatus.NOT_STARTED);
    const {learnerId} = useContext(LearnerContext)!;
    const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
    const [audioState, setAudioState] = useState<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    useEffect(() => {
        if (location.pathname === "/exercises" || location.pathname === "/highscore") {
            setAllMessagesState([]);
            setNewConversationResponseState({
                message: "",
                conversationMember: ConversationMember.NONE,
                conversationID: null,
                synthesizedMessage: null,
            });
            console.log(location.pathname)
            setCurrentConversationId(null);
        }
        if (location.pathname === "/home") {
            deleteConversation();
        }
    }, [location]);

    useEffect(() => {
        if (isMuted) {
            if (audioState !== null && audioState.played) {
                audioState.pause();
                setAudioPlayed(false);
            }
        }
    }, [isMuted]);


    useEffect(() => {
        console.log(allMessagesState);
        console.log("currentConversationId: ", currentConversationId);
        console.log("currentConversationIdNumber: ", currentConversationIdNumber);
    }, [allMessagesState]);

    useEffect(() => {
        console.log("currentConversationId: ", currentConversationId);
        console.log("currentConversationIdNumber: ", currentConversationIdNumber);

    }, [currentConversationId]);

    useEffect(() => {
        if (newConversationResponseState !== null) {
            if (!isHighscore && isMuted) {
                getEvaluatedTasks();
            }
        }
    }, [newConversationResponseState]);

    useEffect(() => {
        if (conversationStatus === ConversationStatus.PASSED || conversationStatus === ConversationStatus.FAILED) {
            if (audioPlayed) {
                setAudioPlayed(false);
                if (audioState !== null) {
                    audioState.pause();
                }
            }
        }
    }, [conversationStatus]);


    function sendNewMessage(message: string | null, isAudioMessage: boolean) {
        setAudioPlayed(true);
        const newConversationRequestMessage: MessageRequestDTO = {
            message: message,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId,
            isAudioMessage: isAudioMessage
        }
        const newStateMessage: MessageData = {
            message: message,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId,
            translation: null
        }

        const updatedMessagesState = updateMessagesState(newStateMessage);
        setNewConversationRequestState(newConversationRequestMessage)
        postMessageResponse(newConversationRequestMessage, updatedMessagesState);
    }

    function updateMessagesState(messageData: MessageData): MessageData[] {
        const updatedMessagesState = [...allMessagesState, messageData];
        setAllMessagesState(updatedMessagesState);
        return updatedMessagesState;
    }

    function postMessageResponse(newConversationRequestMessage: MessageRequestDTO, updatedMessagesState: MessageData[]) {
        axios.post<MessageResponseDTO>('/conversation/newMessage', newConversationRequestMessage)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const messageData: MessageData = {
                    conversationID: data.conversationID,
                    message: data.message,
                    conversationMember: data.conversationMember,
                    translation: null
                }
                const updatedMessagesWithResponse = [...updatedMessagesState, messageData];
                setAllMessagesState(updatedMessagesWithResponse);
                setNewConversationResponseState(data);
                if (!isMuted) {
                    playAudio(data.synthesizedMessage);
                } else {
                    setAudioPlayed(false);

                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    function receiveFirstMessage() {
        axios.get<MessageResponseDTO>('conversation/init/' + currentConversationId)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const updatedMessagesWithResponse = [data];
                const messageData: MessageData[] = [{
                    conversationID: data.conversationID,
                    message: data.message,
                    conversationMember: data.conversationMember,
                    translation: null
                }]
                setAllMessagesState(messageData);
                setNewConversationResponseState(data);
                if (!isMuted) {
                    playAudio(data.synthesizedMessage);
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function playAudio(synthesizedMessage: string | null) {
        if (synthesizedMessage !== null) {
            console.log("start")
            const audioBytes = new Uint8Array(atob(synthesizedMessage).split("").map(char => char.charCodeAt(0)));
            const audioBlob = new Blob([audioBytes], {type: 'audio/mp3'});
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            setAudioState(audio);
            audio.addEventListener('play', () => {
                setAudioPlayed(true);
                console.log("Audio started playing");
            });

            audio.addEventListener('ended', () => {
                setAudioPlayed(false);
                console.log("Audio finished playing");
                if (!isHighscore && !isMuted) {
                    getEvaluatedTasks();
                }
            });

            audio.play().catch((error) => {
                console.error('Error playing audio:', error);
                setAudioPlayed(false);
            });
        }
    }

    function postNewConversation(exerciseId: number) {
        const newConversation: ConversationData = {
            conversationStartDate: new Date(),
            exerciseId: exerciseId,
            learnerId: learnerId
        };
        axios.post<number>("/conversation", newConversation)
            .then(response => {
                return response.data;
            })
            .then(data => {
                console.log('Conversation creation successful, conversationID:', data);
                currentConversationIdNumber = data;
                setCurrentConversationId(data)
                setConversationStatus(ConversationStatus.IN_PROCESS);
                postNewConversationStatus(ConversationStatus.IN_PROCESS, data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function getEvaluatedTasks() {
        axios.get<TaskDescriptionData[]>('conversation/finishedTasks/' + currentConversationId)
            .then(response => response.data)
            .then(data => {
                console.log(data);
                setCompletedTaskDescriptions(data);
                checkIfAllTasksCompleted(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function checkIfAllTasksCompleted(completedDescriptions: TaskDescriptionData[]) {
        if (currentExercise != null) {
            if (allMessagesState.length >= currentExercise.numberOfMessagesTillFailure) {
                setConversationStatus(ConversationStatus.FAILED);
                postNewConversationStatus(ConversationStatus.FAILED, currentConversationId);
            }
        }

        if (allTasksForExercise.length !== completedDescriptions.length || allTasksForExercise.length === 0) {
            return;
        }
        if (allTasksForExercise.every((element, index) => element.description === completedDescriptions[index].description)) {
            setConversationStatus(ConversationStatus.PASSED);
            postNewConversationStatus(ConversationStatus.PASSED, currentConversationId);
            console.log("Tasks sind hiermit fertiggestellt!!!");
            return;
        }
    }

    function postNewConversationStatus(conversationStatus: ConversationStatus, conversationId: number | null) {
        const conversationStatusDTO: ConversationStatusDTO = {conversationStatus: conversationStatus};
        axios.post('/conversation/conversationStatus/' + conversationId, conversationStatusDTO)
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    function postHighscoreConversation() {
        const newConversation: ConversationData = {
            conversationStartDate: new Date(),
            exerciseId: -1,
            learnerId: learnerId
        };
        axios.post<HighScoreConversationResponseDTO>("/conversation/highscore", newConversation)
            .then(response => {
                return response.data;
            })
            .then(data => {
                if (isHighscore) {
                    setCurrentConversationId(data.conversationId)
                    setConversationStatus(ConversationStatus.IN_PROCESS);
                    postNewConversationStatus(ConversationStatus.IN_PROCESS, data.conversationId);
                    setHighScoreConversation(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function deleteConversation() {
        axios.delete("/conversation/" + currentConversationId)
            .then(response => response.data)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error deleting data: ', error);
            })
    }

    function transcribeAndSendSpeechInput(message: string) {
        const transcriptionData: TranscriptionRequestDTO = {
            base64String: message
        };
        axios.post<string>("/conversation/transcribe", transcriptionData)
            .then(response => response.data)
            .then(data => {
                sendNewMessage(data, true);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function translateMessage(message: string, index: number) {
        axios.post<string>("/conversation/translate/" + currentConversationId, message)
            .then(response => response.data)
            .then(translationString => {
                setAllMessagesState(prevState => {
                    const newState = [...prevState];
                    newState[index] = {...newState[index], translation: translationString};
                    return newState;
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }


    return {
        newConversationResponseState,
        sendNewMessage,
        setNewConversationRequestState,
        postNewConversation,
        currentConversationId,
        receiveFirstMessage,
        completedTaskDescriptions,
        conversationStatus,
        currentExercise,
        postHighscoreConversation,
        highScoreConversation,
        setIsHighscore,
        isHighscore,
        setConversationStatus,
        postNewConversationStatus,
        allMessagesState,
        deleteConversation,
        audioPlayed,
        audioState,
        setIsMuted,
        isMuted,
        transcribeAndSendSpeechInput,
        translateMessage,
        setHighScoreConversation
    }
}
