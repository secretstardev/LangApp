import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';

@Component({
  selector: 'app-email-field-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, PaginatorModule, ReactiveFormsModule, TranslateModule, StepHeaderComponent],
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFieldComponent extends BaseStepDirective {

  @Input() checkError: (fieldName: string, onlyIfDirtyOrTouched?: boolean) => boolean;
  @Input() getErrors: (fieldName: string) => string;
  @Input() fieldName: string;

  constructor() {
    super();
  }
}
