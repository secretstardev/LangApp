import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconComponent, LangUtils, ObjectUtils } from '@app/libs/shared';
import { DictionaryFilter } from '@app/libs/core/models';
import { ButtonModule } from 'primeng/button';

enum FormFields {
  search = 'search',
  type = 'type',
}

interface ProjectSetForm {
  [FormFields.search]: FormControl<string>;
  [FormFields.type]: FormControl<string>;
}
@Component({
  selector: 'app-dictionary-filter',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, TranslateModule, InputTextModule, IconComponent, ButtonModule],
  templateUrl: './dictionary-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dictionary-filter.component.scss'],
})
export class DictionaryFilterComponent {
  @Output() filterChange = new EventEmitter<Partial<DictionaryFilter>>();

  mainForm = new FormGroup<ProjectSetForm>({
    [FormFields.search]: new FormControl<string>('', { nonNullable: true }),
    [FormFields.type]: new FormControl<string>('', { nonNullable: true }),
  });

  wordTypes: Record<number, string> = {
    1: 'Word',
    2: 'Kanji',
  };

  formFields = FormFields;
  showForMobile = false;

  onFilterChange(): void {
    const formValue = this.mainForm.getRawValue();
    const filter: DictionaryFilter = {
      type: formValue.type,
    };
    if (formValue.search) {
      if (LangUtils.isJapanese(formValue.search)) {
        filter.original_word = {
          like: formValue.search,
        };
      } else {
        filter.translate_word = {
          like: formValue.search,
        };
      }
    }
    this.filterChange.emit(ObjectUtils.removeEmpty(filter));
  }
}
