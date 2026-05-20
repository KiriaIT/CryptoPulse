import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  Bell,
  Briefcase,
  HelpCircle,
  Info,
  LayoutDashboard,
  LucideAngularModule,
  Moon,
  Search,
  Settings,
  Sun,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-angular';

import { APP_CONFIG } from '../../core/tokens/app-config.token';
import { ROUTE_PATHS } from '../../core/constants/route-paths.constants';
import { ThemeService } from '../../core/services/theme.service';
import { UserMenuComponent } from '../../features/auth/components/user-menu/user-menu.component';

type NavItem = {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UserMenuComponent, LucideAngularModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  protected readonly appName = inject(APP_CONFIG).appName;
  private readonly theme = inject(ThemeService);

  protected readonly isDark = this.theme.isDark;
  protected readonly showNotifs = signal(false);

  protected readonly icons = { Search, Moon, Sun, Bell, HelpCircle, LayoutDashboard, X };

  protected readonly navItems: NavItem[] = [
    { path: `/${ROUTE_PATHS.DASHBOARD}`, label: 'Dashboard',       icon: LayoutDashboard },
    { path: `/${ROUTE_PATHS.MARKETS}`,   label: 'Market Explorer', icon: TrendingUp },
    { path: `/${ROUTE_PATHS.PORTFOLIO}`, label: 'My Portfolio',    icon: Briefcase },
    { path: `/${ROUTE_PATHS.CONNECT}`,   label: 'Wallet',          icon: Wallet },
    { path: `/${ROUTE_PATHS.SETTINGS}`,  label: 'Settings',        icon: Settings },
    { path: `/${ROUTE_PATHS.ABOUT}`,     label: 'About',           icon: Info },
  ];

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleNotifs(): void {
    this.showNotifs.update((v) => !v);
  }
}
