import React from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import css from "./Chart.module.css"

export interface ChartProps {
    header: string;
    dataset: string[];
    labels: string[];
}

export const Chart: React.FC<ChartProps> = ({header, dataset, labels}) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: labels,
        datasets: [
            {
                label: header,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                data: dataset,
            },
        ],
    };
    return (
        <div className={css.chartContainer}>
            <Line data={data}/>
        </div>

    )
}
