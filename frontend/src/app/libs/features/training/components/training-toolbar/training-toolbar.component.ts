import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent, ProgressBarComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteDrillsProgressPipe } from './complete-drills-progress.pipe';
import { DictionarySelectContainerComponent } from '@app/libs/features/dictionary';
import { DictionaryList } from '@app/libs/core/models';

@Component({
  selector: 'app-training-toolbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent, ProgressBarComponent, TranslateModule, CompleteDrillsProgressPipe, DictionarySelectContainerComponent],
  templateUrl: './training-toolbar.component.html',
  styleUrls: ['./training-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingToolbarComponent {
  @Input() drillsLength: number = 0;
  @Input() completedDrillsLength: number = 0;

  @Output() selectDictionary = new EventEmitter<DictionaryList>();
  @Output() clickSetting = new EventEmitter();
  @Output() hideQuestion = new EventEmitter();
}
