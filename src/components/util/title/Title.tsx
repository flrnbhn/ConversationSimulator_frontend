import React, {MouseEvent} from 'react';
import css from './Title.module.css'

interface TitleProps {
    title: string;
}

export const Title: React.FC<TitleProps> = ({title}) => {


    return (
        <div className={css.titleContainer}>
            <h4 className={css.title}>{title}</h4>
        </div>
    );
}
