import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-training-card-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './training-card-list.component.html',
  styleUrls: ['./training-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardListComponent {
  @Input() leftTitle?: string;
  @Input() rightTitle?: string;
}
