import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly detail = input<string>();
  readonly suffix = input<string>();
  readonly expanded = model(false);
  readonly expandPulse = output<void>();

  protected toggle(): void {
    const next = !this.expanded();
    this.expanded.set(next);
    if (next) {
      this.expandPulse.emit();
    }
  }
}
