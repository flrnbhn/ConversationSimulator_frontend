import React from "react";

interface TableProps {
    header: string,
    data: Array<{ [key: string]: any }>
    marker?: string;
    markedColumn?: string;

}

export const Table: React.FunctionComponent<TableProps> = ({header, data, marker, markedColumn}) => {
    const headers = Object.keys(data[0]);

    return (
        <div>
            <div>
                <h3>{header}</h3>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => {
                        const isMarked = markedColumn && marker && row[markedColumn] === marker;
                        return (
                            <tr key={rowIndex} style={{backgroundColor: isMarked ? 'green' : 'transparent'}}>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex}>{row[header]}</td>
                                ))}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};