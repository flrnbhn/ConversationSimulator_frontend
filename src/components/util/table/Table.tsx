import React, {useContext} from "react";
import css from "./Table.module.css"
import {StylingContext} from "../../../context/stylingcontext/StylingContext";

interface TableProps {
    header: string,
    data: Array<{ [key: string]: any }>
    marker?: string;
    markedColumn?: string;

}

export const Table: React.FunctionComponent<TableProps> = ({header, data, marker, markedColumn}) => {
    const headers = Object.keys(data[0]);
    const {isLighMode} = useContext(StylingContext)!;


    return (
        <div className={css.container}>
            <div className={css.header}>
                <h3>{header}</h3>
            </div>
            <div>
                <table className={css.table}>
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className={css.th}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => {
                        const isMarked = markedColumn && marker && row[markedColumn] === marker;
                        return (
                            <tr key={rowIndex} className={`${css.tr} ${isMarked ? css.markedRow : ''}`}>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex} className={css.td}>{row[header]}</td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};