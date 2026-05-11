import { ErrorHandler, Injectable, inject } from '@angular/core';

import { LoggerService } from '../abstractions/logger.abstract';
import { NotifierService } from '../abstractions/notifier.abstract';

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private readonly logger = inject(LoggerService);
  private readonly notifier = inject(NotifierService);

  handleError(error: unknown): void {
    const message = this.extractMessage(error);
    this.logger.error('Unhandled application error', error);
    this.notifier.error(message);
  }

  private extractMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return FALLBACK_MESSAGE;
  }
}
