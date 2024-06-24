import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryListContainerComponent } from '../dictionary-list-container';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogFooterComponent, IconComponent, InputSearchComponent } from '@app/libs/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { DictionaryListStore } from '@app/libs/core/store';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DictionaryList } from '@app/libs/core/models';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-dictionary-select-list-container',
  standalone: true,
  imports: [CommonModule, DictionaryListContainerComponent, InputTextModule, IconComponent, ReactiveFormsModule, InputSearchComponent, DialogFooterComponent],
  templateUrl: './dictionary-select-list-container.component.html',
  styleUrls: ['./dictionary-select-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DictionarySelectListContainerComponent {
  @HostBinding('class.typography') enableTypography = true;

  subscription?: Subscription;
  selectedId?: number;

  constructor(private dictionaryListStore: DictionaryListStore, private ref: DynamicDialogRef, public dialogConfig: DynamicDialogConfig<{ hideAll: boolean; hideIds: number[] }>) {}

  filterChange(search: string): void {
    this.subscription = this.dictionaryListStore.retrieveList({ filter: { name: { like: search } } }).subscribe();
  }

  entityClick(list: DictionaryList) {
    this.selectedId = list.id;
  }

  clickCancel() {
    this.ref.close();
  }

  clickApply() {
    this.ref.close(this.selectedId);
  }
}
