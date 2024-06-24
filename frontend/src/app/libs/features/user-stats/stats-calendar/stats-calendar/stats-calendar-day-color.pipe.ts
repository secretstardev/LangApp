import { Pipe, PipeTransform } from '@angular/core';
import { statsCalendarLegendItemsColors } from '../stats-calendar.config';

@Pipe({
  name: 'statsCalendarDayColor',
  standalone: true,
})
export class StatsCalendarDayColorPipe implements PipeTransform {
  transform(value?: number, goalSeconds?: number): string {
    if (value === null || value === undefined || !goalSeconds) {
      return statsCalendarLegendItemsColors.unknown;
    }

    if (value < goalSeconds) {
      return statsCalendarLegendItemsColors.missed;
    }

    if (value >= goalSeconds && value < 70 * 60) {
      return statsCalendarLegendItemsColors.goalReached;
    }

    if (value > 70 * 60) {
      return statsCalendarLegendItemsColors.moreAverage;
    }

    return statsCalendarLegendItemsColors.best;
  }
}
