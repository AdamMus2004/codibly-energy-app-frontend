import { useEffect, useState } from 'react';
import './App.css';
import { fetchDailyEnergyMix } from './services/api';
import type { DailyEnergyMix } from './types';
import EnergyMixCharts from './components/EnergyMixCharts';
import ChargingOptimizer from './components/ChargingOptimizer';

function App() {
    const [dailyMix, setDailyMix] = useState<DailyEnergyMix[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDailyEnergyMix();
                setDailyMix(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to connect to the backend. Please check if the Java server is running on port 8080.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: '#333' }}>⚡ Energy Mix UK & Optimizer</h1>
                <p style={{ color: '#666' }}>
                    Codibly Recruitment Task - Java Spring Boot + React TypeScript
                </p>
            </header>

            <section style={{ marginBottom: '50px' }}>
                <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', textAlign: 'center' }}>
                    📊 Energy Mix (3 Days)
                </h2>

                {loading && <p style={{ textAlign: 'center', fontSize: '1.2em' }}>Loading API data...</p>}

                {error && (
                    <div style={{ color: 'red', textAlign: 'center', padding: '20px', border: '1px solid red', borderRadius: '5px', backgroundColor: '#fff5f5' }}>
                        ⚠️ {error}
                    </div>
                )}

                {!loading && !error && dailyMix.length > 0 && (
                    <EnergyMixCharts data={dailyMix} />
                )}
            </section>


            <section>
                <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', textAlign: 'center' }}>
                    🔋 Charging Optimizer
                </h2>

                <ChargingOptimizer />
            </section>

        </div>
    );
}

export default App;