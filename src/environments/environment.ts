import { AppConfig } from '../app/core/tokens/app-config.token';
import { APP_NAME } from '../app/core/constants/app.constants';

export const environment: AppConfig = {
  production: true,
  apiBaseUrl: 'https://api.crypto-pulse.example.com',
  appName: APP_NAME,
  supabaseUrl: 'https://qoosootvosxhaupwmorn.supabase.co',
  supabaseAnonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvb3Nvb3R2b3N4aGF1cHdtb3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMzk0MzUsImV4cCI6MjA5NDgxNTQzNX0.0BaOhWRFwqtVq1bKVjy0ZKJZugLsKe1HLJ9oxCkKYx0',
};
