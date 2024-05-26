import {useExercise} from "../../../hooks/exercisehook/useExercise";
import React, {useEffect, useState} from "react";
import {ExerciseTile} from "../exercisetile/ExerciseTile";
import {useConversation} from "../../../hooks/conversationhook/useConversation";
import {useNavigate} from "react-router";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {CreateNewExercisePopUp} from "../createnewexercisepopup/CreateNewExercisePopUp";
import Modal from "react-modal";
import css from "./ExerciseOverviewView.module.css";

Modal.setAppElement('#root');

export const ExerciseOverviewView: React.FC = () => {
    const {
        fetchAllExercises,
        allExercisesState,
        setCurrentExerciseId,
        postNewExercise,
        newCreatedExerciseId
    } = useExercise();
    const {postNewConversation, currentConversationId} = useConversation();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchAllExercises();
    }, []);

    useEffect(() => {
        if (newCreatedExerciseId !== -1) {
            fetchAllExercises()
        }
    }, [newCreatedExerciseId]);


    useEffect(() => {
        console.log(allExercisesState);
    }, [allExercisesState]);

    const enterConversation = (exerciseId: number) => {
        postNewConversation(exerciseId);
        setCurrentExerciseId(exerciseId);
        navigate('/chat');
    }

    const openExerciseCreation = () => {
        openModal();
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <>
            <div>
                Übungsübersicht
            </div>
            <div>
                {allExercisesState.map((exercise) => (
                    <div key={exercise.exerciseId}>
                        <ExerciseTile exerciseData={exercise}
                                      buttonFunction={() => enterConversation(exercise.exerciseId)}/>
                    </div>
                ))}
            </div>

            <div>
                <PrimaryButton buttonFunction={openExerciseCreation} title={"Neue Übung erstellen"} disabled={false}/>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Aufgabe abgeschlossen"
                className={css.popUp}
            >
                <CreateNewExercisePopUp closeModal={closeModal} postNewExercise={postNewExercise}/>
            </Modal>
        </>
    );
};