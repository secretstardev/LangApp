import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit } from '@angular/core';
import { DictionaryListStore } from '@app/libs/core/store';
import { routingConfig } from '@app/libs/config';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { dictionaryListDefaults, DictionaryListFormDialogContainerComponent } from '@app/libs/features/dictionary';
import { DictionaryList } from '@app/libs/core/models';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryPageComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  listId = inject(ActivatedRoute).snapshot.params[routingConfig.dictionary.dictionary.idKey];
  dictionaryListStore = inject(DictionaryListStore);
  isAllList = this.listId === dictionaryListDefaults.allEntities;

  breadcrumbsLabels = [];

  constructor(private dialogService: DialogService, private tr: TranslateService) {}

  ngOnInit(): void {
    this.listId = this.isAllList ? '' : this.listId;

    if (this.listId) {
      this.dictionaryListStore.retrieveOne(this.listId).pipe(untilDestroyed(this)).subscribe();
      this.dictionaryListStore.selectEntity(this.listId);
    }
  }

  editEntity(list: DictionaryList): void {
    const ref = this.dialogService.open(DictionaryListFormDialogContainerComponent, {
      header: this.tr.instant('EditWordList'),
      data: {
        entity: list,
      },
    });
  }
}
