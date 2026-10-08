import { Holding } from '@/types/portfolio';

/**
 * Portfolio holdings, transcribed from the provided spreadsheet.
 *
 * Note on exchangeCode: the source sheet is inconsistent — some rows identify
 * a stock by its NSE ticker (HDFCBANK) and others by its BSE numeric code
 * (532174). `exchangeCode` preserves the sheet's original value verbatim, and
 * `exchange` records which kind it is.
 *
 * Note on yahooSymbol: Yahoo Finance cannot resolve BSE numeric codes at all —
 * quote('532174.BO') returns undefined, and searching by the number finds
 * nothing. Every holding was therefore resolved to its NSE ticker by company
 * name once, and the result stored here, so the API layer never has to do a
 * lookup at runtime.
 *
 * Savani Financials is null: it does not exist on Yahoo Finance under any
 * symbol. The source spreadsheet also shows #N/A for its P/E and earnings,
 * so both sources independently agree there is no live data for it.
 */
export const holdings: Holding[] = [
  // ---------- Financial ----------
  { name: 'HDFC Bank',         purchasePrice: 1490, quantity: 50,   exchangeCode: 'HDFCBANK',   exchange: 'NSE', sector: 'Financial', yahooSymbol: 'HDFCBANK.NS' },
  { name: 'Bajaj Finance',     purchasePrice: 6466, quantity: 15,   exchangeCode: 'BAJFINANCE', exchange: 'NSE', sector: 'Financial', yahooSymbol: 'BAJFINANCE.NS' },
  { name: 'ICICI Bank',        purchasePrice: 780,  quantity: 84,   exchangeCode: '532174',     exchange: 'BSE', sector: 'Financial', yahooSymbol: 'ICICIBANK.NS' },
  { name: 'Bajaj Housing',     purchasePrice: 130,  quantity: 504,  exchangeCode: '544252',     exchange: 'BSE', sector: 'Financial', yahooSymbol: 'BAJAJHFL.NS' },
  { name: 'Savani Financials', purchasePrice: 24,   quantity: 1080, exchangeCode: '511577',     exchange: 'BSE', sector: 'Financial', yahooSymbol: null },

  // ---------- Tech ----------
  { name: 'Affle India',    purchasePrice: 1151, quantity: 50,  exchangeCode: 'AFFLE',  exchange: 'NSE', sector: 'Tech', yahooSymbol: 'AFFLE.NS' },
  { name: 'LTI Mindtree',   purchasePrice: 4775, quantity: 16,  exchangeCode: 'LTIM',   exchange: 'NSE', sector: 'Tech', yahooSymbol: 'LTIM.NS' },
  { name: 'KPIT Tech',      purchasePrice: 672,  quantity: 61,  exchangeCode: '542651', exchange: 'BSE', sector: 'Tech', yahooSymbol: 'KPITTECH.NS' },
  { name: 'Tata Tech',      purchasePrice: 1072, quantity: 63,  exchangeCode: '544028', exchange: 'BSE', sector: 'Tech', yahooSymbol: 'TATATECH.NS' },
  { name: 'BLS E-Services', purchasePrice: 232,  quantity: 191, exchangeCode: '544107', exchange: 'BSE', sector: 'Tech', yahooSymbol: 'BLSE.NS' },
  { name: 'Tanla',          purchasePrice: 1134, quantity: 45,  exchangeCode: '532790', exchange: 'BSE', sector: 'Tech', yahooSymbol: 'TANLA.NS' },

  // ---------- Consumer ----------
  { name: 'Dmart',         purchasePrice: 3777, quantity: 27, exchangeCode: 'DMART',  exchange: 'NSE', sector: 'Consumer', yahooSymbol: 'DMART.NS' },
  { name: 'Tata Consumer', purchasePrice: 845,  quantity: 90, exchangeCode: '532540', exchange: 'BSE', sector: 'Consumer', yahooSymbol: 'TATACONSUM.NS' },
  { name: 'Pidilite',      purchasePrice: 2376, quantity: 36, exchangeCode: '500331', exchange: 'BSE', sector: 'Consumer', yahooSymbol: 'PIDILITIND.NS' },

  // ---------- Power ----------
  { name: 'Tata Power', purchasePrice: 224, quantity: 225, exchangeCode: '500400', exchange: 'BSE', sector: 'Power', yahooSymbol: 'TATAPOWER.NS' },
  { name: 'KPI Green',  purchasePrice: 875, quantity: 50,  exchangeCode: '542323', exchange: 'BSE', sector: 'Power', yahooSymbol: 'KPIGREEN.NS' },
  { name: 'Suzlon',     purchasePrice: 44,  quantity: 450, exchangeCode: '532667', exchange: 'BSE', sector: 'Power', yahooSymbol: 'SUZLON.NS' },
  { name: 'Gensol',     purchasePrice: 998, quantity: 45,  exchangeCode: '542851', exchange: 'BSE', sector: 'Power', yahooSymbol: 'GENSOL.NS' },

  // ---------- Pipe ----------
  { name: 'Hariom Pipes', purchasePrice: 580,  quantity: 60, exchangeCode: '543517', exchange: 'BSE', sector: 'Pipe', yahooSymbol: 'HARIOMPIPE.NS' },
  { name: 'Astral',       purchasePrice: 1517, quantity: 56, exchangeCode: 'ASTRAL', exchange: 'NSE', sector: 'Pipe', yahooSymbol: 'ASTRAL.NS' },
  { name: 'Polycab',      purchasePrice: 2818, quantity: 28, exchangeCode: '542652', exchange: 'BSE', sector: 'Pipe', yahooSymbol: 'POLYCAB.NS' },

  // ---------- Others ----------
  { name: 'Clean Science',  purchasePrice: 1610, quantity: 32, exchangeCode: '543318', exchange: 'BSE', sector: 'Others', yahooSymbol: 'CLEAN.NS' },
  { name: 'Deepak Nitrite', purchasePrice: 2248, quantity: 27, exchangeCode: '506401', exchange: 'BSE', sector: 'Others', yahooSymbol: 'DEEPAKNTR.NS' },
  { name: 'Fine Organic',   purchasePrice: 4284, quantity: 16, exchangeCode: '541557', exchange: 'BSE', sector: 'Others', yahooSymbol: 'FINEORG.NS' },
  { name: 'Gravita',        purchasePrice: 2037, quantity: 8,  exchangeCode: '533282', exchange: 'BSE', sector: 'Others', yahooSymbol: 'GRAVITA.NS' },
  { name: 'SBI Life',       purchasePrice: 1197, quantity: 49, exchangeCode: '540719', exchange: 'BSE', sector: 'Others', yahooSymbol: 'SBILIFE.NS' },
];
