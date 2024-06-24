import { TimelineLegendItem, TimelineMarker } from './timeline.models';

const colors = {
  error: 'var(--states-error-500-base)',
  warning: 'var(--states-warning-500-base)',
  success: 'var(--states-success-500-base)',
  info: 'var(--states-info-500-base)',
};

export interface GetTimeLineMarkersParams {
  learningMinutes: number;
  totalMinutes: number;
  goalDayMinutes: number;
  averageMinutes: number;
  bestMinutes: number;
}

export const getTimeLineMarkersBaseParams: GetTimeLineMarkersParams = {
  learningMinutes: 0,
  totalMinutes: 110,
  goalDayMinutes: 10,
  averageMinutes: 35,
  bestMinutes: 70,
};

export function getTimeLineMarkers(params: GetTimeLineMarkersParams): TimelineMarker[] {
  const { learningMinutes, totalMinutes, goalDayMinutes, averageMinutes, bestMinutes } = params;
  const markers = [];

  for (let i = 5; i <= totalMinutes; i += 5) {
    const marker: TimelineMarker = { value: `${i}m` };

    if (i === goalDayMinutes) {
      marker.description = { value: 'GoalDay', color: colors.info };
    } else if (i === averageMinutes) {
      marker.description = { value: 'TheAveragePersonStudies', color: colors.warning };
    } else if (i === bestMinutes) {
      marker.description = { value: 'BEST1', color: colors.success };
    }

    if (i <= learningMinutes) {
      marker.type = 'success';
    }

    markers.push(marker);
  }

  return markers;
}

export const timelineLegendItems: TimelineLegendItem[] = [
  {
    title: 'PenaltyZone',
    description: 'PenaltyZoneDescription',
    color: colors.error,
  },
  {
    title: 'TheAveragePersonStudies',
    description: 'TheAveragePersonStudiesDescription',
    color: colors.warning,
  },
  {
    title: 'BEST1',
    description: 'BEST1Description',
    color: colors.success,
  },
];
