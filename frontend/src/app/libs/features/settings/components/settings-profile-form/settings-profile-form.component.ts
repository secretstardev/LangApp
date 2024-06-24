import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractFormGroupControl,
  DropdownComponent,
  DropdownItem,
  InvalidControlDirective,
  MarkAllAsTouchedDirective,
  PasswordControlComponent
} from '@app/libs/shared';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { Language, User } from '@app/interfaces/common.interface';
import {
  LanguageDraggableComponent
} from '@app/libs/features/language-selector/components/language-draggable/language-draggable.component';

type SettingsProfileForm = FormGroup<{
  id: FormControl<number | null>;
  name: FormControl<string>;
  email: FormControl<string>;
  telephone: FormControl<string>;
  wmr: FormControl<string>;
  timezone: FormControl<string>;
  language: FormControl<string>;
  languages: FormControl<string[]>;
  languageLevel: FormControl<string>;
  passwordControl?: FormControl<{ password: string; passwordRepeat: string }>;
}>;

@Component({
  selector: 'app-settings-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    InvalidControlDirective,
    ButtonModule,
    MultiSelectModule,
    CheckboxModule,
    PasswordControlComponent,
    MarkAllAsTouchedDirective,
    LanguageDraggableComponent,
    DropdownComponent,
  ],
  templateUrl: './settings-profile-form.component.html',
  styleUrls: ['./settings-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SettingsProfileFormComponent extends AbstractFormGroupControl<SettingsProfileForm> {
  @Input() timeZones: DropdownItem[] = [];
  @Input() languages: Language[] = [];
  @Input() languageLevels: DropdownItem[] = [];
  @Output() clickSave = new EventEmitter<Partial<User>>();

  protected mainForm: SettingsProfileForm = this.fb.group({
    id: new FormControl(null),
    name: new FormControl('', { validators: Validators.required }),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl(''),
    wmr: new FormControl(''),
    timezone: new FormControl(''),
    language: new FormControl(''),
    languages: new FormControl([], Validators.required),
    languageLevel: new FormControl('')
  });

  isChangePassword = false;

  constructor(private fb: FormBuilder) {
    super();
  }

  protected onSubmit(): void {
    const { passwordControl, ...user } = this.mainForm.getRawValue();
    this.clickSave.emit(passwordControl ? { ...user, password: passwordControl.password } : user);
  }

  onPasswordFlagChange({ checked }: CheckboxChangeEvent) {
    this.isChangePassword = checked;
    if (this.isChangePassword) {
      this.mainForm.addControl('passwordControl', this.fb.control({ password: '', passwordRepeat: '' }));
    } else {
      this.mainForm.removeControl('passwordControl');
    }
  }
}
