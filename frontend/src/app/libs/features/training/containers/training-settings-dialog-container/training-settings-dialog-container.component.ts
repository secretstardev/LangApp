import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogFooterComponent } from '@app/libs/shared';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { trainingSettingsAdditionalOptions, trainingSettingsIntensityOptions, trainingSettingsMainOptions } from './training-settings-dialog.config';
import { trainingSettingsAdditionalMockOptions, trainingSettingsIntensityMockOptions, trainingSettingsMainMockOptions } from './training-settings-dialog.mock';

@Component({
  selector: 'app-training-settings-dialog-container',
  standalone: true,
  imports: [CommonModule, TranslateModule, RadioButtonModule, ProgressSpinnerModule, ButtonModule, FormsModule, DialogFooterComponent, CheckboxModule],
  templateUrl: './training-settings-dialog-container.component.html',
  styleUrls: ['./training-settings-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingSettingsDialogContainerComponent {
  @HostBinding('class.typography') enableTypography = true;

  mainOptions = trainingSettingsMainOptions;
  selectedMainOptions = trainingSettingsMainMockOptions;

  additionalOptions = trainingSettingsAdditionalOptions;
  selectedAdditionalOptions = trainingSettingsAdditionalMockOptions;

  intensityOptions = trainingSettingsIntensityOptions;
  selectedIntensityOptions = trainingSettingsIntensityMockOptions;

  autoPlayAudio = true;
  isLoading = false;

  constructor(private ref: DynamicDialogRef) {}

  clickCancel() {
    this.ref.close();
  }

  clickApply() {
    this.ref.close();
  }
}
