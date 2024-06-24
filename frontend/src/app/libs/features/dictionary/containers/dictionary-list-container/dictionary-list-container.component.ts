import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryListComponent } from '../../components';
import { DictionaryListStore } from '@app/libs/core/store';
import { Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DictionaryList } from '@app/libs/core/models';
import { DictionaryListEntityFilterPipe } from '@app/libs/features/dictionary/containers/dictionary-list-container/dictionary-list-entity-filter.pipe';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-dictionary-list-container',
  standalone: true,
  imports: [CommonModule, DictionaryListComponent, DictionaryListEntityFilterPipe],
  templateUrl: './dictionary-list-container.component.html',
  styleUrls: ['./dictionary-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListContainerComponent implements OnInit {
  @Input() enabledRemove = true;
  @Input() selectable = false;
  @Input() selectedId?: number;
  @Input() hideAll = false;
  @Input() hideIds: number[] = [];

  @Output() entityClick = new EventEmitter<DictionaryList>();

  subscription?: Subscription;

  constructor(public dictionaryListStore: DictionaryListStore) {}

  ngOnInit(): void {
    this.subscription = this.dictionaryListStore.retrieveList({}).subscribe();
  }

  entityDelete(event: DictionaryList): void {
    this.dictionaryListStore.delete(event.id).pipe(untilDestroyed(this)).subscribe();
  }
}
