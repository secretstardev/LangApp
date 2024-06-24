import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { untilDestroyed } from '@ngneat/until-destroy';
import { DictionaryStore } from '@app/libs/core/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dictionary-import-container',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, InputTextareaModule, ButtonModule, FormsModule],
  templateUrl: './dictionary-import-container.component.html',
  styleUrls: ['./dictionary-import-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryImportContainerComponent {
  words = '';

  constructor(private ref: DynamicDialogRef, private store: DictionaryStore, private messageService: MessageService, private tr: TranslateService) {}

  importWords() {
    this.store
      .importEntities('')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.tr.instant('ImportWordsCompleted'),
        });
        void this.ref.close();
      });
  }
}
