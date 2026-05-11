import { Injectable, inject } from '@angular/core';

import { LoggerService } from '../abstractions/logger.abstract';
import { APP_CONFIG } from '../tokens/app-config.token';

@Injectable({ providedIn: 'root' })
export class ConsoleLoggerService extends LoggerService {
  private readonly config = inject(APP_CONFIG);

  override info(message: string, context?: unknown): void {
    if (this.config.production) {
      return;
    }
    console.info(`[INFO] ${message}`, context ?? '');
  }

  override warn(message: string, context?: unknown): void {
    console.warn(`[WARN] ${message}`, context ?? '');
  }

  override error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error ?? '');
  }
}
