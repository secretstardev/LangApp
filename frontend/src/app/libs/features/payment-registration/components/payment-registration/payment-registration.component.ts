import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpConfiguration } from '@app/libs/pages/auth/components/signup-page/signup-page.config';
import { BasePaymentComponent } from '@app/libs/features/base-payment/components/base-payment/base-payment.component';
import { StepsComponent } from '@app/libs/features/steps/steps.component';
import { TranslateModule } from '@ngx-translate/core';
import { Tariff, User, UserPaymentMethod } from '@app/interfaces/common.interface';
import { PenaltyAmountPipe } from '@app/libs/features/user/pipes/penalty-period.pipe';

@Component({
  selector: 'app-payment-registration',
  standalone: true,
  imports: [CommonModule, BasePaymentComponent, StepsComponent, TranslateModule, PenaltyAmountPipe],
  templateUrl: './payment-registration.component.html',
  styleUrls: ['./payment-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaymentRegistrationComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  @Input()
  currency: string;

  @Input()
  penaltyAmount: number;

  @Input()
  user: User;

  @Output()
  paymentMethodsUpdated: EventEmitter<UserPaymentMethod[]> = new EventEmitter<UserPaymentMethod[]>();

  registrationConfig = SignUpConfiguration;
  paymentMethods: UserPaymentMethod[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly Tariff = Tariff;
}
