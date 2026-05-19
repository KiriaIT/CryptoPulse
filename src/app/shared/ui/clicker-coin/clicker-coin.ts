import { Component, input, output, signal } from "@angular/core";
type Trajectory = { value: number, diff: number }

@Component({
  selector: 'clicker-coin',
  templateUrl: './clicker-coin.html',
  styles: `
    .red {color: red}
    .green {color: green}
    `
})
export class ClickerCoin {
  readonly amount = input<number>(0)
  readonly increaseBy = input<number>(10)
  readonly decreaseBy = input<number>(10)
  readonly currentValue = signal<number>(this.amount())
  readonly trajectory = signal<Trajectory>({ value: this.amount(), diff: 0 })

  amountChanged = output<Trajectory>()

  constructor() {
    this.amountChanged.subscribe((val) => this.trajectory.set(val))
  }

  private timerId: number | null = null

  protected onAmountIncrease() {
    this.currentValue.update((value) => value += this.increaseBy())
    this.amountChanged.emit({ value: this.currentValue(), diff: this.increaseBy() })

    if (this.timerId !== null) clearTimeout(this.timerId)
    const timedDeacrease = () => setTimeout(() => {
      this.onAmountDecrease()
      if (this.currentValue() <= 0 && this.timerId !== null) {
        this.currentValue.set(0)
        clearTimeout(this.timerId)
      }
      else timedDeacrease()
    }, 2000)

    this.timerId = timedDeacrease()
  }

  protected onAmountDecrease() {
    this.currentValue.update((value) => value > 0 ? value -= this.decreaseBy() : value)
    this.amountChanged.emit({ value: this.currentValue(), diff: this.decreaseBy() * -1 })
  }
}
