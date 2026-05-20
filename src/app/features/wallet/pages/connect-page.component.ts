import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { WALLET_PAGE_LABELS } from '../../../core/constants/settings-ui.constants';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';
import { AuthService } from '../../../core/services/auth.service';
import { WalletService } from '../../../core/services/wallet.service';
import { WALLET_CONFIG } from '../../../core/tokens/wallet-config.token';
import { WalletProvider } from '../../../core/models/wallet.model';

@Component({
  selector: 'app-connect-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './connect-page.component.html',
  styleUrl: './connect-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectPageComponent {
  private readonly wallet = inject(WalletService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly labels = WALLET_PAGE_LABELS;
  protected readonly providers = inject(WALLET_CONFIG);
  protected readonly status = this.wallet.status;
  protected readonly isAuthed = this.auth.isAuthed;
  protected readonly profile = this.auth.profile;
  protected readonly loginPath = `/${ROUTE_PATHS.LOGIN}`;
  protected readonly connectingId = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly cashFormatted = computed(() => {
    const balance = this.profile()?.cashBalanceUsd;
    if (balance === undefined) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(balance);
  });

  protected onProviderClick(provider: WalletProvider): void {
    if (this.status() === 'connecting') return;
    this.connectingId.set(provider.id);
    this.errorMessage.set(null);

    this.wallet
      .connect(provider)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const returnUrl =
            new URLSearchParams(window.location.search).get('return') ??
            `/${ROUTE_PATHS.DASHBOARD}`;
          void this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.connectingId.set(null);
          this.errorMessage.set('Connection failed. Please try again.');
        },
      });
  }
}
