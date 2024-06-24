import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Language } from '@app/interfaces/common.interface';
import flagIcons from '@app/common/icons-flag';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-language-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IconModule, InputTextModule],
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LanguageListComponent implements OnInit {
  @Input()
  availableLanguages: Language[];

  languageSearch: string;
  languageOptions = [];

  constructor(private dialogRef: DynamicDialogRef) {}

  onSearchLanguages() {
    this.updateLanguageOptions();
  }

  clearLangSearch() {
    this.languageSearch = '';
    this.updateLanguageOptions();
  }

  updateLanguageOptions() {
    this.languageOptions = this.availableLanguages;

    if (this.languageSearch?.length > 0) {
      this.languageOptions = this.languageOptions.filter((item) => item.title.toLowerCase().includes(this.languageSearch.toLowerCase()));
    }
  }

  isIconExist(iconLabel) {
    return !!flagIcons[`${iconLabel}-4x3`];
  }

  onSelectLanguage(code: string) {
    this.dialogRef.close(this.languageOptions.find((item) => item.code === code));
  }

  ngOnInit(): void {
    this.updateLanguageOptions();
  }
}
