import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { timelineLegendItems } from '../timeline.config';
import { TimelineLegendItem } from '../timeline.models';
import { PenaltyAmountPipe } from '@app/libs/features/user';
import { Tariff, User } from '@app/interfaces/common.interface';

@Component({
  selector: 'app-timeline-legend',
  standalone: true,
  imports: [CommonModule, TranslateModule, PenaltyAmountPipe],
  templateUrl: './timeline-legend.component.html',
  styleUrls: ['./timeline-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineLegendComponent implements OnChanges {
  @Input() user?: User;

  items = timelineLegendItems;

  ngOnChanges(changes: SimpleChanges) {
    if ('user' in changes && this.user) {
      this.items = this.user.tariff === Tariff.FREE ? timelineLegendItems : timelineLegendItems.slice(1);
    }
  }

  trackByFn: TrackByFunction<TimelineLegendItem> = (index, item) => index;
}
