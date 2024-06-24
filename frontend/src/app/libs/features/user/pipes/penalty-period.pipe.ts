import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/interfaces/common.interface';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'penaltyPeriod',
  standalone: true,
  pure: false
})
export class PenaltyAmountPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(period: string): string {
    return this.translateService.instant(`payment.period.${period}`);
  }
}
