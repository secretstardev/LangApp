import { ChangeDetectionStrategy, Component, EventEmitter, Output, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { TrainingCompleteWhatNext, trainingCompleteWhatNext, TrainingCompleteWhatNextType } from './training-complete.config';

@Component({
  selector: 'app-training-complete',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './training-complete.component.html',
  styleUrls: ['./training-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCompleteComponent {
  @Output() linkClick = new EventEmitter<TrainingCompleteWhatNextType>();

  trainingCompleteWhatNext = trainingCompleteWhatNext;

  trackByFn: TrackByFunction<TrainingCompleteWhatNext> = (index, item) => item.id;
}
