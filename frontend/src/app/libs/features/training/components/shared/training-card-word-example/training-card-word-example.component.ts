import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonMoreComponent, IconComponent, JoinPipe, OnclickTranslationDirective, ProgressBarComponent } from '@app/libs/shared';
import { TrainingExampleSentence, TrainingKanjiExampleWord } from '@app/libs/core/models';
import { TranslateModule } from '@ngx-translate/core';
import { TippyDirective } from '@ngneat/helipopper';

@Component({
  selector: 'app-training-card-word-example',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent, ProgressBarComponent, JoinPipe, TranslateModule, TippyDirective, ButtonMoreComponent, OnclickTranslationDirective],
  templateUrl: './training-card-word-example.component.html',
  styleUrls: ['./training-card-word-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingCardWordExampleComponent {
  @Input() kanji?: TrainingKanjiExampleWord | null;
  @Input() sentence?: TrainingExampleSentence | null;
  @Input() showTranslate = true;
  @Input() showMore = true;

  @Output() clickMore = new EventEmitter<string>();
  @Output() clickPlay = new EventEmitter<string>();
}
