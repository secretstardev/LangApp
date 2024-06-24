import { Component, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-payment-registration',
  templateUrl: './payment-registration-page.component.html',
  styleUrls: ['./payment-registration-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentRegistrationPageComponent {
  constructor() {
  }
}
