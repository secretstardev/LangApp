import { StatsCalendarLegendItem } from './stats-calendar.models';

export const statsCalendarLegendItemsColors = {
  missed: 'var(--primary-tulip-800)',
  goalReached: 'var(--states-success-200)',
  moreAverage: 'var(--states-success-600)',
  best: 'var(--states-success-800)',
  unknown: 'var(--grayscale-placeholder)',
};

export const statsCalendarLegendItems: StatsCalendarLegendItem[] = [
  {
    title: 'StatsCalendar.MissedDay',
    color: statsCalendarLegendItemsColors.missed,
    icon: 'info-circle',
  },
  {
    title: 'StatsCalendar.GoalReached',
    color: statsCalendarLegendItemsColors.goalReached,
  },
  {
    title: 'StatsCalendar.MoreAverage',
    color: statsCalendarLegendItemsColors.moreAverage,
  },
  {
    title: 'StatsCalendar.Best',
    color: statsCalendarLegendItemsColors.best,
  },
  {
    title: 'StatsCalendar.Unknown',
    color: statsCalendarLegendItemsColors.unknown,
  },
];
