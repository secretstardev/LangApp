import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatDatePipe } from '@app/pipes/format-date.pipe';
import { FormatNumbersPipe } from '@app/pipes/format-numbers.pipe';
import { MatIconModule } from '@angular/material/icon';
import { RoundToPipe } from '@app/pipes/round-to.pipe';
import { FormatCurrencyPipe } from '@app/pipes/format-currency.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { SlideMenuModule } from 'primeng/slidemenu';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OnclickTranslationDirective } from './onclick-translation.directive';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { AsPipe } from '../pipes/as.pipe';
import { InplaceModule } from 'primeng/inplace';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormatDurationPipe } from '@app/pipes/format-duration.pipe';
import { LocalizedMultiSelectComponent } from '@app/shared/localized-multi-select/localized-multi-select.component';
import { MatLegacySnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule } from '@angular/material/legacy-paginator';

const sharedModules = [
  // primeng
  InputTextModule,
  InputTextareaModule,
  ButtonModule,
  MessagesModule,
  MessageModule,
  DropdownModule,
  ToggleButtonModule,
  ProgressSpinnerModule,
  BadgeModule,
  SlideMenuModule,
  PaginatorModule,
  ChipModule,
  ToastModule,
  TagModule,
  TableModule,
  DividerModule,
  CheckboxModule,
  ConfirmDialogModule,
  MultiSelectModule,
  ToolbarModule,
  PasswordModule,
  TooltipModule,
  ProgressBarModule,
  InplaceModule,

  // material
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatLegacySnackBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatLegacyTableModule,
  MatLegacyPaginatorModule,
  MatRadioModule,
];

const sharedComponents = [
  FormatDurationPipe,
  FormatDatePipe,
  FormatNumbersPipe,
  RoundToPipe,
  FormatCurrencyPipe,
  OnclickTranslationDirective,
  AsPipe,
  LocalizedMultiSelectComponent,
  ProgressCircleComponent,
  SvgIconComponent
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedComponents, ...sharedModules],
})
export class SharedModule {
}
