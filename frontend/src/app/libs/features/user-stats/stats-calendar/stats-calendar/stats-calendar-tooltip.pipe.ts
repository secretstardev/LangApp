import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@app/libs/core/models';

@Pipe({
  name: 'statsCalendarTooltip',
  standalone: true,
})
export class StatsCalendarTooltipPipe implements PipeTransform {
  transform(activity?: Activity | null): string {
    if (!activity) {
      return 'StudiedTimeUnknown';
    }

    if (activity.total_seconds >= activity.goal_seconds) {
      return 'StudiedTime';
    }

    if (activity.is_current_day && activity.is_penalty_received) {
      if (!activity.is_penalty_received && !activity.is_goal_reached) {
        return 'StudiedTimePenaltyTodayPayed';
      }

      if (activity.is_penalty_received) {
        return 'StudiedTimePenaltyToday';
      }
    }

    if (!activity.is_current_day) {
      if (!activity.is_penalty_received && !activity.is_goal_reached) {
        return 'StudiedTimePenaltyPayed';
      }

      if (activity.is_penalty_received) {
        return 'StudiedTimePenalty';
      }
    }

    return 'StudiedTimePenalty';
  }
}
