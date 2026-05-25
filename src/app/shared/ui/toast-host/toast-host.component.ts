import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

import { ToastService } from '../../../core/services/toast.service';
import {
  TOAST_CLOSE_ICON_SIZE,
  TOAST_ICON_SIZE,
  TOAST_VARIANT_ICON,
  TOAST_VARIANT_ICON_COLOR,
  TOAST_VARIANT_STYLES,
} from './toast-host.constants';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './toast-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastHostComponent {
  private readonly service = inject(ToastService);

  protected readonly toasts = this.service.toasts;
  protected readonly closeIcon = X;
  protected readonly variantIcon = TOAST_VARIANT_ICON;
  protected readonly variantStyles = TOAST_VARIANT_STYLES;
  protected readonly variantIconColor = TOAST_VARIANT_ICON_COLOR;
  protected readonly iconSize = TOAST_ICON_SIZE;
  protected readonly closeIconSize = TOAST_CLOSE_ICON_SIZE;

  protected dismiss(id: number): void {
    this.service.dismiss(id);
  }
}
