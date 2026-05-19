import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { WalletService } from '../../../core/services/wallet.service';
import { WALLET_CONFIG } from '../../../core/tokens/wallet-config.token';
import { WalletProvider } from '../../../core/models/wallet.model';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';

@Component({
  selector: 'app-connect-page',
  standalone: true,
  templateUrl: './connect-page.component.html',
  styleUrl: './connect-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectPageComponent {
  private readonly wallet = inject(WalletService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly providers = inject(WALLET_CONFIG);
  protected readonly status = this.wallet.status;
  protected readonly connectingId = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

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
