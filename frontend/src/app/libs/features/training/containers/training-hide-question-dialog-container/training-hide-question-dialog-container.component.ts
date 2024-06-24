import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogFooterComponent } from '@app/libs/shared';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TrainingHideQuestionOption, trainingHideQuestionOptions } from './training-hide-question-dialog.config';

@Component({
  selector: 'app-training-hide-question-dialog-container',
  standalone: true,
  imports: [CommonModule, TranslateModule, RadioButtonModule, ProgressSpinnerModule, ButtonModule, FormsModule, DialogFooterComponent],
  templateUrl: './training-hide-question-dialog-container.component.html',
  styleUrls: ['./training-hide-question-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingHideQuestionDialogContainerComponent {
  @HostBinding('class.typography') enableTypography = true;

  hidingReasons: TrainingHideQuestionOption[] = [];
  isLoading: boolean = false;
  selectedHidingReason?: string;

  constructor(private ref: DynamicDialogRef, private dialogConfig: DynamicDialogConfig) {
    this.hidingReasons = trainingHideQuestionOptions(this.dialogConfig.data.isAudioQuestion);
  }

  clickCancel() {
    this.ref.close();
  }

  clickApply() {
    this.ref.close();
  }
}
