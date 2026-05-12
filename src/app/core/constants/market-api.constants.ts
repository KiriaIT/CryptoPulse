/**
 * Binance Spot **Testnet** — see `PROJECT_CRYPTO.md` at repo root.
 */
export const BINANCE_TESTNET = {
  BASE_URL: 'https://testnet.binance.vision',
  TICKER_24H_PATH: '/api/v3/ticker/24hr',
  /** Fixed watchlist for Sprint 1 market snapshot (USDT pairs). */
  SNAPSHOT_SYMBOLS: ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'ADAUSDT', 'XRPUSDT'],
} as const;
