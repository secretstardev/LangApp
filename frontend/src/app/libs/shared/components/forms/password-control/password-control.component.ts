import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseCvaGroup, baseCvaProviders, InvalidControlDirective, MarkAllAsTouchedDirective } from '../../../utils';
import { passwordsMatchGroupValidator } from '.';
import { CustomValidator } from '@app/services/custom-validator';
import { PasswordModule } from 'primeng/password';

interface PasswordControlForm {
  password: string;
  passwordRepeat: string;
}

@Component({
  selector: 'app-password-control',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, TranslateModule, InvalidControlDirective, MarkAllAsTouchedDirective, PasswordModule],
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: baseCvaProviders(PasswordControlComponent),
})
export class PasswordControlComponent extends BaseCvaGroup<PasswordControlForm> {
  @HostBinding('class.typography') enableTypography = true;

  constructor() {
    super({
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, CustomValidator.confirmPasswordRulesCheck] }),
      passwordRepeat: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
    this.control.addValidators(passwordsMatchGroupValidator);
  }
}
