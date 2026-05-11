import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { APP_CONFIG } from '../../core/tokens/app-config.token';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  protected readonly appName = inject(APP_CONFIG).appName;
}
