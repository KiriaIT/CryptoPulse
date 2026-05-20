export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  cashBalanceUsd: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpPayload extends AuthCredentials {
  displayName: string;
}

export type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'error';
