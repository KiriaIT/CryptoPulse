import { AppConfig } from '../app/core/tokens/app-config.token';
import { APP_NAME } from '../app/core/constants/app.constants';

export const environment: AppConfig = {
  production: true,
  apiBaseUrl: 'https://api.crypto-pulse.example.com',
  appName: APP_NAME,
};
