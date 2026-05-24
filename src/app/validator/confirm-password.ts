import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  // 'control' here is now the FormGroup
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
};
