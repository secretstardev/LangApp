import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent } from '@app/libs/shared';
import { TrainingExampleSentence, TrainingKanjiExampleWord, TrainingKanjiReading } from '@app/libs/core/models';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingCardWordExampleComponent, TrainingCardWordUseInComponent } from '../../shared';

@Component({
  selector: 'app-training-card-kanji-reading',
  standalone: true,
  imports: [CommonModule, TrainingCardWordUseInComponent, TrainingCardWordExampleComponent, ButtonModule, IconComponent, TranslateModule],
  templateUrl: './training-card-kanji-reading.component.html',
  styleUrls: ['./training-card-kanji-reading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardKanjiReadingComponent implements OnChanges {
  @Input() card?: TrainingKanjiReading | null;

  @Output() clickMore = new EventEmitter<string>();
  @Output() clickPlay = new EventEmitter<string>();

  countExampleWordsToShow = 0;
  countExampleSentenceToShow: Map<number, number> = new Map();

  ngOnChanges(changes: SimpleChanges) {
    if ('card' in changes && this.card) {
      this.updateCountExampleWordsToShow(this.card.countExampleWordsToShow);
    }
  }

  updateCountExampleWordsToShow(count: number): void {
    this.countExampleWordsToShow += count;
  }

  updateCountExampleSentenceToShow(count: number, id: number): void {
    this.countExampleSentenceToShow.set(id, (this.countExampleSentenceToShow.get(id) || 1) + count);
    this.countExampleSentenceToShow = new Map(this.countExampleSentenceToShow);
    console.log(this.countExampleSentenceToShow);
  }

  trackByFn: TrackByFunction<TrainingKanjiExampleWord> = (index, item) => index;
  trackByFnSentence: TrackByFunction<TrainingExampleSentence> = (index, item) => index;
}
