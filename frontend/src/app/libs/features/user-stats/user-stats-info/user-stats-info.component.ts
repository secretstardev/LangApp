import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserStats } from '@app/libs/core/models';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-user-stats-info',
  standalone: true,
  imports: [CommonModule, TranslateModule, SkeletonModule],
  templateUrl: './user-stats-info.component.html',
  styleUrls: ['./user-stats-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStatsInfoComponent {
  @Input() userStats?: UserStats;
}
