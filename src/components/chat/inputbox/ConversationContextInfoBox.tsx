import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import css from './ConversationContextInfoBox.module.css';
import {StylingContext} from "../../../context/stylingcontext/StylingContext";


interface ConversationContextInfoBoxProps {
    closeModal: () => void;
    szenario: string | undefined;
    roleUser: string | undefined;
    roleSystem: string | undefined;
}

export const ConversationContextInfoBox: React.FunctionComponent<ConversationContextInfoBoxProps> = ({
                                                                                                         closeModal,
                                                                                                         szenario,
                                                                                                         roleSystem,
                                                                                                         roleUser
                                                                                                     }) => {
    const {isLighMode} = useContext(StylingContext)!;

    return (
        <div className={css.popUpWrapper_black}>
            <div>
                <button className={css.closeButton} onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark} data-tooltip-id="close_tooltip" data-tooltip-content="Schließen"/>
                </button>
            </div>
            <div className={isLighMode ? css.explanationContainer_white : css.explanationContainer_black}>
                <div className={isLighMode ? css.szenarioContainer_white : css.szenarioContainer_black}>
                    <div className={css.szenarioHeader}>
                        Szenario
                    </div>
                    <div>{szenario}</div>
                </div>
                <div className={css.roles}>
                    <div className={isLighMode ? css.yourRoleContainer_white : css.yourRoleContainer_black}>
                        <div className={css.yourRoleHeader}>
                            Du bist
                        </div>
                        <div className={css.yourRole}>{roleUser}</div>
                    </div>
                    <div className={isLighMode ? css.systemRoleContainer_white : css.systemRoleContainer_black}>
                        <div className={css.systemRoleHeader}>
                            Das System ist
                        </div>
                        <div className={css.systemRole}>{roleSystem}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
