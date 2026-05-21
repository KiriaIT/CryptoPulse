export interface PortfolioSeedEntry {
  symbol: string;
  name: string;
  amount: number;
}

export const PORTFOLIO_SEED: PortfolioSeedEntry[] = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.5 },
  { symbol: 'ETH', name: 'Ethereum', amount: 5.2 },
  { symbol: 'SOL', name: 'Solana', amount: 45 },
  { symbol: 'ADA', name: 'Cardano', amount: 1200 },
  { symbol: 'BNB', name: 'BNB', amount: 3 },
];
