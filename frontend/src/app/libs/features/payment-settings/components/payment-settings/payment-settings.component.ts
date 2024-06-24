import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePaymentComponent } from '@app/libs/features/base-payment/components/base-payment/base-payment.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { PaymentsTableModule } from '@app/common/payments-table/payments-table.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Tariff, User, UserPaymentMethod, UserPaymentMethodDetails } from '@app/interfaces/common.interface';
import { PaymentsTableComponent } from '@app/common/payments-table/payments-table.component';
import { ApiService } from '@app/services/api.service';
import { CustomValidator } from '@app/services/custom-validator';
import { Router, UrlSerializer } from '@angular/router';
import { SessionService } from '@app/services/session.service';
import { UserService } from '@app/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiError } from '@app/services/api-error';
import { PaymentTransactionRequestBody } from '@app/libs/core/models/features/payment/payment-setting.model';
import { SharedModule } from '@app/shared/shared.module';
import { IconComponent, IconType } from '@app/libs/shared';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from '@app/libs/features/confirm-dialog/confirm-dialog.component';
import { CustomDialogService } from '@app/services/custom-dialog.service';
import { PenaltyAmountPipe } from '@app/libs/features/user/pipes/penalty-period.pipe';

@UntilDestroy()
@Component({
  selector: 'app-payment-settings',
  standalone: true,
  imports: [CommonModule, BasePaymentComponent, ButtonModule,
    InputTextModule, MessageModule, MessagesModule, PaginatorModule, PaymentsTableModule,
    ProgressSpinnerModule, ReactiveFormsModule, SharedModule, ToolbarModule,
    TranslateModule, IconComponent, PenaltyAmountPipe],
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaymentSettingsComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  @Input()
  tryingToProlong = false;

  @Input() set paymentMethods(methods: UserPaymentMethod[]) {
    this._paymentMethods = methods;
    this.paymentMethodsDetails = methods?.map(method => {
      const parts = method.title.split(' ');
      return {
        id: method.id,
        icon: parts[0].toLowerCase() as IconType,
        cardNumber: `**** **** **** ${parts[2]}`,
        expiry: `${method.expMonth ?? '**'}/${method.expYear ?? '**'}`
      };
    });
  }

  @Input()
  user: User;

  @Input() set transactionRows(rows) {
    if (!(rows instanceof ApiError) && rows) {
      this.rows = rows.items;
      if (this.paymentsTable) {
        this.paymentsTable.isLoaded = true;
        this.paymentsTable.paginator.length = rows._meta.totalCount;
        this.paymentsTable.paginator.pageIndex = rows._meta.currentPage - 1;
        this.cdr.detectChanges();
      }
    }
  }

  @Output()
  removePaymentMethod: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  updateUser: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  pauseSubscription: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  updateRows: EventEmitter<PaymentTransactionRequestBody> = new EventEmitter<PaymentTransactionRequestBody>();

  @Output()
  updatePaymentMethods: EventEmitter<UserPaymentMethod[]> = new EventEmitter<UserPaymentMethod[]>();

  @Output()
  prolongSubscription: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(PaymentsTableComponent, { static: true }) paymentsTable: PaymentsTableComponent;

  private minVal = 100;

  newCardInputActive = false;
  enableBalanceTopup = false;
  showPaymentMethods = true;
  ref: DynamicDialogRef;

  paymentForm: UntypedFormGroup;

  rows: any;

  _paymentMethods: UserPaymentMethod[];
  paymentMethodsDetails: UserPaymentMethodDetails[];

  constructor(private api: ApiService,
              private customValidator: CustomValidator,
              private router: Router,
              private serializer: UrlSerializer,
              public session: SessionService,
              private userService: UserService,
              private messageService: MessageService,
              private translateService: TranslateService,
              private confirmationService: ConfirmationService,
              private customDialogService: CustomDialogService,
              private cdr: ChangeDetectorRef) {
  }

  protected readonly Tariff = Tariff;

  ngOnInit() {
    if (this.paymentsTable) {
      this.paymentsTable.isLoaded = false;
      this.cdr.detectChanges();

      this.paymentsTable.tableEvents.pipe(untilDestroyed(this)).subscribe((res: any) => {
        this.paymentsTable.isLoaded = false;
        this.paymentsTable.rows = [];
        if (res.type === 'page') {
          this.updateRows.emit({ page: res.data.pageIndex });
        }
        if (res.type === 'sort') {
          this.updateRows.emit({ page: 0, sort: res.data });
        }
        this.cdr.detectChanges();
      });
    }

    this.paymentForm = new UntypedFormGroup({
      amount: new UntypedFormControl('',
        { validators: [Validators.required, Validators.min(100)], updateOn: 'change' }),
    });

    this.updateRows.emit();
  }

  deletePaymentMethod(event: Event, id: number) {
    this.ref = this.customDialogService.open(ConfirmDialogComponent, {
      data: {
        hideCustomHeader: true,
        contentPadding: '24px',
        breakpoints: { '500px': '438px', '300px': '100vw' },
        input: {
          message: this.translateService.instant('Subscriptions.Popup.Delete')
        }
      },
      modal: true,
      dismissableMask: false,
      showHeader: false,
      styleClass: 'confirm-dialog'
    });

    this.ref.onClose.pipe(untilDestroyed(this)).subscribe((result) => {
      if (result) {
        this.removePaymentMethod.emit(id);
      }
    });
  }

  updateIsPaused() {
    const newIsServicePaused = !this.user.isServicePaused ? 1 : 0;
    let message: string;
    if (this.user.isServicePaused) {
      message = this.translateService.instant('Subscriptions.Popup.Enable');
      if (!this.user.isPaid) {
        message += ' ' + this.translateService.instant('Subscriptions.Popup.EnableChargeFee');
      }
    } else {
      message = this.translateService.instant('Subscriptions.Popup.Disable');
    }

    this.ref = this.customDialogService.open(ConfirmDialogComponent, {
      modal: true,
      data: {
        hideCustomHeader: true,
        contentPadding: '24px',
        breakpoints: { '900px': '40vw', '300px': '100vw' },
        input: {
          message
        }
      },
      dismissableMask: false,
      showHeader: false,
      styleClass: 'confirm-dialog'
    });

    this.ref.onClose.pipe(untilDestroyed(this)).subscribe((result) => {
      if (result) {
        this.pauseSubscription.emit(newIsServicePaused);
      }
    });
  }

  getError() {
    return this.customValidator.getErrors(this.paymentForm, 'amount') + ` ${this.minVal} `;
  }

  //todo: think about moving this to container
  onPayment() {
    const user = this.user;
    const urlTree = this.router.createUrlTree(['/pay/start'], {
      queryParams: {
        email: user?.email,
        userId: user?.id,
        amount: this.paymentForm.get('amount').value,
      },
    });
    const childWindow = window.open(this.api.apiHost + this.serializer.serialize(urlTree), '_blank');
    const interval = setInterval(() => {
      if (childWindow.closed) {
        clearInterval(interval);
        this.updateUser.emit();
      }
    }, 1000);
  }

  updateEditMode(isActive: boolean): void {
    this.newCardInputActive = isActive;
    this.cdr.detectChanges();
  }
}
