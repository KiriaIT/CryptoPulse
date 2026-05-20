import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SETTINGS_ACCOUNT_LABELS } from '../../../core/constants/settings-ui.constants';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './settings-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  private readonly auth = inject(AuthService);

  protected readonly labels = SETTINGS_ACCOUNT_LABELS;
  protected readonly isAuthed = this.auth.isAuthed;
  protected readonly user = this.auth.user;
  protected readonly profile = this.auth.profile;
  protected readonly loginPath = `/${ROUTE_PATHS.LOGIN}`;

  protected readonly cashFormatted = computed(() => {
    const balance = this.profile()?.cashBalanceUsd;
    if (balance === undefined) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(balance);
  });
}
