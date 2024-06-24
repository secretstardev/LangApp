import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DragulaModule } from 'ng2-dragula';
import { TranslateModule } from '@ngx-translate/core';
import { Language } from '@app/interfaces/common.interface';
import flagIcons from '@app/common/icons-flag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { LanguageListComponent } from '@app/libs/features/language-selector/components/language-list/language-list.component';
import { CustomDialogService } from '@app/services/custom-dialog.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { IconModule, IconService } from '@abhinavakhil/iconify-angular';
import { BaseCvaControl } from '@app/libs/shared';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-language-draggable',
  standalone: true,
  imports: [CommonModule, ButtonModule, DragulaModule, IconModule, TranslateModule, DialogModule, InputTextModule, PaginatorModule],
  templateUrl: './language-draggable.component.html',
  styleUrls: ['./language-draggable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageDraggableComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LanguageDraggableComponent),
      multi: true,
    },
  ],
})
export class LanguageDraggableComponent extends BaseCvaControl<string[]> {
  @Input() set selectedCodes(langCodes: string[]) {
    this.selectedLanguages = this.availableLanguages.filter((lang) => langCodes.includes(lang.code));
    this.updateLanguageOptions();
  }

  @Input()
  availableLanguages: Language[] = [];

  @Output()
  updateLanguages: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedLanguages: Language[];
  languageOptions: Language[];
  ref: DynamicDialogRef;

  constructor(private iconService: IconService, private dialogService: CustomDialogService, private cdr: ChangeDetectorRef) {
    super();
    this.iconService.registerAll(flagIcons);
  }

  updateLanguageOptions(): void {
    this.languageOptions = this.availableLanguages.filter((lang) => !this.selectedLanguages.includes(lang));
  }

  isIconExist(iconLabel): boolean {
    return !!flagIcons[`${iconLabel}-4x3`];
  }

  updateSelectedLanguages(newLanguages: Language[]): void {
    this.selectedLanguages = newLanguages;
    const newLangCodes = newLanguages.map(lang => lang.code);
    this.control.setValue(newLangCodes, { emitEvent: true });
    this.updateControlDataRoutine(newLangCodes);
  }

  removeItemFromSelected(code: string): void {
    this.selectedLanguages = this.selectedLanguages.filter((item) => item.code !== code);
    this.control.setValue(this.selectedLanguages.map(lang => lang.code), { emitEvent: true });
    this.updateControlDataRoutine(this.selectedLanguages?.map(lang => lang.code));
  }

  updateControlDataRoutine(newLangCodes: string[]): void {
    this.updateLanguages.emit(newLangCodes);
    this.onTouched();
    this.control.setValue(
      this.selectedLanguages.map((lang) => lang.code),
      { emitEvent: true }
    );
    this.updateLanguageOptions();
    this.cdr.detectChanges();
  }

  openLanguageSelector(): void {
    this.ref = this.dialogService.open(LanguageListComponent, {
      data: {
        input: {
          availableLanguages: this.languageOptions,
        },
        title: 'Add language',
        breakpoints: { '1024px': '35vw', '300px': '90vw' }
      },
      modal: true,
      height: '70vh',
      dismissableMask: true,
      showHeader: false,
      styleClass: 'language-selector',
    });
    this.ref.onClose.pipe(take(1), untilDestroyed(this)).subscribe((result) => {
      if (result) {
        this.updateSelectedLanguages([...this.selectedLanguages, result]);
      }
    });
  }

  /* internal */
  writeValue(value: string[]) {
    const languagesMap = new Map(this.availableLanguages.map(lang => [lang.code, lang]));
    const languages = value.reduce((acc, code) => {
      const language = languagesMap.get(code);
      if (language) {
        acc.push(language);
      }
      return acc;
    }, []);

    this.control.setValue(value, { emitEvent: false });
    this.updateSelectedLanguages(languages);
  }

  registerOnChange(fn: (_: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
