import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from 'lucide-angular';

import { NotificationVariant } from '../../../core/abstractions/notifier.abstract';

export type ToastLucideIcon = typeof Info;

export const TOAST_ICON_SIZE = 18;
export const TOAST_CLOSE_ICON_SIZE = 15;

export const TOAST_VARIANT_ICON: Record<NotificationVariant, ToastLucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export const TOAST_VARIANT_STYLES: Record<NotificationVariant, string> = {
  info: 'border-border bg-card text-foreground',
  success:
    'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100',
  warning:
    'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100',
  error:
    'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100',
};

export const TOAST_VARIANT_ICON_COLOR: Record<NotificationVariant, string> = {
  info: 'text-muted-foreground',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-red-600 dark:text-red-400',
};
