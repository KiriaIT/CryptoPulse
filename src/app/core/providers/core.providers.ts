import { EnvironmentProviders, ErrorHandler, makeEnvironmentProviders } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { LoggerService } from '../abstractions/logger.abstract';
import { NotifierService } from '../abstractions/notifier.abstract';
import { ConsoleLoggerService } from '../services/console-logger.service';
import { GlobalErrorHandler } from '../services/global-error-handler.service';
import { ToastService } from '../services/toast.service';
import { APP_CONFIG, AppConfig } from '../tokens/app-config.token';
import { DEFAULT_WALLET_PROVIDERS, WALLET_CONFIG } from '../tokens/wallet-config.token';

export function provideCore(config: AppConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAnimationsAsync(),
    { provide: APP_CONFIG, useValue: config },
    { provide: LoggerService, useExisting: ConsoleLoggerService },
      { provide: NotifierService, useExisting: ToastService },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: WALLET_CONFIG, useValue: DEFAULT_WALLET_PROVIDERS },
  ]);
}
