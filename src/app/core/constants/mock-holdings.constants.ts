import { PortfolioHolding } from '../models';

export const MOCK_HOLDINGS: PortfolioHolding[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.5,
    price: 67_230,
    value: 33_615,
    changePct24h: 2.45,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 5.2,
    price: 3_460,
    value: 17_992,
    changePct24h: -1.23,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    amount: 45,
    price: 178.92,
    value: 8_051,
    changePct24h: 4.56,
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    amount: 200,
    price: 18.45,
    value: 3_690,
    changePct24h: 1.89,
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    amount: 100,
    price: 12.34,
    value: 1_234,
    changePct24h: -0.56,
  },
];
