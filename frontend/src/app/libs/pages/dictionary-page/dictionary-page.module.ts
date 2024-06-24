import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryPageRoutingModule } from './dictionary-page-routing.module';
import { DictionaryPageComponent } from './dictionary-page/dictionary-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { DictionaryContainerComponent, DictionaryListContainerComponent, DictionaryListFormContainerComponent } from '@app/libs/features/dictionary';
import { DictionaryListPageComponent } from './dictionary-list-page/dictionary-list-page.component';
import { ButtonModule } from 'primeng/button';
import { DictionaryFormPageComponent } from './dictionary-form-page/dictionary-form-page.component';
import { IconComponent, PageHeaderComponent } from '@app/libs/shared';
import { DictionaryPageHeaderPipe } from '@app/libs/pages/dictionary-page/dictionary-page/dictionary-page-header.pipe';

@NgModule({
  declarations: [DictionaryPageComponent, DictionaryListPageComponent, DictionaryFormPageComponent],
  imports: [
    CommonModule,
    DictionaryPageRoutingModule,
    TranslateModule.forChild(),
    DictionaryContainerComponent,
    DictionaryListContainerComponent,
    ButtonModule,
    IconComponent,
    PageHeaderComponent,
    DictionaryListFormContainerComponent,
    DictionaryPageHeaderPipe,
  ],
})
export class DictionaryPageModule {}
