import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statsCalendarMonth',
  standalone: true,
})
export class StatsCalendarMonthPipe implements PipeTransform {
  transform(day: string, firstDate: Date, lastDate: Date, index: number): boolean {
    const currentDate = new Date(day);

    if (index === 0) {
      const firstDayNextMonth = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 1);
      const diff = ((firstDayNextMonth as unknown as number) - (firstDate as unknown as number)) / (1000 * 60 * 60 * 24);
      return diff >= 14;
    }

    if (currentDate.getMonth() === lastDate.getMonth()) {
      return Number(currentDate.getDate().toString()) < 7 && Number(lastDate.getDate().toString()) >= 14;
    }

    return Number(currentDate.getDate().toString()) < 7;
  }
}
