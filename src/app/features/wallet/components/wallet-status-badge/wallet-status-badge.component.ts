import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { LucideAngularModule, Wallet, Loader, CheckCircle, X, Copy, LogOut } from 'lucide-angular';

import { WalletService } from '../../../../core/services/wallet.service';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths.constants';

@Component({
  selector: 'app-wallet-status-badge',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, DecimalPipe],
  templateUrl: './wallet-status-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletStatusBadgeComponent {
  private readonly wallet = inject(WalletService);

  protected readonly isConnected = this.wallet.isConnected;
  protected readonly shortAddress = this.wallet.shortAddress;
  protected readonly status = this.wallet.status;
  protected readonly session = this.wallet.session;
  protected readonly connectPath = `/${ROUTE_PATHS.CONNECT}`;
  protected readonly showModal = signal(false);
  protected readonly copied = signal(false);

  protected readonly icons = { Wallet, Loader, CheckCircle, X, Copy, LogOut };

  protected openModal(): void { this.showModal.set(true); }
  protected closeModal(): void { this.showModal.set(false); }

  protected copyAddress(): void {
    const addr = this.session()?.address;
    if (!addr) return;
    void navigator.clipboard.writeText(addr);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  protected disconnect(): void {
    this.wallet.disconnect();
    this.showModal.set(false);
  }
}
