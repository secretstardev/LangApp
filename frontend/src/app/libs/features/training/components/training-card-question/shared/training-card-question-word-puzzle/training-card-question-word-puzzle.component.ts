import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Drill, TrainingQuestionCard } from '@app/libs/core/models';
import { TranslateModule } from '@ngx-translate/core';
import { JoinPipe } from '@app/libs/shared';

@Component({
  selector: 'app-training-card-question-word-puzzle',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, TranslateModule, JoinPipe],
  templateUrl: './training-card-question-word-puzzle.component.html',
  styleUrls: ['./training-card-question-word-puzzle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardQuestionWordPuzzleComponent {
  @Input() card?: TrainingQuestionCard | null;
  @Input() drill?: Drill;
  @Input() isAnswered = false;

  @Output() checkAnswer = new EventEmitter<string>();

  @HostListener('document:keydown.backspace', ['$event'])
  handleSpaceShortcut() {
    this.answer = this.answer.slice(0, -1);
  }

  answer = [];

  enterAnswer(button: string): void {
    this.answer = [...this.answer, button];
    if (this.card.question.buttons.length === this.answer.length) {
      this.checkAnswer.emit(this.answer.join(''));
    }
  }
}
