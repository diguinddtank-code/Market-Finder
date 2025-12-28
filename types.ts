export interface MarketPotentialData {
  cityName: string;
  cityDescription: string;
  totalPopulation: number;
  targetDemographicCount: number; // 5-17 years old
  potentialStudents: number; // 1% of target
  insight: string;
  projectedGrowthRate: number; // Annual growth rate (decimal)
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}