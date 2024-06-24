import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TrainingCardListComponent, TrainingCardWordExampleComponent, TrainingCardWordUseInComponent } from '../shared';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingMeaning, WordInfoCard } from '@app/libs/core/models';
import { TrainingCardWordKanjComponent } from './training-card-word-kanji/training-card-word-kanj.component';

@Component({
  selector: 'app-training-card-word',
  standalone: true,
  imports: [CommonModule, ButtonModule, TrainingCardWordExampleComponent, TrainingCardWordUseInComponent, TranslateModule, TrainingCardListComponent, TrainingCardWordKanjComponent],
  templateUrl: './training-card-word.component.html',
  styleUrls: ['./training-card-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardWordComponent implements OnChanges {
  @Input() card?: WordInfoCard;

  @Output() clickMore = new EventEmitter<string>();
  @Output() clickPlay = new EventEmitter<string>();

  countWordsToShow = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (this.card) {
      this.countWordsToShow = this.card.countMeaningsToShow;
    }
  }

  updateCountWordsToShow(count: number): void {
    this.countWordsToShow += count;
  }

  trackByFn: TrackByFunction<TrainingMeaning> = (index, item) => index;
}
