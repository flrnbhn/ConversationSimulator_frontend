import React, {MouseEvent} from 'react';

interface PrimaryButtonProps {
    buttonFunction: (param?: any) => void;
    title: string;
    disabled: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({buttonFunction, title, disabled}) => {

    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!disabled) {
            buttonFunction();
        }
    }

    return (
        <button
            className={`primary-button ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
}
