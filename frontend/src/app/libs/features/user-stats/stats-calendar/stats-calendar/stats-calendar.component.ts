import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCalendarLegendComponent } from '..';
import { StatsCalendarMock } from './stats-calendar.mock';
import { StatsCalendarDayColorPipe } from './stats-calendar-day-color.pipe';
import { DateLocaleComponent, IconComponent } from '@app/libs/shared/components';
import { statsCalendarLegendItemsColors } from '@app/libs/features/user-stats/stats-calendar/stats-calendar.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DateFormat } from '@app/libs/config';
import { map, startWith } from 'rxjs';
import { User } from '@app/interfaces/common.interface';
import { PenaltyAmountPipe } from '@app/libs/features/user';
import { StatsCalendarMonthPipe } from './stats-calendar-month.pipe';
import { TippyDirective } from '@ngneat/helipopper';
import { Activity } from '@app/libs/core/models';
import { NgLetDirective } from '@app/libs/shared';
import { StatsCalendarActivitiesPipe } from './stats-calendar-activities.pipe';
import { StatsCalendarTooltipPipe } from '@app/libs/features/user-stats/stats-calendar/stats-calendar/stats-calendar-tooltip.pipe';

@Component({
  selector: 'app-stats-calendar',
  standalone: true,
  imports: [
    CommonModule,
    StatsCalendarLegendComponent,
    StatsCalendarDayColorPipe,
    DateLocaleComponent,
    IconComponent,
    TranslateModule,
    PenaltyAmountPipe,
    StatsCalendarMonthPipe,
    TippyDirective,
    NgLetDirective,
    StatsCalendarActivitiesPipe,
    StatsCalendarTooltipPipe,
  ],
  templateUrl: './stats-calendar.component.html',
  styleUrls: ['./stats-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCalendarComponent {
  @Input() user?: User;
  @Input() activities?: Activity[];

  days = new StatsCalendarMock().statsCalendarDays;
  firstStatisticDay = new Date(this.days[0]);
  lastStatisticDay = new Date(this.days[this.days.length - 1]);

  lastFourMonths: Date[] = this.calculateLastFourMonths();
  missedColor = statsCalendarLegendItemsColors.missed;

  format?: DateFormat = 'd MMM y';

  lang$ = this.translate.onLangChange.pipe(
    map((val) => val.lang),
    startWith(this.translate.currentLang)
  );

  constructor(private translate: TranslateService) {}

  trackByFnDay: TrackByFunction<string> = (index, item) => index;
  trackByFnMonth: TrackByFunction<Date> = (index, item) => index;

  private calculateLastFourMonths(): Date[] {
    const today = new Date();
    const months = Array.from({ length: 4 }, (_, i) => new Date(today.getFullYear(), today.getMonth() - i, 1)).reverse();
    return months;
  }
}
