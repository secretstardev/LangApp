import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractFormGroupControl } from '@app/libs/shared';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { pluginTranslateOptionArray } from './settings-plugin-form.config';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { UserClickModifier, UserExtensionSettings } from '@app/libs/core/models';

type SettingsPluginForm = FormGroup<{
  clickModifier: FormControl<UserClickModifier>;
  // processSubtitles: FormControl<boolean>;
}>;

@Component({
  selector: 'app-settings-plugin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RadioButtonModule, ButtonModule, CheckboxModule],
  templateUrl: './settings-plugin-form.component.html',
  styleUrls: ['./settings-plugin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPluginFormComponent extends AbstractFormGroupControl<SettingsPluginForm> {
  @Output() clickSave = new EventEmitter<UserExtensionSettings>();

  protected mainForm: SettingsPluginForm = this.fb.group({
    clickModifier: new FormControl(UserClickModifier.DoubleClick, [Validators.required]),
    // processSubtitles: new FormControl(true),
  });

  options = pluginTranslateOptionArray;

  constructor(private fb: FormBuilder) {
    super();
  }

  protected onSubmit(): void {
    this.clickSave.emit(this.mainForm.getRawValue());
  }
}
