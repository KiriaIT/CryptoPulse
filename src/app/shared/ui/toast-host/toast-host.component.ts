import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  LucideAngularModule,
  X,
  XCircle,
} from 'lucide-angular';

import { ToastService } from '../../../core/services/toast.service';
import { NotificationVariant } from '../../../core/abstractions/notifier.abstract';

type LucideIcon = typeof Info;

const VARIANT_ICON: Record<NotificationVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const VARIANT_STYLES: Record<NotificationVariant, string> = {
  info: 'border-border bg-card text-foreground',
  success:
    'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100',
  warning:
    'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100',
  error:
    'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100',
};

const VARIANT_ICON_COLOR: Record<NotificationVariant, string> = {
  info: 'text-muted-foreground',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-red-600 dark:text-red-400',
};

@Component({
  selector: 'app-toast-host',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toast-host.component.html',
  styleUrl: './toast-host.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastHostComponent {
  private readonly service = inject(ToastService);

  protected readonly toasts = this.service.toasts;
  protected readonly closeIcon = X;

  protected iconFor(variant: NotificationVariant): LucideIcon {
    return VARIANT_ICON[variant];
  }

  protected stylesFor(variant: NotificationVariant): string {
    return VARIANT_STYLES[variant];
  }

  protected iconColorFor(variant: NotificationVariant): string {
    return VARIANT_ICON_COLOR[variant];
  }

  protected dismiss(id: number): void {
    this.service.dismiss(id);
  }
}
