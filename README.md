# Portfolio Dashboard
A web-based portfolio dashboard that displays your stock holdings, current market prices, total portfolio value, and gain/loss for each holding based on its purchase price.
## Live
App: https://portfolio-dashboard-two-pi.vercel.app
Repo: https://github.com/vidhi-vats-11/portfolio-dashboard
## Tech Stack
Next.js 16, TypeScript, Tailwind CSS 4, yahoo-finance2, Vercel for deployment
## Getting Started    
Node.js 22+ is required, ```npm install, npm run dev```, The app runs at http://localhost:3000, No environment variables are required.
## How It Works
The portfolio holdings are defined in a static holdings file. The dashboard requests market data through the /api/quotes API route. The API batches the required stock symbols into a single Yahoo Finance request and caches the response for 15 seconds. The frontend polls the API every 15 seconds to keep the displayed prices, portfolio value, and gain/loss information up to date while reducing unnecessary upstream requests.
## Data Source
Market data is fetched from Yahoo Finance using the yahoo-finance2 library. Stock prices and financial metrics such as P/E ratio and earnings are sourced from Yahoo Finance so that the dashboard uses a consistent market-data provider rather than combining data from multiple sources.
## Known Limitations
Savani Financials has no Yahoo Finance listing under any symbol, so its market data and related metrics are displayed as dashes.Yahoo Finance returns split-adjusted prices, so some gain/loss figures differ from the source spreadsheet, particularly for HDFC Bank.The 15-second cache is stored in the memory of a single server instance. With multiple serverless instances, it reduces upstream calls but does not guarantee that exactly one Yahoo Finance request is made across all instances.Portfolio holdings are currently stored in a static file rather than persisted in a database.The dashboard is for portfolio tracking and visualization only and does not execute trades or connect to a brokerage account.
