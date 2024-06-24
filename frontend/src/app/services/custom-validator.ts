import { AbstractControl, AsyncValidatorFn, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FieldError } from '@app/interfaces/common.interface';
import { debounceTime, distinctUntilChanged, first, map, merge, Observable, of, switchMap } from 'rxjs';
import { EMAIL_PATTERN } from '@app/libs/shared/constants/general-regex.constants';

@Injectable()
export class CustomValidator {
  constructor(private translateService: TranslateService) {
  }

  getErrors(form: UntypedFormGroup, fieldName: string): string {
    const errors = [];
    const originalErrors = form.get(fieldName).errors;
    if (!originalErrors) {
      return '';
    }

    for (const [key, value] of Object.entries(originalErrors)) {
      let message = '';
      if (value === true || typeof value === 'object' && value !== null && value !== key && !value.valid) {
        message = this.translateService.instant('validation-error.' + key);
        if (message === key) {
          message = this.translateService.instant('validation-error.default');
        }
      }
      errors.push(message || value);
    }

    return errors.join('<br>\n');
  }

  static fillFromApiErrors(ctrl: AbstractControl, errors: FieldError[]) {
    // console.trace('fillFromApiErrors');
    if (errors) {
      for (const error of errors) {
        const field = ctrl.get(error.field);
        if (field) {
          field.valueChanges.pipe(first()).subscribe(() => {
            errors.splice(errors.indexOf(error), 1);
          });
          field.markAsDirty();
          field.setErrors({ [error.message]: error.message });
        }
      }
    }
  }

  /**
   * this method used as a custom validator to check
   * the password and repeat-password is equaled or not
   * @param ctrl
   */
  static confirmPasswordCheck(ctrl: AbstractControl): ValidationErrors | null {
    const password = ctrl.get('password').value;
    const passwordRepeat = ctrl.get('passwordRepeat').value;
    if (password !== passwordRepeat) {
      return { passconfirm: true };
    } else {
      return null;
    }
  }

  /**
   * method for validating basic password rules
   * @param ctrl
   */
  static confirmPasswordRulesCheck(ctrl: AbstractControl): ValidationErrors | null {
    const password = ctrl.value;
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/;
    if (password?.length > 0 && !regex.test(password)) {
      return { passrules: true };
    } else {
      return null;
    }
  }

  /**
   * method for validating email pattern
   * @param ctrl
   */
  static confirmEmailPattern(ctrl: AbstractControl): ValidationErrors | null {
    const email = ctrl.value;
    if (email?.length > 0 && !EMAIL_PATTERN.test(email)) {
      return { email: true };
    } else {
      return null;
    }
  }

  /**
   * method for validating value in phone number field
   * @param ctrl
   */
  static confirmPhoneValue(ctrl: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    if (ctrl?.value?.actualValue?.length > 0 && !ctrl?.value?.e164Number) {
      errors.validatePhoneNumber = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  /**
   * method for converting validatorFn to debounced async validatorFn
   * @param validatorFn initial validatorFn
   * @param debounceMs debounce time after user stops changing value in control
   * and when validation should occur
   */
  static debouncedAsyncValidator(validatorFn: ValidatorFn, debounceMs: number = 450): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const valueChanges$ = merge(of(ctrl.value), ctrl.valueChanges).pipe(
        debounceTime(debounceMs),
        distinctUntilChanged(),
      );

      return valueChanges$.pipe(
        switchMap(() => of(validatorFn(ctrl))),
        map(result => {
          const existingBackendErrors = Object.entries(ctrl.errors || {}).reduce((acc, [key, value]) => {
            if (key === value) {
              acc[key] = value;
            }
            return acc;
          }, {});
          if (result) {
            return { ...existingBackendErrors, ...result };
          }
          return existingBackendErrors || null;
        }),
        first()
      );
    };
  }
}
