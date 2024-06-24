import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';
import { IntlTelInputNgModule } from 'intl-tel-input-ng';
import { IntlTelInputWrapperComponent } from '@app/libs/features/intl-tel-input/intl-tel-input-wrapper.component';

@Component({
  selector: 'app-phone-field-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, PaginatorModule, ReactiveFormsModule, TranslateModule, StepHeaderComponent, IntlTelInputNgModule, IntlTelInputWrapperComponent],
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneFieldComponent extends BaseStepDirective {
  @Input() checkError: (fieldName: string, onlyIfDirtyOrTouched?: boolean) => boolean;
  @Input() getErrors: (fieldName: string) => string;
  @Input() fieldName: string;
  @Input() country: string;

  constructor() {
    super();
  }

  skipStep(): void {
    this.control.setValue(undefined);
    this.completeStep();
  }
}
