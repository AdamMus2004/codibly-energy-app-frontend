import React, { useState } from 'react';
import { fetchOptimalChargingWindow } from '../services/api';
import type {OptimalChargingWindow} from '../types';

const ChargingOptimizer: React.FC = () => {

    const [hours, setHours] = useState<number>(3);

    const [result, setResult] = useState<OptimalChargingWindow | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (hours < 1 || hours > 6) {
            setError("Please enter a duration between 1 and 6 hours.");
            return;
        }

        setError(null);
        setResult(null);
        setLoading(true);

        try {
            const data = await fetchOptimalChargingWindow(hours);
            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Error fetching data. Ensure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleString('pl-PL', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '500px',
            margin: '30px auto',
            backgroundColor: '#f9f9f9',
            textAlign: 'center'
        }}>
            <h2>🚗 Optimal Charging</h2>
            <p>Enter charging duration (1-6h) to find the cleanest window in the next 48h.</p>

            <div style={{ margin: '20px 0' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Duration (h):
                </label>

                <input
                    type="number"
                    min={1}
                    max={6}
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    style={{ padding: '8px', width: '60px', fontSize: '16px' }}
                />

                <button
                    onClick={handleCalculate}
                    disabled={loading}
                    style={{
                        marginLeft: '15px',
                        padding: '8px 16px',
                        fontSize: '16px',
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Calculating...' : 'Find Window'}
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {result && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#e6fffa',
                    border: '1px solid #b2f5ea',
                    borderRadius: '5px'
                }}>
                    <h3 style={{ color: '#2c7a7b', marginTop: 0 }}>Best time to charge:</h3>

                    <p><strong>Start:</strong> {formatTime(result.startDateTime)}</p>
                    <p><strong>End:</strong> {formatTime(result.endDateTime)}</p>

                    <p style={{ fontSize: '1.2em', color: 'green', marginTop: '10px' }}>
                        Average clean energy share: <br/>
                        <strong style={{ fontSize: '1.4em' }}>{result.averageCleanEnergyPercentage.toFixed(1)}%</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChargingOptimizer;