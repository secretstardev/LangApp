import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AbstractFormGroupControl, InvalidControlDirective } from '@app/libs/shared';
import { DictionaryList, DictionaryListCreate } from '@app/libs/core/models';
import { formConfig } from '@app/libs/config';

type DictionaryForm = FormGroup<{
  name: FormControl<string>;
  wordsList: FormControl<string>;
  importWords: FormControl<boolean>;
  isDefault: FormControl<boolean>;
}>;

@Component({
  selector: 'app-dictionary-list-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, PaginatorModule, ReactiveFormsModule, TranslateModule, CheckboxModule, InputTextareaModule, ButtonModule, InvalidControlDirective],
  templateUrl: './dictionary-list-form.component.html',
  styleUrls: ['./dictionary-list-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListFormComponent extends AbstractFormGroupControl<DictionaryForm, DictionaryList> implements OnChanges {
  @Input() type: 'short' | 'full' = 'full';

  @Output() submitForm = new EventEmitter<DictionaryListCreate>();

  mainForm: DictionaryForm = this.fb.group({
    name: new FormControl<string>('', [Validators.required, Validators.maxLength(formConfig.nameMaxLength)]),
    wordsList: new FormControl<string>(''),
    importWords: new FormControl<boolean>(false),
    isDefault: new FormControl<boolean>(false),
  });

  readonly formConfig = formConfig;

  constructor(private fb: FormBuilder) {
    super();
  }

  private get isDefaultControl(): FormControl<boolean> {
    return this.mainForm.get('isDefault') as FormControl<boolean>;
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if ('entity' in changes && this.entity) {
      this.isDefaultControl.patchValue(this.entity.type === 'default', { emitEvent: false, onlySelf: true });

      if (this.entity.type === 'default') {
        this.isDefaultControl.disable();
      }
    }
  }

  onSubmit(): void {
    const { isDefault, ...params } = this.mainForm.getRawValue();
    this.submitForm.emit({
      ...params,
      type: isDefault ? 'default' : 'user',
    });
  }
}
