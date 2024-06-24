import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { PaymentRoutingModule } from '@app/libs/pages/payment/payment-routing.module';
import { PaymentPageComponent } from '@app/libs/pages/payment/payment-page.component';
import { PaymentsTableModule } from '@app/common/payments-table/payments-table.module';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../../../../environments/environment';
import { PaymentRegistrationPageComponent } from './components/payment-registration/payment-registration-page.component';
import { StepsComponent } from '@app/libs/features/steps/steps.component';
import { IconComponent } from '@app/libs/shared';
import { StripeFormComponent } from '@app/libs/features/base-payment/components/stripe-form/stripe-form.component';
import { SquareFormComponent } from '@app/libs/features/base-payment/components/square-form/square-form.component';
import { BasePaymentComponent } from '@app/libs/features/base-payment/components/base-payment/base-payment.component';
import { PaymentRegistrationGuard } from '@app/libs/pages/payment/guards/payment-registration-guard.service';
import { PaymentSettingsContainerComponent } from '@app/libs/features/payment-settings';
import {
  PaymentRegistrationContainerComponent
} from '@app/libs/features/payment-registration/containers/payment-registration-container/payment-registration-container.component';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  providers: [PaymentRegistrationGuard, DialogService],
  declarations: [PaymentPageComponent, PaymentRegistrationPageComponent],
  imports: [FormsModule, ReactiveFormsModule, TranslateModule.forChild(), CommonModule, PaymentRoutingModule, PaymentsTableModule, SharedModule, NgxStripeModule.forRoot(
    environment.stripe[environment.stripe.env].publishableKey), StepsComponent, IconComponent, StripeFormComponent, SquareFormComponent, BasePaymentComponent, PaymentSettingsContainerComponent, PaymentRegistrationContainerComponent],
})
export class PaymentModule {
}
