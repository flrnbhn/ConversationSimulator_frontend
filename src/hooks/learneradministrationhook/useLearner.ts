import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {LearnerContext} from "../../context/learnercontext/LearnerContext";
import {LearnerRegistrateRequestDTO} from "../../types/learnerdata/LearnerRegistrateRequestDTO";
import {LearnerLoginRequestDTO} from "../../types/learnerdata/LearnerLoginRequestDTO";
import {LearnerResponseDTO} from "../../types/learnerdata/LearnerResponseDTO";
import {ConversationResponseDTO} from "../../types/conversationdata/ConversationResponseDTO";
import {HighScoreLearnersResponseDTO} from "../../types/learnerdata/HighScoreLearnersResponseDTO";
import {LearningLanguage, LearningLanguageDTO} from "../../types/learnerdata/LearningLanguage";

export const useLearner = () => {

    const {learnerId, setLearnerId, learner, setLearner} = useContext(LearnerContext)!;
    const [learnerConversations, setLearnerConversations] = useState<ConversationResponseDTO[]>([]);
    const [allLearners, setAllLearners] = useState<LearnerResponseDTO[]>([]);
    const [learnerHighscores, setLearnerHighscores] = useState<HighScoreLearnersResponseDTO[]>([]);


    useEffect(() => {
        if (learnerId !== null) {
            getLearnerById();
        }
    }, [learnerId]);

    function postRegistration(name: string, learningLanguage: LearningLanguage) {
        const learnerRegistrateRequestDTO: LearnerRegistrateRequestDTO = {
            name: name,
            learningLanguage: learningLanguage
        }
        axios.post<number>("/learner/registrate", learnerRegistrateRequestDTO)
            .then(res => res.data)
            .then(data => {
                setLearnerId(data);
            })
            .catch(error => {
                console.log("Registrierung hat nicht funktioniert:" + error);
                setLearnerId(-1);
            })
    }

    function postLogin(name: string) {
        const learnerLoginRequestDTO: LearnerLoginRequestDTO = {
            name: name,
        }
        axios.post<number>("/learner/login", learnerLoginRequestDTO)
            .then(res => res.data)
            .then(data => {
                setLearnerId(data);
            })
            .catch(error => {
                console.log("Login hat nicht funktioniert:" + error);
                setLearnerId(-1);
            })
    }

    function getLearnerById() {
        axios.get<LearnerResponseDTO>("/learner/" + learnerId)
            .then(res => res.data)
            .then(data => {
                setLearner(data);
            })
            .catch(error => {
                console.log("Fetch hat nicht funktioniert: " + error);
            })
    }

    function getAllLearnersSortedByTotalPoints() {
        axios.get<LearnerResponseDTO[]>("/learner")
            .then(res => res.data)
            .then(data => {
                setAllLearners(data);
            })
            .catch(error => {
                console.log("Fetch hat nicht funktioniert: " + error);
            })
    }

    function getConversationsFromLearner() {
        axios.get<ConversationResponseDTO[]>("/learner/conversations/" + learnerId)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setLearnerConversations(data);
            })
            .catch(error => {
                console.log("Fetch hat nicht funktioniert: " + error);
            })
    }

    function getAllHighscoresFromAllLearners() {
        axios.get<HighScoreLearnersResponseDTO[]>("/learner/highscore")
            .then(res => res.data)
            .then(data => {
                setLearnerHighscores(data);

            })
            .catch(error => {
                console.log("Fetch hat nicht funktioniert: " + error);
            })
    }

    function changeLearningLanguage(learningLanguage: LearningLanguage) {
        const learningLanguageDTO: LearningLanguageDTO = {learningLanguage: learningLanguage};
        axios.post("learner/language/" + learnerId, learningLanguageDTO)
            .catch(error => {
                console.log("Post hat nicht funktioniert " + error);
            })
    }

    return {
        learnerId,
        postRegistration,
        postLogin,
        setLearnerId,
        getLearnerById,
        learner,
        getConversationsFromLearner,
        learnerConversations,
        getAllLearnersSortedByTotalPoints,
        allLearners,
        getAllHighscoresFromAllLearners,
        learnerHighscores,
        setLearner,
        changeLearningLanguage
    }
}
