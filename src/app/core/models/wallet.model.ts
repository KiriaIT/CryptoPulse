export type WalletStatus = 'idle' | 'connecting' | 'connected' | 'error';

export interface WalletProvider {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
}

export interface WalletSession {
  provider: WalletProvider;
  address: string;
  ethBalance: number;
  usdValue: number;
  connectedAt: number;
}
