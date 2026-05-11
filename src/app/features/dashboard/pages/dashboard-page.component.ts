import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { APP_CONFIG } from '../../../core/tokens/app-config.token';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  protected readonly appName = inject(APP_CONFIG).appName;
}
