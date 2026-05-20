import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator: ensures `controlName` equals `matchingControlName`.
 * Errors are set on the matching control as `{ passwordMismatch: true }`.
 */
export function passwordMatchValidator(
  controlName: string,
  matchingControlName: string,
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const source = group.get(controlName);
    const target = group.get(matchingControlName);
    if (!source || !target) return null;
    if (target.errors && !target.errors['passwordMismatch']) return null;
    if (source.value && target.value && source.value !== target.value) {
      target.setErrors({ ...target.errors, passwordMismatch: true });
      return { passwordMismatch: true };
    }
    if (target.errors?.['passwordMismatch']) {
      const { passwordMismatch, ...rest } = target.errors;
      void passwordMismatch;
      target.setErrors(Object.keys(rest).length ? rest : null);
    }
    return null;
  };
}

/** Regex: at least one letter and one digit, no whitespace, 8+ chars. */
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/;

/** Regex: 2–32 chars, letters/numbers/spaces/hyphens/underscores. */
export const DISPLAY_NAME_PATTERN = /^[A-Za-z0-9 _-]{2,32}$/;
