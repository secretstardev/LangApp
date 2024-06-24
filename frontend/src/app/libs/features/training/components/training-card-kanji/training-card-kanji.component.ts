import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe, ProgressBarComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingCardKanjiReadingComponent } from './training-card-kanji-reading/training-card-kanji-reading.component';
import { KanjiInfoCard } from '@app/libs/core/models';
import { TrainingCardListComponent } from '../shared';
import { TippyDirective } from '@ngneat/helipopper';

@Component({
  selector: 'app-training-card-kanji',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, TrainingCardKanjiReadingComponent, TranslateModule, JoinPipe, TrainingCardListComponent, TippyDirective],
  templateUrl: './training-card-kanji.component.html',
  styleUrls: ['./training-card-kanji.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardKanjiComponent {
  @Input() card?: KanjiInfoCard | null;

  @Output() clickMore = new EventEmitter<string>();
  @Output() clickPlay = new EventEmitter<string>();
}
