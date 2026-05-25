export interface AboutFavoritePair {
  readonly symbol: string;
  readonly label: string;
}

export interface AboutHighlightStat {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

export interface AboutTeamMember {
  readonly id: string;
  readonly displayName: string;
  readonly role: string;
  readonly githubUrl: string;
  readonly avatarUrl: string;
  readonly cardAccentClass: string;
  readonly avatarRingClass: string;
  readonly favoritePairs: readonly AboutFavoritePair[];
}

export const ABOUT_PAGE_COPY = {
  TITLE: 'About Us',
  SUBTITLE: 'Crypto Pulse — RS School Rolling Scopes School Angular course.',
  FAVORITE_PAIRS_LABEL: 'Favorite pairs:',
  GITHUB_LINK: 'GitHub',
  BUILT_FOR: 'Built For',
  STACK_LABEL: 'Stack',
  RS_SCHOOL_ARIA: 'RS School — Rolling Scopes School Angular course',
} as const;

export const ABOUT_HIGHLIGHT_STATS: readonly AboutHighlightStat[] = [
  { label: 'Contributors', value: '3', detail: 'RS School team' },
  { label: 'Framework', value: 'Angular 21', detail: 'Standalone · signals' },
  { label: 'Market data', value: 'Binance', detail: 'Spot Testnet · public' },
  { label: 'Trading', value: 'Mock', detail: 'No API keys required' },
] as const;

export const ABOUT_TECH_STACK = [
  'Angular 21',
  'Signals',
  'Tailwind CSS',
  'RxJS',
  'Material',
] as const;

export const ABOUT_TEAM_MEMBERS: readonly AboutTeamMember[] = [
  {
    id: 'kiriait',
    displayName: 'KiriaIT',
    role: 'Front-End Developer · Team Lead',
    githubUrl: 'https://github.com/KiriaIT',
    avatarUrl: 'https://github.com/KiriaIT.png',
    cardAccentClass: 'bg-gradient-to-r from-amber-500 to-orange-500',
    avatarRingClass: 'ring-4 ring-offset-2 ring-offset-card ring-amber-400/50',
    favoritePairs: [
      { symbol: 'BTC/USDT', label: 'Bitcoin' },
      { symbol: 'ETH/USDT', label: 'Ethereum' },
      { symbol: 'SOL/USDT', label: 'Solana' },
    ],
  },
  {
    id: 'ogoqro',
    displayName: 'OgOqro',
    role: 'Front-End Developer',
    githubUrl: 'https://github.com/OgOqro',
    avatarUrl: 'https://github.com/OgOqro.png',
    cardAccentClass: 'bg-gradient-to-r from-violet-500 to-purple-500',
    avatarRingClass: 'ring-4 ring-offset-2 ring-offset-card ring-violet-400/50',
    favoritePairs: [
      { symbol: 'BNB/USDT', label: 'BNB' },
      { symbol: 'ADA/USDT', label: 'Cardano' },
      { symbol: 'DOT/USDT', label: 'Polkadot' },
    ],
  },
  {
    id: 'freemason-12',
    displayName: 'Freemason-12',
    role: 'Front-End Developer',
    githubUrl: 'https://github.com/Freemason-12',
    avatarUrl: 'https://github.com/Freemason-12.png',
    cardAccentClass: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    avatarRingClass: 'ring-4 ring-offset-2 ring-offset-card ring-cyan-400/50',
    favoritePairs: [
      { symbol: 'XRP/USDT', label: 'Ripple' },
      { symbol: 'AVAX/USDT', label: 'Avalanche' },
      { symbol: 'LINK/USDT', label: 'Chainlink' },
    ],
  },
] as const;

export const RS_SCHOOL_URL = 'https://rs.school' as const;
