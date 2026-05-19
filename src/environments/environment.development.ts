import { AppConfig } from '../app/core/tokens/app-config.token';
import { APP_NAME } from '../app/core/constants/app.constants';

export const environment: AppConfig = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  appName: APP_NAME,
};
