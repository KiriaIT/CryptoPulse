export const NETWORK_ERROR_MESSAGES = {
  NO_CONNECTION: 'We could not reach the market service. Check your connection and try again.',
  SERVER_UNAVAILABLE: 'The market service is temporarily unavailable. Please try again shortly.',
  UNKNOWN: 'Something went wrong while loading market data.',
} as const;

export const WATCHLIST_FORM_MESSAGES = {
  SYMBOL_REQUIRED: 'Symbol is required.',
  SYMBOL_PATTERN: 'Use 2–10 uppercase letters or digits (e.g. BTC, ETH2).',
} as const;

export const AUTH_FORM_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_INVALID: 'Enter a valid email address.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MIN: 'Password must be at least 8 characters.',
  PASSWORD_PATTERN: 'Use at least one letter and one number.',
  PASSWORD_CONFIRM_REQUIRED: 'Please confirm your password.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  DISPLAY_NAME_REQUIRED: 'Display name is required.',
  DISPLAY_NAME_MIN: 'Use at least 2 characters.',
  DISPLAY_NAME_MAX: 'Keep it under 32 characters.',
  DISPLAY_NAME_PATTERN: 'Letters, numbers, spaces, hyphens or underscores only.',
  FORM_INVALID: 'Please fix the highlighted fields and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

/**
 * Maps Supabase Auth error messages (or common substrings) to friendly
 * English copy shown via the toast notifier.
 */
export const SUPABASE_AUTH_ERROR_MAP: ReadonlyArray<{ test: RegExp; message: string }> = [
  { test: /invalid login credentials/i, message: 'Wrong email or password. Please try again.' },
  {
    test: /email not confirmed/i,
    message:
      'Email confirmation is required. Disable it in Supabase → Authentication → Providers → Email, or check your inbox.',
  },
  { test: /user already registered/i, message: 'An account with this email already exists.' },
  { test: /password should be at least/i, message: 'Password is too short. Use at least 8 characters.' },
  { test: /rate limit/i, message: 'Too many attempts. Please wait a moment and try again.' },
  { test: /network|fetch/i, message: 'Network error. Check your connection and try again.' },
  { test: /signup is disabled/i, message: 'New sign-ups are temporarily disabled.' },
];

export const AUTH_SUCCESS_MESSAGES = {
  SIGNED_IN: 'Welcome back!',
  SIGNED_UP: 'Account created. Welcome to Crypto Pulse!',
  SIGNED_OUT: 'You have been signed out.',
} as const;

