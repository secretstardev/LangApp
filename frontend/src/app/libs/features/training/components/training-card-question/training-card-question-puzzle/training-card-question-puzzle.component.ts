import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drill, TrainingQuestionCard } from '@app/libs/core/models';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TrainingCardQuestionAnswerComponent, TrainingCardQuestionWordComponent, TrainingCardQuestionWordPuzzleComponent } from '../shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-training-card-question-puzzle',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, TrainingCardQuestionAnswerComponent, TrainingCardQuestionWordComponent, TranslateModule, TrainingCardQuestionWordPuzzleComponent],
  templateUrl: './training-card-question-puzzle.component.html',
  styleUrls: ['./training-card-question-puzzle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardQuestionPuzzleComponent {
  @Input() card?: TrainingQuestionCard | null;
  @Input() drill?: Drill;
  @Input() currentAnswerIndex: number | null = null;

  @Output() clickMore = new EventEmitter<string>();
  @Output() clickPlay = new EventEmitter<string>();
  @Output() checkAnswer = new EventEmitter<string>();
}
