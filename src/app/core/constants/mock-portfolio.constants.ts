export interface PortfolioChartPoint {
  name: string;
  value: number;
}

export interface AllocationSlice {
  name: string;
  value: number;
}

export interface TopMover {
  symbol: string;
  name: string;
  price: string;
  changePct: number;
}

export const MOCK_PORTFOLIO_CHART: PortfolioChartPoint[] = [
  { name: 'Mon', value: 102_000 },
  { name: 'Tue', value: 108_000 },
  { name: 'Wed', value: 105_000 },
  { name: 'Thu', value: 112_000 },
  { name: 'Fri', value: 118_000 },
  { name: 'Sat', value: 130_000 },
  { name: 'Sun', value: 147_340 },
];

export const MOCK_PORTFOLIO_ALLOCATION: AllocationSlice[] = [
  { name: 'BTC', value: 35 },
  { name: 'ETH', value: 25 },
  { name: 'SOL', value: 15 },
  { name: 'AVAX', value: 10 },
  { name: 'UNI', value: 8 },
  { name: 'LINK', value: 7 },
];

export const MOCK_TOP_MOVERS: TopMover[] = [
  { symbol: 'SHIB', name: 'Shiba Inu',     price: '$0.00002340', changePct:  8.92 },
  { symbol: 'DOGE', name: 'Dogecoin',       price: '$0.14',       changePct:  5.67 },
  { symbol: 'AXS',  name: 'Axie Infinity',  price: '$8.92',       changePct: -3.45 },
  { symbol: 'ADA',  name: 'Cardano',        price: '$0.62',       changePct: -2.34 },
];

export const MOCK_DASHBOARD_STATS = {
  netWorth: '$147.34K',
  netWorthChange: '+14.05% this week',
  netWorthUp: true,
  totalAssets: 12,
  totalAssetsDetail: 'Across 4 categories',
  bestPerformer: 'SHIB',
  bestPerformerChange: '+8.92% today',
  worstPerformer: 'AXS',
  worstPerformerChange: '-3.45% today',
};
