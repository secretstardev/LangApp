import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryFilterComponent, DictionaryTableComponent } from '../../components';
import { DictionaryFilter, DictionaryGet } from '@app/libs/core/models';
import { DictionaryStore } from '@app/libs/core/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, filter, first, Subscription, switchMap, throwError } from 'rxjs';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DictionarySelectListContainerComponent } from '..';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { routingConfig } from '@app/libs/config';
import { dictionaryListDefaults } from '@app/libs/features/dictionary';
import { DictionaryImportContainerComponent } from '@app/libs/features/dictionary/containers/dictionary-import-container/dictionary-import-container.component';
import { MessageService } from 'primeng/api';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-dictionary-container',
  standalone: true,
  imports: [CommonModule, DictionaryFilterComponent, DictionaryTableComponent, DynamicDialogModule, DictionarySelectListContainerComponent],
  templateUrl: './dictionary-container.component.html',
  styleUrls: ['./dictionary-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class DictionaryContainerComponent implements OnInit {
  subscription?: Subscription;
  listId = this.activatedRoute.snapshot.params[routingConfig.dictionary.dictionary.idKey];
  isAllList = this.listId === dictionaryListDefaults.allEntities;
  constructor(public state: DictionaryStore, private dialogService: DialogService, private tr: TranslateService, private activatedRoute: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit() {
    this.listId = this.isAllList ? '' : this.listId;
    this.subscription = this.state.retrieveList({ listId: this.listId }).subscribe();
  }

  filterChange(event: Partial<DictionaryFilter>) {
    this.subscription?.unsubscribe();
    this.subscription = this.state
      .retrieveList({ filter: { ...event, listId: this.listId } })
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  selectionChange(event: { id: number; checked: boolean }) {
    this.state.selectionIdsChange(event);
  }

  lazyLoad({ page, perPage }: DictionaryGet): void {
    this.subscription?.unsubscribe();
    this.subscription = this.state.lazyLoad({ page, perPage, listId: this.listId }).pipe(untilDestroyed(this)).subscribe();
  }

  moveToEntities(ids: number[]) {
    const ref = this.dialogService.open(DictionarySelectListContainerComponent, {
      data: {
        hideAll: true,
        hideIds: [Number(this.listId)],
      },
      header: this.tr.instant('MoveTo'),
    });
    ref.onClose
      .pipe(
        first(),
        filter(Boolean),
        switchMap((newListId) =>
          this.state.move({
            ids,
            newListId,
            listId: this.listId,
          })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  copyToEntities(ids: number[]) {
    const ref = this.dialogService.open(DictionarySelectListContainerComponent, {
      data: {
        hideAll: true,
        hideIds: [Number(this.listId)],
      },
      header: this.tr.instant('CopyTo'),
    });
    ref.onClose
      .pipe(
        first(),
        filter(Boolean),
        switchMap((newListId) =>
          this.state.add({
            ids,
            listId: newListId,
          })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  selectedAllChange(isSelected: boolean): void {
    this.state.selectAll(isSelected);
  }

  deleteEntities(ids: number[]): void {
    this.state
      .deleteEntities(Number(this.listId), ids)
      .pipe(
        catchError((err) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.tr.instant('WordsDeletedComplete'),
          });
          return throwError(() => new Error(err));
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.tr.instant('WordsDeletedComplete'),
        });
      });
  }

  importWords() {
    const ref = this.dialogService.open(DictionaryImportContainerComponent, {
      header: this.tr.instant('ImportWords'),
    });
  }
}
