import { Pipe, PipeTransform } from '@angular/core';
import { TrainingCardType } from '@app/libs/core/models';

@Pipe({
  name: 'trainingByTypeAvailable',
  standalone: true,
})
export class TrainingByTypeAvailablePipe implements PipeTransform {
  transform(cardType: string, availableCardTypes: TrainingCardType[]): boolean {
    return availableCardTypes.includes(cardType as TrainingCardType);
  }
}
