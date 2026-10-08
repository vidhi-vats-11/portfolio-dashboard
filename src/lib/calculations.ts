import { Holding } from '@/types/portfolio';

export function getInvestment(holding: Holding): number {
return holding.purchasePrice * holding.quantity;
}

export function getPresentValue(holding: Holding, cmp: number): number {
return cmp * holding.quantity;
}

export function getGainLoss(holding: Holding, cmp: number): number {
return getPresentValue(holding, cmp) - getInvestment(holding);
}

export function getPortfolioPercent(holding: Holding, totalInvestment: number): number {
return (getInvestment(holding) / totalInvestment) * 100;
}