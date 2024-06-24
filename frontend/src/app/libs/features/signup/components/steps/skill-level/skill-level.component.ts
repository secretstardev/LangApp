import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { LanguageLevels } from '@app/libs/pages/auth/components/signup-page/signup-page.model';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/libs/shared';

@Component({
  selector: 'app-skill-level-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, StepHeaderComponent, ReactiveFormsModule, IconComponent],
  templateUrl: './skill-level.component.html',
  styleUrls: ['./skill-level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillLevelComponent extends BaseStepDirective {

  @Input()
  levels: LanguageLevels[];

  constructor() {
    super();
  }
}
