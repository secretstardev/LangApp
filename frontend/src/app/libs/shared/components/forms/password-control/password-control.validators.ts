import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchControlValidator(control: FormControl): ValidationErrors | null {
  const value = control.value || {};
  const password = value.password;
  const passwordRepeat = value.passwordRepeat;

  if (password !== passwordRepeat) {
    return { passconfirm: true };
  }
  return null;
}

export function passwordsMatchGroupValidator(group: FormGroup): { [key: string]: any } | null {
  const password = group.get('password')?.value;
  const passwordRepeat = group.get('passwordRepeat')?.value;
  if (!password || !passwordRepeat) return null;
  return password === passwordRepeat ? null : { passconfirm: true };
}
