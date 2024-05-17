import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import css from "./ConversationFinishedPopUp.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {ConversationStatus} from "../../../types/conersationstatus/ConversationStatus";
import {useNavigate} from "react-router";

interface ConversationFinishedPopUpProps {
    conversationStatus: ConversationStatus;
}

export const ConversationFinishedPopUp: React.FunctionComponent<ConversationFinishedPopUpProps> = ({conversationStatus}) => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let conversationCompleted = conversationStatus === ConversationStatus.PASSED || conversationStatus === ConversationStatus.FAILED;

    useEffect(() => {
        if (conversationCompleted) {
            openModal();
        }
    }, [conversationStatus]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const redirectToEvaluation = () => {
        closeModal();
        navigate('/evaluation');
    };

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={redirectToEvaluation}
                contentLabel="Aufgabe abgeschlossen"
                className={conversationStatus === ConversationStatus.PASSED ? css.popUpGreen : css.popUpRed}
            >
                {conversationStatus === ConversationStatus.PASSED ?
                    <div>
                        <h2>Aufgabe bestanden</h2>
                        <p>Du hast die Aufgabe bestanden!</p>
                    </div>
                    :
                    <div>
                        <h2>Aufgabe nicht bestanden</h2>
                        <p>Du hast die Aufgabe nicht bestanden!</p>
                    </div>
                }

                <PrimaryButton buttonFunction={redirectToEvaluation} title={"Zur Übungsübersicht"} disabled={false}/>
            </Modal>
        </div>
    )
}
