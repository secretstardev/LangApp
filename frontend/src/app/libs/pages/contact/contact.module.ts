import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from '@app/libs/pages/contact/contact-page/contact-page.component';
import { ContactRoutingModule } from '@app/libs/pages/contact/contact-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ContactContainerComponent } from '@app/libs/features/contact';

@NgModule({
  declarations: [ContactPageComponent],
  exports: [
    ContactPageComponent
  ],
    imports: [FormsModule, ReactiveFormsModule, TranslateModule, NgxCaptchaModule, CommonModule, ContactRoutingModule,
        SharedModule, ContactContainerComponent]
})
export class ContactModule {}
