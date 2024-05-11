import React, {MouseEvent} from 'react';

interface PrimaryButtonProps {
    buttonFunction: (param?: any) => void;
    title: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({buttonFunction, title}) => {

    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        buttonFunction();
    }

    return (
        <button className="primary-button" onClick={onClick}>
            {title}
        </button>
    );
}
