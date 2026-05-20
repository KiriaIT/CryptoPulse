export const SETTINGS_ACCOUNT_LABELS = {
  TITLE: 'Settings',
  SUBTITLE: 'Account and app preferences.',
  ACCOUNT_HEADING: 'Account',
  EMAIL: 'Email',
  DISPLAY_NAME: 'Display name',
  VIRTUAL_BALANCE: 'Virtual USD balance',
  VIRTUAL_BALANCE_HINT: 'Demo cash for mock trading — not on-chain funds.',
  NO_PROFILE: 'Profile not loaded. Sign out and sign in again, or contact support.',
  NOT_SIGNED_IN: 'Sign in to view your account.',
} as const;

export const WALLET_PAGE_LABELS = {
  TITLE: 'Wallet',
  SUBTITLE: 'Demo on-chain connection and your virtual trading balance.',
  VIRTUAL_HEADING: 'Virtual balance (Supabase)',
  ONCHAIN_HEADING: 'Connect on-chain wallet',
  ONCHAIN_HINT: 'RS course demo — simulated Web3 session, separate from login.',
  SIGN_IN_CTA: 'Sign in to see your virtual USD balance.',
} as const;

export const DASHBOARD_CASH_LABELS = {
  LABEL: 'Available cash',
  DETAIL: 'Virtual USD · Supabase',
  GUEST: 'Sign in',
  GUEST_DETAIL: 'To see your balance',
} as const;
