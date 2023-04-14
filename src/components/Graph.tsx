import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '@/styles/Graph.module.css';

type GraphProps = {
    data: number[],
}

function ProbabilitiesGraph({ data }: GraphProps) {
    
    return (
        <div className={styles.barChart} style={{ width: "50%" }}>
            <ResponsiveContainer aspect={2}>
                <BarChart data={data} margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="vector_string" domain={[0]} label={{ value: 'states', position: 'bottom', offset: -8 }} />
                    <YAxis datakey="probability" domain={[0, 100]} name="probability" label={{ value: 'Probability', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="chance" legendType='none' fill="#123ABC" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProbabilitiesGraph;