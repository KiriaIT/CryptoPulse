import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';

type Trajectory = { value: number; diff: number };

@Component({
  selector: 'clicker-coin',
  standalone: true,
  templateUrl: './clicker-coin.html',
  styles: `
    .red { color: red }
    .green { color: green }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickerCoin {
  readonly amount = input<number>(0);
  readonly increaseBy = input<number>(10);
  readonly decreaseBy = input<number>(10);

  protected readonly currentValue = signal<number>(0);
  protected readonly trajectory = signal<Trajectory>({ value: 0, diff: 0 });

  readonly amountChanged = output<Trajectory>();

  private timerId: ReturnType<typeof setTimeout> | null = null;

  protected onAmountIncrease(): void {
    this.currentValue.update((v) => v + this.increaseBy());
    const t: Trajectory = { value: this.currentValue(), diff: this.increaseBy() };
    this.trajectory.set(t);
    this.amountChanged.emit(t);

    if (this.timerId !== null) clearTimeout(this.timerId);
    const scheduleDecrease = (): void => {
      this.timerId = setTimeout(() => {
        if (this.currentValue() <= 0) {
          this.currentValue.set(0);
          return;
        }
        this.onAmountDecrease();
        scheduleDecrease();
      }, 2000);
    };
    scheduleDecrease();
  }

  protected onAmountDecrease(): void {
    this.currentValue.update((v) => (v > 0 ? v - this.decreaseBy() : 0));
    const t: Trajectory = { value: this.currentValue(), diff: -this.decreaseBy() };
    this.trajectory.set(t);
    this.amountChanged.emit(t);
  }
}
