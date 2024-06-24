import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from '@app/libs/pages/auth/components/signin/signin.component';
import { SignupPageComponent } from '@app/libs/pages/auth/components/signup-page/signup-page.component';
import { RestorePageComponent } from '@app/libs/pages/auth/components/restore-page/restore-page.component';
import { ApiService } from '@app/services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from '@app/libs/pages/auth/auth.component';
import { AuthRoutingModule } from '@app/libs/pages/auth/auth-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { StepsModule } from 'primeng/steps';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { TreeModule } from 'primeng/tree';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DragulaModule } from 'ng2-dragula';
import { IconComponent } from '@app/libs/shared';
import { SliderModule } from 'primeng/slider';
import {
  BulletPointComponent,
  ChoosePlanComponent,
  CostOfWordComponent,
  EmailFieldComponent,
  LanguagePreferencesComponent,
  NameFieldComponent,
  PasswordFieldComponent,
  PhoneFieldComponent,
  SignupSliderComponent,
  SkillLevelComponent,
  TopicsComponent,
} from '@app/libs/features/signup/components';
import { StepsComponent } from '@app/libs/features/steps/steps.component';
import { RestoreComponent } from '@app/libs/features/signin';
import { MessageErrorComponent } from '@app/libs/shared/components/messages/message-error/message-error.component';

@NgModule({
  declarations: [AuthComponent, SigninComponent, SignupPageComponent, RestorePageComponent],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule,
        StepsModule,
        IconModule,
        TreeModule,
        DialogModule,
        RadioButtonModule,
        DragulaModule.forRoot(),
        IconComponent,
        SliderModule,
        SignupSliderComponent,
        BulletPointComponent,
        ChoosePlanComponent,
        CostOfWordComponent,
        SkillLevelComponent,
        TopicsComponent,
        LanguagePreferencesComponent,
        EmailFieldComponent,
        PasswordFieldComponent,
        NameFieldComponent,
        PhoneFieldComponent,
        StepsComponent,
        RestoreComponent,
        MessageErrorComponent,
    ],
  providers: [ApiService],
})
export class AuthModule {}
