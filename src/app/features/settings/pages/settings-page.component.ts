import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  template: `
    <section class="px-6 py-6">
      <h1 class="text-2xl font-bold text-foreground">Settings</h1>
      <p class="text-sm text-muted-foreground mt-1">App settings — coming soon.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
