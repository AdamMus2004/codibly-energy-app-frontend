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
            setError("Proszę podać czas w zakresie od 1 do 6 godzin.");
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
            setError("Wystąpił błąd podczas pobierania danych. Upewnij się, że backend działa.");
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
            <h2>🚗 Optymalne ładowanie</h2>
            <p>Podaj długość ładowania (1-6h), aby znaleźć najczystsze okno w ciągu najbliższych 48h.</p>

            <div style={{ margin: '20px 0' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Czas trwania (h):
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
                    {loading ? 'Obliczanie...' : 'Znajdź okno'}
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
                    <h3 style={{ color: '#2c7a7b', marginTop: 0 }}>Najlepszy czas na ładowanie:</h3>

                    <p><strong>Start:</strong> {formatTime(result.startDateTime)}</p>
                    <p><strong>Koniec:</strong> {formatTime(result.endDateTime)}</p>

                    <p style={{ fontSize: '1.2em', color: 'green', marginTop: '10px' }}>
                        Średni udział czystej energii: <br/>
                        <strong style={{ fontSize: '1.4em' }}>{result.averageCleanEnergyPercentage.toFixed(1)}%</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChargingOptimizer;