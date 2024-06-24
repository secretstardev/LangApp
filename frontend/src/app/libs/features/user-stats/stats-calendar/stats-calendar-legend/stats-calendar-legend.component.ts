import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { statsCalendarLegendItems } from '../stats-calendar.config';
import { StatsCalendarLegendItem } from '../stats-calendar.models';
import { IconComponent } from '@app/libs/shared';

@Component({
  selector: 'app-stats-calendar-legend',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent],
  templateUrl: './stats-calendar-legend.component.html',
  styleUrls: ['./stats-calendar-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCalendarLegendComponent {
  items = statsCalendarLegendItems;

  trackByFn: TrackByFunction<StatsCalendarLegendItem> = (index, item) => index;
}
