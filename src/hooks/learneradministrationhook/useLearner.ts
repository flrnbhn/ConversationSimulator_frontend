import axios from "axios";
import {useContext} from "react";
import {LearnerContext} from "../../context/learnercontext/LearnerContext";
import {LearnerRegistrateRequestDTO} from "../../types/learnerdata/LearnerRegistrateRequestDTO";
import {LearnerLoginRequestDTO} from "../../types/learnerdata/LearnerLoginRequestDTO";

export const useLearner = () => {

    const {learnerId, setLearnerId} = useContext(LearnerContext)!;

    function postRegistration(name: string, learningLanguage: string) {
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

    return {
        learnerId,
        postRegistration,
        postLogin,
        setLearnerId
    }
}
