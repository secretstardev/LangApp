import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { RestoreModes } from '@app/libs/features/signin';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '@app/services/custom-validator';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { MessageErrorComponent } from '@app/libs/shared/components/messages/message-error/message-error.component';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss'],
  standalone: true,
  imports: [
    NgSwitchCase,
    NgSwitch,
    ReactiveFormsModule,
    NgIf,
    PasswordModule,
    TranslateModule,
    SharedModule,
    MessageErrorComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestoreComponent implements OnInit {
  @Input()
  loading: boolean;

  @Input()
  errors: any[] = [];

  @Output()
  formSubmit: EventEmitter<any> = new EventEmitter<any>();
  
  form: UntypedFormGroup;
  _mode: RestoreModes;
  @HostBinding('class.typography') enableTypography = true;
  protected readonly RestoreModes = RestoreModes;

  constructor(private customValidator: CustomValidator) {
  }

  @Input() set mode(value) {
    this._mode = value;
    this.changeForm();
  }

  ngOnInit() {
    // todo: [SHR]: translate errors
    this.changeForm();
  }

  changeForm() {
    if (this._mode === RestoreModes.MODE_REQUEST) {
      this.form = new UntypedFormGroup({
        email: new UntypedFormControl('',
          { validators: [Validators.required, CustomValidator.confirmEmailPattern], updateOn: 'change' }),
      });
    }

    if (this._mode === RestoreModes.MODE_PASSWORD) {
      this.form = new UntypedFormGroup(
        {
          password: new UntypedFormControl('', {
            validators: [
              Validators.required,
              CustomValidator.confirmPasswordRulesCheck
            ], updateOn: 'change'
          }),
          passwordRepeat: new UntypedFormControl('', { validators: [Validators.required], updateOn: 'change' }),
        },
        CustomValidator.confirmPasswordCheck
      );
    }
  }

  onSubmit() {
    this.formSubmit.emit(this.form.value);
  }

  checkError(fieldName: string) {
    const field = this.form.get(fieldName);
    return (field.touched || field.dirty) && !field.valid;
  }

  getErrors(fieldName: string): string {
    return this.customValidator.getErrors(this.form, fieldName);
  }
}
