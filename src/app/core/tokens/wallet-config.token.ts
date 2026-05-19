import { InjectionToken } from '@angular/core';

import { WalletProvider } from '../models/wallet.model';

export const WALLET_CONFIG = new InjectionToken<WalletProvider[]>('WALLET_CONFIG');

export const DEFAULT_WALLET_PROVIDERS: WalletProvider[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    subtitle: 'Browser extension wallet',
    icon: '🦊',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    subtitle: 'Mobile wallet connection',
    icon: '📱',
  },
  {
    id: 'ledger',
    name: 'Ledger',
    subtitle: 'Hardware wallet',
    icon: '🔒',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    subtitle: 'Self-custody wallet',
    icon: '🪙',
  },
  {
    id: 'rs-school',
    name: 'RS School Wallet',
    subtitle: 'Wallet for RS School',
    icon: '🎓',
  },
];
