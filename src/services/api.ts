import type {DailyEnergyMix, OptimalChargingWindow} from "../types";
import axios from "axios";

const BASE_DOMAIN = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: `${BASE_DOMAIN}/api/energy-mix`
});

export const fetchDailyEnergyMix = async (): Promise<DailyEnergyMix[]> => {

    const response = await api.get<DailyEnergyMix[]>('/daily');
    return response.data;
};
export const fetchOptimalChargingWindow = async (hours: number): Promise<OptimalChargingWindow> => {
    const response = await api.get<OptimalChargingWindow>('/optimal-window', {
        params: { hours }
    });
    return response.data;
};