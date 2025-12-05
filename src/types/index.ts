export interface DailyEnergyMix {
    date: string
    averageSourcePercentages: Record<string, number>
    cleanEnergyPercentage: number
}
export interface OptimalChargingWindow {
    startDateTime: string
    endDateTime: string
    averageCleanEnergyPercentage: number
}