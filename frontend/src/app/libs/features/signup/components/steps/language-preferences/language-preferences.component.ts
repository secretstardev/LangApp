import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragulaModule } from 'ng2-dragula';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BaseStepDirective } from '@app/libs/features/signup/directives/base-step/base-step.component';
import { StepHeaderComponent } from '@app/libs/features/signup/components/step-header/step-header.component';
import { LanguageDraggableComponent } from '@app/libs/features/language-selector';
import { ReactiveFormsModule } from '@angular/forms';
import { InvalidControlDirective } from '@app/libs/shared';
import { Language } from '@app/interfaces/common.interface';

@Component({
  selector: 'app-language-preferences-step',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    DragulaModule,
    IconModule,
    InputTextModule,
    SharedModule,
    TranslateModule,
    StepHeaderComponent,
    LanguageDraggableComponent,
    ReactiveFormsModule,
    InvalidControlDirective,
  ],
  templateUrl: './language-preferences.component.html',
  styleUrls: ['./language-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagePreferencesComponent extends BaseStepDirective {
  @Input()
  languages: Language[] = [];

  @Input()
  selectedLanguages = [];

  @Input() checkError: (fieldName: string, onlyIfDirtyOrTouched?: boolean) => boolean;
  @Input() getErrors: (fieldName: string) => string;
  @Input() fieldName: string;

  constructor() {
    super();
  }
}
