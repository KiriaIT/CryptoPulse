import { Injectable, signal } from '@angular/core';

import { NotificationVariant, NotifierService } from '../abstractions/notifier.abstract';
import { NOTIFICATION_DEFAULTS } from '../constants/app.constants';

export interface Toast {
  id: number;
  message: string;
  variant: NotificationVariant;
}

/**
 * Signal-backed toast queue. Acts as the default {@link NotifierService} impl.
 *
 * The {@link ToastHostComponent} subscribes to `toasts()` and renders them
 * with Tailwind + Lucide icons. Each toast auto-dismisses after
 * `NOTIFICATION_DEFAULTS.DURATION_MS`.
 */
@Injectable({ providedIn: 'root' })
export class ToastService extends NotifierService {
  private nextId = 0;
  private readonly _toasts = signal<Toast[]>([]);

  readonly toasts = this._toasts.asReadonly();

  override info(message: string): void {
    this.push(message, 'info');
  }

  override success(message: string): void {
    this.push(message, 'success');
  }

  override warning(message: string): void {
    this.push(message, 'warning');
  }

  override error(message: string): void {
    this.push(message, 'error');
  }

  dismiss(id: number): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private push(message: string, variant: NotificationVariant): void {
    const id = ++this.nextId;
    this._toasts.update((list) => [...list, { id, message, variant }]);
    setTimeout(() => this.dismiss(id), NOTIFICATION_DEFAULTS.DURATION_MS);
  }
}
