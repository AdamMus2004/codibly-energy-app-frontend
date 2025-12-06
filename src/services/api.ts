import type {DailyEnergyMix, OptimalChargingWindow} from "../types";
import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/energy-mix';

export const fetchDailyEnergyMix = async (): Promise<DailyEnergyMix[]> => {
    const response = await axios.get<DailyEnergyMix[]>(`${API_BASE_URL}/daily`);
    return response.data;
};

export const fetchOptimalChargingWindow = async (hours: number): Promise<OptimalChargingWindow> => {
    const response = await axios.get<OptimalChargingWindow>(`${API_BASE_URL}/optimal-window`, {
        params: { hours }
    });
    return response.data;
};