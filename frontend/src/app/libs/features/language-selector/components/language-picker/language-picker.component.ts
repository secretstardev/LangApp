import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Language } from '@app/interfaces/common.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import flagIcons from '@app/common/icons-flag';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [CommonModule, IconModule, InputTextModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LanguagePickerComponent {
  @Input()
  selectedCode: string;

  @Input()
  availableLanguages: Language[];

  languageSearch: string;

  constructor(private dialogRef: DynamicDialogRef) {}


  isIconExist(iconLabel) {
    return !!flagIcons[`${iconLabel}-4x3`];
  }

  onSelectLanguage(code: string) {
    this.dialogRef.close(this.availableLanguages.find((item) => item.code === code));
  }
}
