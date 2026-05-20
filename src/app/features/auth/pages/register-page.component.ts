import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Loader, UserPlus } from 'lucide-angular';

import { NotifierService } from '../../../core/abstractions/notifier.abstract';
import { AuthService } from '../../../core/services/auth.service';
import {
  AUTH_FORM_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
} from '../../../core/constants/user-feedback.constants';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';
import {
  DISPLAY_NAME_PATTERN,
  PASSWORD_PATTERN,
  passwordMatchValidator,
} from '../../../core/validators/password-match.validator';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notifier = inject(NotifierService);

  protected readonly icons = { Loader, UserPlus };
  protected readonly messages = AUTH_FORM_MESSAGES;
  protected readonly loginPath = `/${ROUTE_PATHS.LOGIN}`;
  protected readonly submitting = signal(false);

  protected readonly form = this.fb.group(
    {
      displayName: this.fb.control('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.pattern(DISPLAY_NAME_PATTERN),
      ]),
      // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(PASSWORD_PATTERN),
      ]),
      // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
      confirmPassword: this.fb.control('', [Validators.required]),
    },
    { validators: [passwordMatchValidator('password', 'confirmPassword')] },
  );

  protected async onSubmit(): Promise<void> {
    if (this.submitting()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifier.warning(AUTH_FORM_MESSAGES.FORM_INVALID);
      return;
    }
    this.submitting.set(true);
    const { displayName, email, password } = this.form.getRawValue();
    try {
      await this.auth.signUp({ displayName, email, password });
      this.notifier.success(AUTH_SUCCESS_MESSAGES.SIGNED_UP);
      void this.router.navigateByUrl(`/${ROUTE_PATHS.DASHBOARD}`);
    } catch (err) {
      this.notifier.error(this.auth.friendlyError(err));
    } finally {
      this.submitting.set(false);
    }
  }
}
