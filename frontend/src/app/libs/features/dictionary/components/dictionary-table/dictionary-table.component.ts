import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { Dictionary, DictionaryGet } from '@app/libs/core/models';
import { RequestResult } from '@ngneat/elf-requests';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { IconComponent, ProgressBarComponent, TableComponent } from '@app/libs/shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DictionaryTableBodyRowComponent } from './dictionary-table-body-row/dictionary-table-body-row.component';
import { DictionaryTableFooterRowComponent } from './dictionary-table-footer-row/dictionary-table-footer-row.component';
import { DictionaryTableHeaderRowComponent } from './dictionary-table-header-row/dictionary-table-header-row.component';
import { PaginationData } from '@ngneat/elf-pagination';

import { AutoSizeVirtualScrollStrategy, RxVirtualFor, RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';
import { CheckboxModule } from 'primeng/checkbox';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CustomDialogService } from '@app/services/custom-dialog.service';

@UntilDestroy()
@Component({
  selector: 'app-dictionary-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TranslateModule,
    ProgressSpinnerModule,
    ButtonModule,
    IconComponent,
    ProgressBarComponent,
    ConfirmDialogModule,
    DictionaryTableBodyRowComponent,
    DictionaryTableFooterRowComponent,
    DictionaryTableHeaderRowComponent,
    RxVirtualFor,
    RxVirtualScrollViewportComponent,
    AutoSizeVirtualScrollStrategy,
    TableComponent,
    CheckboxModule,
  ],
  templateUrl: './dictionary-table.component.html',
  styleUrls: ['./dictionary-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryTableComponent {
  @Input() dictionaries?: RequestResult & { data: Dictionary[] };
  @Input() selectionIds: number[] = [];
  @Input() pagination?: PaginationData;
  @Input() selectAll: boolean = false;
  @Input() selectionTotal: number = 0;
  @Input() isAllList = false;

  @Output() selectionChange = new EventEmitter<{ id: number; checked: boolean }>();
  @Output() lazyLoad = new EventEmitter<DictionaryGet>();
  @Output() deleteEntities = new EventEmitter<number[]>();
  @Output() moveToEntities = new EventEmitter<number[]>();
  @Output() copyToEntities = new EventEmitter<number[]>();
  @Output() selectedAllChange = new EventEmitter<boolean>();
  @Output() importWords = new EventEmitter<void>();

  colspanCount = 4;

  constructor(private customDialogService: CustomDialogService) {}

  onEntitiesDelete(event: Event): void {
    this.customDialogService
      .openDeleteDialog('DeleteWordsConfirm.Description')
      .onClose.pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.deleteEntities.emit(this.selectionIds);
        }
      });
  }

  onSelectAllChange(checked: boolean): void {
    this.selectedAllChange.emit(checked);
  }

  onMoveToEntities(): void {
    this.moveToEntities.emit(this.selectionIds);
  }

  onCopyToEntities(): void {
    this.copyToEntities.emit(this.selectionIds);
  }

  onLazyLoad(event: Partial<PaginationData>): void {
    this.lazyLoad.emit({ perPage: event.perPage, page: event.currentPage });
  }

  onSelectionChange(dictionary: Dictionary, checked: boolean) {
    this.selectionChange.emit({ id: dictionary.id, checked });
  }
}
