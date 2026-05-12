export const STORAGE_KEYS = {
  THEME: 'crypto-pulse:theme',
  LOCALE: 'crypto-pulse:locale',
  WATCHLIST_PREVIEW: 'crypto-pulse:watchlist-preview',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
