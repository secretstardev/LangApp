import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { MessageWithImageComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, NotFoundRoutingModule, MessageWithImageComponent, TranslateModule],
})
export class NotFoundModule {}
