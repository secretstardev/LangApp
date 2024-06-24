import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/interfaces/common.interface';

@Pipe({
  name: 'penaltyAmount',
  standalone: true,
})
export class PenaltyAmountPipe implements PipeTransform {
  transform(user: User): string {
    return Math.round(user.penaltyAmount) + user.config?.availableCurrencyList?.[user.currency];
  }
}
