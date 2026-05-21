import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: true,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  protected readonly teamExpanded = signal(false);

  protected readonly toggleLabel = computed(() =>
    this.teamExpanded() ? 'Hide team details' : 'Show team details',
  );

  protected toggleTeam(): void {
    this.teamExpanded.update((v) => !v);
  }
}
