import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import css from "./ConversationFinishedPopUp.module.css";
import {PrimaryButton} from "../../util/primarybutton/PrimaryButton";
import {ConversationStatus} from "../../../types/conersationstatus/ConversationStatus";
import {useNavigate} from "react-router";
import {Title} from "../../util/title/Title";

interface ConversationFinishedPopUpProps {
    conversationStatus: ConversationStatus;
}

/**
 * PopUp to be displayed when an exercise has been completed
 */
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
                        <Title title={"Aufgabe bestanden"}/>
                        <p>Du hast die Aufgabe bestanden!</p>
                    </div>
                    :
                    <div>
                        <Title title={"Aufgabe nicht bestanden"}/>
                        <p>Du hast die Aufgabe nicht bestanden!</p>
                    </div>
                }

                <PrimaryButton buttonFunction={redirectToEvaluation} title={"Zur Übungsauswertung"} disabled={false}/>
            </Modal>
        </div>
    )
}
