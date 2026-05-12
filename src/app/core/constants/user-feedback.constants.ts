export const NETWORK_ERROR_MESSAGES = {
  NO_CONNECTION: 'We could not reach the market service. Check your connection and try again.',
  SERVER_UNAVAILABLE: 'The market service is temporarily unavailable. Please try again shortly.',
  UNKNOWN: 'Something went wrong while loading market data.',
} as const;

export const WATCHLIST_FORM_MESSAGES = {
  SYMBOL_REQUIRED: 'Symbol is required.',
  SYMBOL_PATTERN: 'Use 2–10 uppercase letters or digits (e.g. BTC, ETH2).',
} as const;
