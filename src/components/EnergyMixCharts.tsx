import React from 'react';
import type { DailyEnergyMix } from "../types";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
    data: DailyEnergyMix[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const EnergyMixCharts: React.FC<Props> = ({ data }) => {

    const prepareChartData = (sourceMap: Record<string, number>) => {
        return Object.entries(sourceMap).map(([name, value]) => ({
            name: name,
            value: parseFloat(value.toFixed(1))
        })).filter(item => item.value > 0);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {data.map((dayMix) => (
                <div key={dayMix.date} style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    width: '350px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>{dayMix.date}</h3>

                    <div style={{ textAlign: 'center', color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                        Clean energy: {dayMix.cleanEnergyPercentage.toFixed(1)}%
                    </div>

                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={prepareChartData(dayMix.averageSourcePercentages)}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                >
                                    {prepareChartData(dayMix.averageSourcePercentages).map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `${value}%`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EnergyMixCharts;