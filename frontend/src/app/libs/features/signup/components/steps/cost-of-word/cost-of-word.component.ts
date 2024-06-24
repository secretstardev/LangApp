import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletPointComponent, SignupSliderComponent } from '@app/libs/features/signup/components';
import { ButtonModule } from 'primeng/button';
import { IconComponent } from '@app/libs/shared';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';

@Component({
  selector: 'app-cost-of-word-step',
  standalone: true,
  imports: [CommonModule, BulletPointComponent, ButtonModule, IconComponent, PaginatorModule, ReactiveFormsModule, SignupSliderComponent, TranslateModule, StepHeaderComponent],
  templateUrl: './cost-of-word.component.html',
  styleUrls: ['./cost-of-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostOfWordComponent extends BaseStepDirective implements OnInit {

  @Input()
  minValue: number;

  @Input()
  maxValue: number;

  @Input()
  currency: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
