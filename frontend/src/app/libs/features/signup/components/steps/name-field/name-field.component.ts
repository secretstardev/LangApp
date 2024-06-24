import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';

@Component({
  selector: 'app-name-field-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, ReactiveFormsModule, SharedModule, TranslateModule, StepHeaderComponent],
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameFieldComponent extends BaseStepDirective {
  @Input() checkError: (fieldName: string, onlyIfDirtyOrTouched?: boolean) => boolean;
  @Input() getErrors: (fieldName: string) => string;
  @Input() fieldName: string;

  constructor() {
    super();
  }


}
