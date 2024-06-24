import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trainingFooterAvailability',
  standalone: true,
})
export class TrainingFooterAvailabilityPipe implements PipeTransform {
  transform(cardType: string): boolean {
    switch (cardType) {
      case 'kanjiInfo':
      case 'wordInfo':
      case 'typeFuriganaForWholeWord':
        return true;
      default:
        return false;
    }
  }
}
