import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-training-card-word-use-in',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, TranslateModule],
  templateUrl: './training-card-word-use-in.component.html',
  styleUrls: ['./training-card-word-use-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardWordUseInComponent {
  @Input() kanji?: string;
  @Input() progress?: number;
  @Input() translate?: string;
}
