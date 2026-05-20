import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { APP_CONFIG } from '../tokens/app-config.token';

/**
 * Thin Supabase client wrapper.
 *
 * The client is created once and reused. Session auto-persists to localStorage
 * and rehydrates on reload (handled by `@supabase/supabase-js` internally).
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly config = inject(APP_CONFIG);

  readonly client = createClient(this.config.supabaseUrl, this.config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }) satisfies SupabaseClient;
}
