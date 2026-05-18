# Sprint 1 — Freemason-12

First sprint of the Crypto Pulse project. I joined the team at the end of the sprint
due to some of my own internal tasks which needed to be done. But I managed to finish it nevertheless.
Had some fun doing the clicker coin component hehe :)
Since the project architechture was already set up the only thing I had to do was to read some
of it (for now) to understand where to write my code.

## What I built

- **`Coin clicker component`** (`src/app/shared/ui/clicker-coin`) — a standalone
  component that renders a single coin and a label showing how many coins are there.
  If you click on the coin it increases the amount of coins you have on the balance by
  the set amount (10 by default) and if you stop clicking on it the balance decreases
  by the set amount (10 by default) for every 2 seconds until it reaches 0,
  the balance never goes negative.
  it uses an amount `input<number>()` as the default balance,
  increaseBy `input<number>()` as the amount to increase when clicking (10 if not set),
  decreaseBy `input<number>()` as the amount to decrease when not clicking (10 by default) and
  onAmountChanged `output<{value: number, diff: number}>` to signal where our balance is going,
  it's used to show the green or red label showing that it's rising or falling

## What I struggled with

There were some challenges when I tried to make the balance decreasing go down
at a perfect interval, when I clicked on a button it did not decrease after the exact time.

## Plan for Sprint 2

- I don't know for now, but probably add a route where graphs of certain crypto
  will be shown, or maybe even the coin balance one
- Write my sprint 2 diary entry as well

## Time spent

~4 hours total
~2-3 hours reading the codebase
the rest of the time was spent developing the coin properly and debugging it
