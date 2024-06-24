import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getTimeLineMarkers, getTimeLineMarkersBaseParams } from '../timeline.config';
import { TranslateModule } from '@ngx-translate/core';
import { TimelineLegendComponent } from '..';
import { Activity } from '@app/libs/core/models';
import { TimelineMarker } from '@app/libs/features/user-stats/timeline/timeline.models';
import { Tariff, User } from '@app/interfaces/common.interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, TimelineLegendComponent],
})
export class TimelineComponent implements OnChanges {
  @Input() activity?: Activity;
  @Input() user?: User;

  markers?: { one: TimelineMarker[]; two: TimelineMarker[]; three: TimelineMarker[]; four: TimelineMarker[]; five: TimelineMarker[] };

  protected readonly Tariff = Tariff;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('activity' in changes) {
      const learningMinutes = Math.round((this.activity?.total_seconds || 0) / 60);
      const goalDayMinutes = Math.round((this.activity?.goal_seconds || 0) / 60);
      const timelineMarkers = getTimeLineMarkers({ ...getTimeLineMarkersBaseParams, learningMinutes, goalDayMinutes });
      this.markers = {
        one: timelineMarkers.slice(0, 5),
        two: timelineMarkers.slice(5, 6),
        three: timelineMarkers.slice(6, 10),
        four: timelineMarkers.slice(10, 11),
        five: timelineMarkers.slice(11),
      };
    }
  }

  trackByFn: TrackByFunction<TimelineMarker> = (index, item) => item.value;
}
