import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingPageRoutingModule } from './training-page-routing.module';
import { DictionaryListContainerComponent } from '@app/libs/features/dictionary';
import { PageHeaderComponent } from '@app/libs/shared';
import { TrainingContainerComponent, TrainingStartContainerComponent } from '@app/libs/features/training';
import { TrainingMainPageComponent } from './training-main-page/training-main-page.component';
import { TrainingStartPageComponent } from './training-start-page/training-start-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TrainingMainPageComponent, TrainingStartPageComponent],
  imports: [CommonModule, TrainingPageRoutingModule, DictionaryListContainerComponent, PageHeaderComponent, TrainingContainerComponent, TrainingStartContainerComponent, TranslateModule],
})
export class TrainingPageModule {}
