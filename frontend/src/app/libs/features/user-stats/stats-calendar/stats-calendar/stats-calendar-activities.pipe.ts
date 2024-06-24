import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@app/libs/core/models';

@Pipe({
  name: 'statsCalendarActivities',
  standalone: true,
})
export class StatsCalendarActivitiesPipe implements PipeTransform {
  transform(day: string, activities?: Activity[]): Activity | undefined {
    return activities?.find((el) => el?.date === day);
  }
}
