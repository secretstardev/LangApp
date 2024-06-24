import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryListFormComponent } from '../../components';
import { DictionaryList, DictionaryListCreate } from '@app/libs/core/models';
import { DictionaryListStore } from '@app/libs/core/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@UntilDestroy()
@Component({
  selector: 'app-dictionary-list-form-dialog-container',
  standalone: true,
  imports: [CommonModule, DictionaryListFormComponent],
  templateUrl: './dictionary-list-form-dialog-container.component.html',
  styleUrls: ['./dictionary-list-form-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListFormDialogContainerComponent {
  entity?: DictionaryList;
  constructor(
    private store: DictionaryListStore,
    private messageService: MessageService,
    private translateService: TranslateService,
    private ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig
  ) {
    this.entity = this.dialogConfig.data.entity;
  }

  createList(form: DictionaryListCreate) {
    if (!this.entity?.id) {
      return;
    }
    this.store
      .update({ name: form.name, type: form.type, id: this.entity.id })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.translateService.instant('NewListUpdated'),
        });
        void this.ref.close();
      });
  }
}
