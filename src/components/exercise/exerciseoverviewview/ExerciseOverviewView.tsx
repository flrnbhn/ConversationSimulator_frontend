import {useExercise} from "../../../hooks/exercisehook/useExercise";
import React, {useContext, useEffect, useState} from "react";
import {ExerciseTile} from "../exercisetile/ExerciseTile";
import {useConversation} from "../../../hooks/conversationhook/useConversation";
import {useNavigate} from "react-router";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {CreateNewExercisePopUp} from "../createnewexercisepopup/CreateNewExercisePopUp";
import Modal from "react-modal";
import css from "./ExerciseOverviewView.module.css";
import {StylingContext} from "../../../context/stylingcontext/StylingContext";
import {ConversationStatus} from "../../../types/conersationstatus/ConversationStatus";

Modal.setAppElement('#root');

/**
 * Component to get access to all exercises
 */
export const ExerciseOverviewView: React.FC = () => {
    const {
        fetchAllExercises,
        allExercisesState,
        setCurrentExerciseId,
        postNewExercise,
        newCreatedExerciseId,
        deleteExerciseById
    } = useExercise();
    const {
        postNewConversation,
        setIsHighscore,
        setHighScoreConversation,
        setConversationStatus
    } = useConversation();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const {setCurrentHeadline} = useContext(StylingContext)!

    useEffect(() => {
        setConversationStatus(ConversationStatus.NOT_STARTED)
        setCurrentHeadline("Übungsübersicht")
        fetchAllExercises();
        setIsHighscore(false);
        setHighScoreConversation(undefined);
    }, []);

    useEffect(() => {
        if (newCreatedExerciseId !== -1) {
            fetchAllExercises()
        }
    }, [newCreatedExerciseId]);


    const enterConversation = (exerciseId: number) => {
        postNewConversation(exerciseId);
        setCurrentExerciseId(exerciseId);
        setIsHighscore(false);
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
                {allExercisesState.map((exercise) => (
                    <div key={exercise.exerciseId}>
                        <ExerciseTile exerciseData={exercise}
                                      buttonFunction={() => enterConversation(exercise.exerciseId)}
                                      deleteExerciseById={deleteExerciseById}
                        />
                    </div>
                ))}
            </div>

            <div className={css.newExerciseButton}>
                <PrimaryButton buttonFunction={openExerciseCreation} title={"Neue Übung erstellen"} disabled={false}/>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Neue Übung erstellen"
                className={css.popUp}
                overlayClassName={css.overlay}
            >
                <CreateNewExercisePopUp closeModal={closeModal} postNewExercise={postNewExercise}/>
            </Modal>
        </>
    );
};