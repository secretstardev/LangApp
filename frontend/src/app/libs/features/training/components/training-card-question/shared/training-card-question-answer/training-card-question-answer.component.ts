import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { Drill, TrainingAnswer, TrainingQuestionCard } from '@app/libs/core/models';
import { TrainingCardQuestionAnswerPipe } from './training-card-question-answer.pipe';
import { IconComponent } from '@app/libs/shared';

@Component({
  selector: 'app-training-card-question-answer',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, TrainingCardQuestionAnswerPipe, IconComponent],
  templateUrl: './training-card-question-answer.component.html',
  styleUrls: ['./training-card-question-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardQuestionAnswerComponent {
  @Input() card?: TrainingQuestionCard | null;
  @Input() drill?: Drill;
  @Input() currentAnswerIndex: number | null = null;

  @Output() clickPlay = new EventEmitter<string>();
  @Output() checkAnswer = new EventEmitter<number>();
  @Output() nextQuestion = new EventEmitter<void>();

  trackByFn: TrackByFunction<TrainingAnswer> = (index, item) => index;
}
