import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PaymentRegistrationComponent
} from '@app/libs/features/payment-registration/components/payment-registration/payment-registration.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from '@app/services/api.service';
import { DEFAULT_CURRENCY } from '@app/content/materials/common/constant';
import { Tariff, User, UserPaymentMethod } from '@app/interfaces/common.interface';
import { routingConfig } from '@app/libs/config';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-payment-registration-container',
  standalone: true,
  imports: [CommonModule, PaymentRegistrationComponent],
  templateUrl: './payment-registration-container.component.html',
  styleUrls: ['./payment-registration-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentRegistrationContainerComponent implements OnInit {

  currency = DEFAULT_CURRENCY;
  penaltyAmount: number;
  user: User;

  constructor(private apiService: ApiService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.apiService.usersMe().pipe(untilDestroyed(this)).subscribe(user => {
      this.user = user;
      if (user.currency) {
        this.currency = user.currency;
      }

      this.penaltyAmount = user.tariff === Tariff.FREE ? user.penaltyAmount : user.tariffAmount;
      this.cdr.detectChanges();
    });
  }

  onPaymentMethodsUpdated(paymentMethods: UserPaymentMethod[]): void {
    if (paymentMethods?.length > 0) {
      this.router.navigate([routingConfig.payment.path]);
    }
  }
}
