import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { KanjiInfo } from '@app/libs/core/models';
import { ButtonMoreComponent, IconComponent, JoinPipe, ProgressBarComponent } from '@app/libs/shared';
import { TippyDirective } from '@ngneat/helipopper';

@Component({
  selector: 'app-training-card-word-kanji',
  standalone: true,
  imports: [CommonModule, ButtonModule, SharedModule, TranslateModule, ProgressBarComponent, TippyDirective, JoinPipe, IconComponent, ButtonMoreComponent],
  templateUrl: './training-card-word-kanj.component.html',
  styleUrls: ['./training-card-word-kanj.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardWordKanjComponent {
  @Input() item?: KanjiInfo;

  @Output() clickMore = new EventEmitter<string>();
}
