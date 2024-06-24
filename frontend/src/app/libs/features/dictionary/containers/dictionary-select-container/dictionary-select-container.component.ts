import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, OnInit, Output, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryList, DictionaryListType } from '@app/libs/core/models';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BaseCvaControl, baseCvaProviders, CounterComponent, DropdownComponent, IconComponent } from '@app/libs/shared';
import { ButtonModule } from 'primeng/button';
import { TippyDirective } from '@ngneat/helipopper';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DictionaryListStore } from '@app/libs/core/store';
import { ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DictionaryTableHeaderRowComponent } from '@app/libs/features/dictionary/components/dictionary-table/dictionary-table-header-row/dictionary-table-header-row.component';

@UntilDestroy()
@Component({
  selector: 'app-dictionary-select',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    IconComponent,
    ButtonModule,
    TippyDirective,
    TranslateModule,
    ConfirmDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    DropdownComponent,
    DictionaryTableHeaderRowComponent,
    CounterComponent,
  ],
  templateUrl: './dictionary-select-container.component.html',
  styleUrls: ['./dictionary-select-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: baseCvaProviders(DictionarySelectContainerComponent),
})
export class DictionarySelectContainerComponent extends BaseCvaControl<DictionaryList> implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  @Output() valueChange = new EventEmitter<DictionaryList>();

  types = DictionaryListType;

  constructor(public dictionaryListStore: DictionaryListStore) {
    super();
  }

  ngOnInit() {
    this.dictionaryListStore.retrieveList({}).pipe(untilDestroyed(this)).subscribe();
  }

  trackByFn: TrackByFunction<DictionaryList> = (index, item) => item.id;
}
