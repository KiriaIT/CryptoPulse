import { computed, inject, Injectable, signal } from '@angular/core';
import type { AuthError, Session, User } from '@supabase/supabase-js';

import { AuthStatus, SignUpPayload, UserProfile } from '../models/user-profile.model';
import { SUPABASE_AUTH_ERROR_MAP } from '../constants/user-feedback.constants';
import { SupabaseService } from './supabase.service';

interface ProfileRow {
  id: string;
  display_name: string;
  cash_balance_usd: number;
}

/**
 * Signal-based wrapper around Supabase Auth.
 *
 * Public surface:
 *  - status:        AuthStatus signal
 *  - session:       current Supabase session
 *  - user:          User | null
 *  - profile:       UserProfile from `public.profiles`
 *  - isAuthed:      computed boolean
 *  - displayLabel:  short user label for header
 *  - signIn / signUp / signOut: imperative methods
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sb = inject(SupabaseService).client;

  private readonly _status = signal<AuthStatus>('idle');
  private readonly _session = signal<Session | null>(null);
  private readonly _profile = signal<UserProfile | null>(null);
  private readonly _error = signal<string | null>(null);

  readonly status = this._status.asReadonly();
  readonly session = this._session.asReadonly();
  readonly profile = this._profile.asReadonly();
  readonly error = this._error.asReadonly();

  readonly user = computed<User | null>(() => this._session()?.user ?? null);
  readonly isAuthed = computed(() => this._session() !== null);
  readonly displayLabel = computed(() => {
    const profile = this._profile();
    if (profile?.displayName) return profile.displayName;
    const email = this._session()?.user.email;
    return email ? email.split('@')[0] : '';
  });

  constructor() {
    void this.bootstrap();
    this.sb.auth.onAuthStateChange((_event, session) => {
      this._session.set(session);
      if (session) {
        void this.loadProfile(session.user.id);
      } else {
        this._profile.set(null);
      }
    });
  }

  private async bootstrap(): Promise<void> {
    const { data } = await this.sb.auth.getSession();
    this._session.set(data.session);
    if (data.session) {
      await this.loadProfile(data.session.user.id);
      this._status.set('authenticated');
    }
  }

  private async loadProfile(userId: string): Promise<void> {
    const { data, error } = await this.sb
      .from('profiles')
      .select('id, display_name, cash_balance_usd')
      .eq('id', userId)
      .maybeSingle<ProfileRow>();
    if (error || !data) {
      this._profile.set(null);
      return;
    }
    this._profile.set({
      id: data.id,
      email: this._session()?.user.email ?? '',
      displayName: data.display_name,
      cashBalanceUsd: Number(data.cash_balance_usd ?? 0),
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    this._status.set('authenticating');
    this._error.set(null);
    const { error } = await this.sb.auth.signInWithPassword({ email, password });
    if (error) {
      this.captureError(error);
      throw error;
    }
    const { data: sessionData } = await this.sb.auth.getSession();
    this._session.set(sessionData.session);
    if (sessionData.session) {
      await this.loadProfile(sessionData.session.user.id);
    }
    this._status.set('authenticated');
  }

  async signUp(payload: SignUpPayload): Promise<void> {
    this._status.set('authenticating');
    this._error.set(null);
    const { data, error } = await this.sb.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: { data: { display_name: payload.displayName } },
    });
    if (error) {
      this.captureError(error);
      throw error;
    }
    if (!data.session) {
      // Project requires email confirmation — surface a friendly error so the UI
      // can toast instructions instead of silently "succeeding".
      const confirmError = new Error(
        'Email confirmation is required. Disable it in Supabase → Authentication → Providers → Email, or check your inbox.',
      );
      this.captureError(confirmError);
      throw confirmError;
    }
    if (data.session) {
      this._session.set(data.session);
      await this.loadProfile(data.session.user.id);
    }
    this._status.set('authenticated');
  }

  /**
   * Returns a friendly English message for a Supabase auth error,
   * falling back to the raw message when no mapping matches.
   */
  friendlyError(err: unknown): string {
    const raw =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
          ? err
          : 'Unexpected error.';
    const hit = SUPABASE_AUTH_ERROR_MAP.find((entry) => entry.test.test(raw));
    return hit ? hit.message : raw;
  }

  private captureError(err: AuthError | Error): void {
    this._status.set('error');
    this._error.set(this.friendlyError(err));
  }

  async signOut(): Promise<void> {
    await this.sb.auth.signOut();
    this._status.set('idle');
    this._session.set(null);
    this._profile.set(null);
  }
}
