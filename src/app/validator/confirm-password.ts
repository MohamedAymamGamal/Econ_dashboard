import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPassword: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');

  if (!password || !confirm) return null;

  if (password.value !== confirm.value) {
    confirm.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }

  confirm.setErrors(null);
  return null;
};
