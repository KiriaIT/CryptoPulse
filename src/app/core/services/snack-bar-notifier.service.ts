import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotifierService, NotificationVariant } from '../abstractions/notifier.abstract';
import { NOTIFICATION_DEFAULTS } from '../constants/app.constants';

@Injectable({ providedIn: 'root' })
export class SnackBarNotifierService extends NotifierService {
  private readonly snackBar = inject(MatSnackBar);

  override info(message: string): void {
    this.show(message, 'info');
  }

  override success(message: string): void {
    this.show(message, 'success');
  }

  override warning(message: string): void {
    this.show(message, 'warning');
  }

  override error(message: string): void {
    this.show(message, 'error');
  }

  private show(message: string, variant: NotificationVariant): void {
    const config: MatSnackBarConfig = {
      duration: NOTIFICATION_DEFAULTS.DURATION_MS,
      panelClass: [`snackbar-${variant}`],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    };
    this.snackBar.open(message, NOTIFICATION_DEFAULTS.DISMISS_LABEL, config);
  }
}
