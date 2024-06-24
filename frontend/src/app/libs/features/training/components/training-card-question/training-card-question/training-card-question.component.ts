import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Drill, TrainingQuestionCard } from '@app/libs/core/models';
import { TrainingCardQuestionAnswerComponent, TrainingCardQuestionWordComponent } from '../shared';
import { ButtonModule } from 'primeng/button';
import { TrainingByTypeAvailablePipe } from '../../shared';

@Component({
  selector: 'app-training-card-question',
  standalone: true,
  imports: [CommonModule, TrainingCardQuestionWordComponent, TranslateModule, TrainingCardQuestionAnswerComponent, ButtonModule, TrainingByTypeAvailablePipe],
  templateUrl: './training-card-question.component.html',
  styleUrls: ['./training-card-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardQuestionComponent {
  @Input() card?: TrainingQuestionCard | null;
  @Input() drill?: Drill;

  @Output() clickPlay = new EventEmitter<string>();
  @Output() checkAnswer = new EventEmitter<number>();
  @Output() nextQuestion = new EventEmitter<void>();
  @Output() clickMore = new EventEmitter<string>();
  @Output() disableAudioQuestion = new EventEmitter<string>();

  currentAnswerIndex: number | null = null;
}
