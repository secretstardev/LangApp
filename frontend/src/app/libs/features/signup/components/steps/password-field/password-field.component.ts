import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';

@Component({
  selector: 'app-password-field-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, PasswordModule, ReactiveFormsModule, TranslateModule, StepHeaderComponent],
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PasswordFieldComponent extends BaseStepDirective {
  @Input() checkError: (fieldName: string, onlyIfDirtyOrTouched?: boolean) => boolean;
  @Input() getErrors: (fieldName: string) => string;

  constructor() {
    super();
  }

}
