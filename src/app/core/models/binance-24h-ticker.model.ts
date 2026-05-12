/** Binance `GET /api/v3/ticker/24hr` response (fields used by the app). */
export interface Binance24hTickerDto {
  readonly symbol: string;
  readonly lastPrice: string;
  readonly priceChangePercent: string;
}
