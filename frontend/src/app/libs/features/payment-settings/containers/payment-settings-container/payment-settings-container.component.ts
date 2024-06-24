import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PaymentSettingsComponent } from '@app/libs/features/payment-settings';
import { ApiService } from '@app/services/api.service';
import { MessageService } from 'primeng/api';
import { UserService } from '@app/services/user.service';
import { User, UserPaymentMethod } from '@app/interfaces/common.interface';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PaymentTransactionRequestBody } from '@app/libs/core/models/features/payment/payment-setting.model';

@UntilDestroy()
@Component({
  selector: 'app-payment-settings-container',
  standalone: true,
  imports: [CommonModule, PaymentSettingsComponent],
  templateUrl: './payment-settings-container.component.html',
  styleUrls: ['./payment-settings-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSettingsContainerComponent implements OnInit {
  tryingToProlong = false;
  transactionRows: Observable<any>;
  paymentMethods: UserPaymentMethod[];
  user: User;

  constructor(private api: ApiService,
              private messageService: MessageService,
              private userService: UserService,
              private translateService: TranslateService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;
      this.cdr.detectChanges();
    });

    this.refreshPaymentMethods();
  }

  tryProlongIfNeed() {
    if (!this.tryingToProlong && this.paymentMethods && this.paymentMethods.length > 0 && !this.user?.isPaid) {
      this.prolongSubscription();
    }
  }

  prolongSubscription() {
    this.tryingToProlong = true;
    this.api.prolongSubscription().subscribe((r) => {
      this.messageService.add(
        {
          severity: r.status ? 'success' : 'error',
          summary: r.status ? 'Success' : 'Error',
          detail: this.translateService.instant(r.message)
        });
      if (r.user) {
        this.userService.user$.next(r.user);
        this.tryingToProlong = false;
        this.cdr.detectChanges();
      }
      if (r.status) {
        this.getRows();
        this.refreshPaymentMethods();
      }
    });
  }

  removePaymentMethod(id: number): void {
    this.api.deletePaymentMethod(id).subscribe((paymentMethods) => {
      this.paymentMethods = paymentMethods;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.translateService.instant('Payment method was deleted'),
      });
      this.cdr.detectChanges();
    });
  }

  // for local sync
  updatePaymentMethods(paymentMethods: UserPaymentMethod[]): void {
    this.paymentMethods = paymentMethods;
    this.tryProlongIfNeed();
    this.cdr.detectChanges();
  }

  refreshPaymentMethods(): void {
    this.api.getUserPaymentMethods().subscribe((paymentMethods) => {
      this.paymentMethods = paymentMethods;
      this.cdr.detectChanges();
    });
  }

  getRows(requestBody?: PaymentTransactionRequestBody) {
    this.transactionRows = this.api.getUserTransactionsList(requestBody?.page ?? 0, requestBody?.sort ?? {})
                               .pipe(untilDestroyed(this));
  }

  updateUser() {
    this.api.usersMe().subscribe(() => {
    });
  }

  pauseSubscription(shouldPause: number): void {
    this.api.updateUser({ id: this.user.id, isServicePaused: shouldPause }).subscribe((user) => {
      this.userService.user$.next(user);
      const text = this.translateService.instant(
        user.isServicePaused ?
          'Subscription disabled.' :
          'Subscription enabled.');
      this.messageService.add({
        severity: user.isServicePaused ? 'info' : 'success',
        summary: text,
        detail: text
      });
      this.cdr.detectChanges();
    });
  }
}
