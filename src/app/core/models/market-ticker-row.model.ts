/** Normalised row for dashboard list (mapped from Binance testnet ticker). */
export interface MarketTickerRow {
  readonly rank: number;
  readonly symbol: string;
  readonly lastPrice: number | null;
  readonly changePct24h: number | null;
}
