import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentPlans } from '@app/libs/pages/auth/components/signup-page/signup-page.model';
import checkBoxChecked from '@iconify/icons-carbon/checkmark-filled';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-choose-plan-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconModule, ReactiveFormsModule, TranslateModule, StepHeaderComponent, SkeletonModule],
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChoosePlanComponent extends BaseStepDirective implements OnInit {

  @Input()
  plans: PaymentPlans[];

  @Input()
  currencyValue: string;

  icons = {
    checkBoxChecked,
  };

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
