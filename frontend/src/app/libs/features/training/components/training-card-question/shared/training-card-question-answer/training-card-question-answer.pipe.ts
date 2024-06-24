import { Pipe, PipeTransform } from '@angular/core';
import { TrainingAnswer, TrainingQuestionCard } from '@app/libs/core/models';

@Pipe({
  name: 'trainingCardQuestionAnswer',
  standalone: true,
})
export class TrainingCardQuestionAnswerPipe implements PipeTransform {
  transform(card: TrainingQuestionCard, isAnswered: boolean): TrainingAnswer[] {
    return isAnswered && card?.question?.openAnswers ? card?.question?.openAnswers : card?.question?.answers;
  }
}
