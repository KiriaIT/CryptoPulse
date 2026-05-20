import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, LogIn, LogOut, User, ChevronDown, Wallet } from 'lucide-angular';

import { AuthService } from '../../../../core/services/auth.service';
import { ROUTE_PATHS } from '../../../../core/constants/route-paths.constants';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isAuthed = this.auth.isAuthed;
  protected readonly displayLabel = this.auth.displayLabel;
  protected readonly profile = this.auth.profile;
  protected readonly user = this.auth.user;

  protected readonly loginPath = `/${ROUTE_PATHS.LOGIN}`;
  protected readonly registerPath = `/${ROUTE_PATHS.REGISTER}`;
  protected readonly portfolioPath = `/${ROUTE_PATHS.PORTFOLIO}`;

  protected readonly open = signal(false);
  protected readonly icons = { LogIn, LogOut, User, ChevronDown, Wallet };

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected async signOut(): Promise<void> {
    await this.auth.signOut();
    this.open.set(false);
    void this.router.navigateByUrl(`/${ROUTE_PATHS.LOGIN}`);
  }
}
