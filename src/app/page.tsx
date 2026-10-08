'use client';
import { useState, useEffect, Fragment } from 'react';
import { LiveQuote, Holding} from '@/types/portfolio';
import { holdings } from "@/data/holdings";
import { getInvestment, getPortfolioPercent, getPresentValue, getGainLoss } from '@/lib/calculations';

const bySector: Record<string, Holding[]> = {};
for (const h of holdings) {
  if (!bySector[h.sector]) bySector[h.sector] = [];
  bySector[h.sector].push(h);
}


export default function Home() {
  const totalInvestment = holdings.reduce((sum, h) => sum + getInvestment(h), 0);
  const [quotes, setQuotes] = useState<Record<string, LiveQuote> | null>(null);

  useEffect(() => {
    const load = () => {
      fetch('/api/quotes')
        .then((res) => res.json())
        .then((data) => setQuotes(data.quotes));
    };
  load();
  const id = setInterval(load, 15000);
  return () => clearInterval(id);
  }, []);
  const totalGain = holdings.reduce((sum, h) => {
    const q = h.yahooSymbol ? quotes?.[h.yahooSymbol] : undefined;
    return sum + (q ? getGainLoss(h, q.cmp) : 0);
  }, 0);

  const totalPresentValue = totalInvestment + totalGain;


  return (
     <main className="p-6">
      <h1>Holdings</h1>
      <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Purchase Price</th>
            <th>Qty</th>
            <th>Investment</th>
            <th>Portfolio (%)</th>
            <th>NSE/BSE</th>
            <th>CMP</th>
            <th>Present Value</th>
            <th>Gain/Loss</th>
            <th>P/E Ratio</th>
            <th>Latest Earnings</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(bySector).map(([sector, items]) => {
          const sectorInvestment = items.reduce((sum, h) => sum + getInvestment(h), 0);
          const sectorGain = items.reduce((sum, h) => {
            const q = h.yahooSymbol ? quotes?.[h.yahooSymbol] : undefined;
            const gain = q ? getGainLoss(h, q.cmp) : 0;
            return sum + (q ? getGainLoss(h, q.cmp) : 0);
          }, 0);
          const sectorPresent = (sectorInvestment + sectorGain);
          return (
          <Fragment key={sector}>
            <tr><td colSpan={11} className="bg-gray-100 pt-4"><strong>{sector}</strong></td></tr>
            {items.map((holding) => {
              const q = holding.yahooSymbol ? quotes?.[holding.yahooSymbol] : undefined;
              const gain = q ? getGainLoss(holding, q.cmp) : null;
              return (
                <tr key={holding.name}>
                  <td>{holding.name}</td>
                  <td>{holding.purchasePrice}</td>
                  <td>{holding.quantity}</td>
                  <td>{getInvestment(holding)}</td>
                  <td>{getPortfolioPercent(holding, totalInvestment).toFixed(2)}%</td>
                  <td>{holding.exchangeCode}</td>
                  <td>{q?.cmp ?? '—'}</td>
                  <td>{q ? getPresentValue(holding, q.cmp) : '—'}</td>
                  <td className={gain === null ? '' : gain >= 0 ? 'text-green-600' : 'text-red-600'}>{gain ?? '—'}</td>
                  <td>{q?.peRatio ?? '—'}</td>
                  <td>{q?.latestEarnings ?? '—'}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={3}><strong>{sector} Total</strong></td>
              <td><strong>{sectorInvestment}</strong></td>
              <td><strong>{(sectorInvestment / totalInvestment * 100).toFixed(2)}%</strong></td>
              <td colSpan={2}></td>
              <td><strong>{sectorPresent}</strong></td>
              <td className={sectorGain >= 0 ? 'text-green-600' : 'text-red-600'}><strong>{sectorGain}</strong></td>
              <td colSpan={2}></td>
            </tr>
          </Fragment>
          );
        })}
        {/* Overall total row */}
        <tr>
          <td colSpan={3}><strong>Overall Total</strong></td>
          <td><strong>{totalInvestment}</strong></td>
          <td><strong>100%</strong></td>
          <td colSpan={2}></td>
          <td><strong>{totalPresentValue}</strong></td>
          <td className={totalGain >= 0 ? 'text-green-600' : 'text-red-600'}><strong>{totalGain}</strong></td>
          <td colSpan={2}></td>
        </tr>
        </tbody>
      </table>
      </div>
    </main>
  );
}

