import { NextResponse } from 'next/server';     
import { holdings } from '@/data/holdings';          
import { LiveQuote } from '@/types/portfolio';    
import YahooFinance from 'yahoo-finance2';         

const CACHE_MS = 15000;                            
let cache: Record<string, LiveQuote> | null = null;   
let cachedAt = 0;


const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export async function GET(request: Request) {
    if (cache && Date.now() - cachedAt < CACHE_MS) {
        return NextResponse.json({ ok: true, quotes: cache });
    }
    const symbols = holdings
        .filter((h) => h.yahooSymbol !== null)
        .map((h) => h.yahooSymbol as string);

    if (symbols.length === 0) {
        return NextResponse.json({ ok: true, quote: [] });
    }
    console.log('Fetching from yahoo');
    const quote = await yf.quote(symbols);
    const quotes: Record<string, LiveQuote> = {};
    for (const q of quote) {
    quotes[q.symbol] = { cmp: q.regularMarketPrice, peRatio:q.trailingPE ?? null, latestEarnings: q.epsTrailingTwelveMonths ?? null};
    }
    cache = quotes;
    cachedAt = Date.now();
    return NextResponse.json({ ok: true, quotes });
}
