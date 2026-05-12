import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WATCHLIST_FORM_MESSAGES } from '../../../../core/constants/user-feedback.constants';

@Component({
  selector: 'app-watchlist-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './watchlist-form.component.html',
  styleUrl: './watchlist-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchlistFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  readonly symbolAdded = output<string>();
  protected readonly messages = WATCHLIST_FORM_MESSAGES;

  readonly form = this.fb.group({
    symbol: this.fb.control('', {
      // Validators.* are stable static functions; unbound-method is a false positive here.
      // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
      validators: [Validators.required, Validators.pattern(/^[A-Z0-9]{2,10}$/)],
    }),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.controls.symbol.getRawValue();
    this.symbolAdded.emit(raw);
    this.form.reset();
  }
}
