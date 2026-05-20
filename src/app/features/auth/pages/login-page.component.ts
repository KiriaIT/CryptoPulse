import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Loader, LogIn } from 'lucide-angular';

import { NotifierService } from '../../../core/abstractions/notifier.abstract';
import { AuthService } from '../../../core/services/auth.service';
import {
  AUTH_FORM_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
} from '../../../core/constants/user-feedback.constants';
import { ROUTE_PATHS } from '../../../core/constants/route-paths.constants';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notifier = inject(NotifierService);

  protected readonly icons = { Loader, LogIn };
  protected readonly messages = AUTH_FORM_MESSAGES;
  protected readonly registerPath = `/${ROUTE_PATHS.REGISTER}`;
  protected readonly submitting = signal(false);

  protected readonly form = this.fb.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
    email: this.fb.control('', [Validators.required, Validators.email]),
    // eslint-disable-next-line @typescript-eslint/unbound-method -- Angular Validators API
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  protected async onSubmit(): Promise<void> {
    if (this.submitting()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifier.warning(AUTH_FORM_MESSAGES.FORM_INVALID);
      return;
    }
    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();
    try {
      await this.auth.signIn(email, password);
      this.notifier.success(AUTH_SUCCESS_MESSAGES.SIGNED_IN);
      const returnUrl =
        new URLSearchParams(window.location.search).get('return') ??
        `/${ROUTE_PATHS.DASHBOARD}`;
      void this.router.navigateByUrl(returnUrl);
    } catch (err) {
      this.notifier.error(this.auth.friendlyError(err));
    } finally {
      this.submitting.set(false);
    }
  }
}
