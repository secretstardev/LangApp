import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentPageComponent } from '@app/libs/pages/payment/payment-page.component';
import {
  PaymentRegistrationPageComponent
} from '@app/libs/pages/payment/components/payment-registration/payment-registration-page.component';
import { PaymentRegistrationGuard } from '@app/libs/pages/payment/guards/payment-registration-guard.service';

const paymentsRoutes = [
  {
    path: '',
    component: PaymentPageComponent,
    data: {
      breadcrumb: 'Payment'
    }
  },
  {
    path: 'registration',
    component: PaymentRegistrationPageComponent,
    canActivate:[PaymentRegistrationGuard]
  }
  /*{
    path: 'success',
    component: SuccessComponent,
    data: {
      breadcrumb: 'Payment success'
    }
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(paymentsRoutes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
