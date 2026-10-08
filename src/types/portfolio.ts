export type Exchange = 'NSE' | 'BSE';
export type Sector = 'Financial'| 'Tech'| 'Consumer'| 'Power'| 'Pipe'| 'Others';
export interface Holding {
    name: string;
    purchasePrice: number;
    quantity: number;
    exchangeCode: string;
    exchange: Exchange;
    sector: Sector;
    yahooSymbol: string|null;
}

export interface LiveQuote {
    cmp : number;
    peRatio : number|null;
    latestEarnings : number|null;
}