import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const LineChartMetric = props => {
    return (
        <div style={{visibility: (props.showChart ? 'visible' : 'hidden')}}>
        <h2>{props.title}</h2>
            <LineChart
                width={600}
                height={300}
                data={props.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                <Line
                    type='monotone'
                    dataKey={props.lineKey}
                    stroke='#8884d8'
                    activeDot={{r: 8}}
                />
                <CartesianGrid strokeDasharray='3 3'/>
                <Tooltip />
                <YAxis/>
                <XAxis dataKey={props.XKey} />
                <Legend />
            </LineChart>
        </div>
    );
};