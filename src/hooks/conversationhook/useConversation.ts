import {useContext, useEffect, useState} from "react";
import {MessageData} from "../../types/messagedata/MessageData";
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


export const useConversation = () => {

    const [newConversationResponseState, setNewConversationResponseState] = useState<MessageData>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null
    });
    const [newConversationRequestState, setNewConversationRequestState] = useState<MessageData>({
        message: "",
        conversationMember: ConversationMember.NONE,
        conversationID: null
    });
    let currentConversationIdNumber: number | null = null;
    const location = useLocation();
    const [allMessagesState, setAllMessagesState] = useState<MessageData[]>([]);
    //const [currentConversationId, setCurrentConversationId] = useState<number | null>(currentConversationIdNumber);
    const {currentConversationId, setCurrentConversationId} = useContext(ConversationContext)!;
    const [completedTaskDescriptions, setCompletedTaskDescriptions] = useState<TaskDescriptionData[]>([]);
    const {allTasksForExercise} = useContext(ExerciseContext)!;
    const {currentExercise} = useContext(ExerciseContext)!;
    const [conversationStatus, setConversationStatus] = useState<ConversationStatus>(ConversationStatus.NOT_STARTED);
    const {learnerId} = useContext(LearnerContext)!;


    /* useEffect(() => {
         if (conversationStatus === ConversationStatus.PASSED || conversationStatus === ConversationStatus.FAILED) {
             setAllMessagesState([]);
             setNewConversationResponseState({
                 message: "",
                 conversationMember: ConversationMember.NONE,
                 conversationID: null
             });
         }
     }, [conversationStatus]); */

    useEffect(() => {
        if (location.pathname === "/exercises") {
            setAllMessagesState([]);
            setNewConversationResponseState({
                message: "",
                conversationMember: ConversationMember.NONE,
                conversationID: null
            });
            console.log(location.pathname)
            setCurrentConversationId(null);
        }
    }, [location]);


    useEffect(() => {
        console.log(allMessagesState);
        console.log("currentConversationId: ", currentConversationId);
        console.log("currentConversationIdNumber: ", currentConversationIdNumber);
    }, [allMessagesState]);

    useEffect(() => {
        console.log("currentConversationId: ", currentConversationId);
        console.log("currentConversationIdNumber: ", currentConversationIdNumber);

    }, [currentConversationId]);

    function sendNewMessage(message: string | null) {
        const newConversationRequestMessage = {
            message: message,
            conversationMember: ConversationMember.USER,
            conversationID: currentConversationId
        }
        const updatedMessagesState = updateMessagesState(newConversationRequestMessage);
        setNewConversationRequestState(newConversationRequestMessage)
        postMessageResponse(newConversationRequestMessage, updatedMessagesState);
        getEvaluatedTasks();
    }

    function updateMessagesState(messageData: MessageData): MessageData[] {
        const updatedMessagesState = [...allMessagesState, messageData];
        setAllMessagesState(updatedMessagesState);
        return updatedMessagesState;
    }

    function postMessageResponse(newConversationRequestMessage: MessageData, updatedMessagesState: MessageData[]) {
        axios.post<MessageData>('/conversation/newMessage', newConversationRequestMessage)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const updatedMessagesWithResponse = [...updatedMessagesState, data];
                setAllMessagesState(updatedMessagesWithResponse);
                setNewConversationResponseState(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    function receiveFirstMessage() {
        axios.get<MessageData>('conversation/init/' + currentConversationId)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const updatedMessagesWithResponse = [data];
                setAllMessagesState(updatedMessagesWithResponse);
                setNewConversationResponseState(data);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
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
        console.log("in methode drin")
        if (currentExercise != null) {
            if (allMessagesState.length >= currentExercise.numberOfMessagesTillFailure) {
                setConversationStatus(ConversationStatus.FAILED);
                postNewConversationStatus(ConversationStatus.FAILED, currentConversationId);
            }
        }

        if (allTasksForExercise.length !== completedDescriptions.length) {
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

    return {
        newConversationResponseState,
        sendNewMessage,
        setNewConversationRequestState,
        postNewConversation,
        currentConversationId,
        receiveFirstMessage,
        completedTaskDescriptions,
        conversationStatus,
        currentExercise
    }
}
