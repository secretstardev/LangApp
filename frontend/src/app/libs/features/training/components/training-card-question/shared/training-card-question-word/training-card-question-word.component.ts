import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TrainingQuestionCard } from '@app/libs/core/models';
import { ButtonMoreComponent, IconComponent, JoinPipe } from '@app/libs/shared';

@Component({
  selector: 'app-training-card-question-word',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent, JoinPipe, ButtonMoreComponent],
  templateUrl: './training-card-question-word.component.html',
  styleUrls: ['./training-card-question-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardQuestionWordComponent {
  @Input() card?: TrainingQuestionCard | null;
  @Input() isAnswered = false;

  @Output() clickPlay = new EventEmitter<string>();
  @Output() clickMore = new EventEmitter<string>();
}
