import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User, UserPaymentMethod } from '@app/interfaces/common.interface';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SharedModule } from 'primeng/api';
import { CustomValidator } from '@app/services/custom-validator';
import { SessionService } from '@app/services/session.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InplaceModule } from 'primeng/inplace';
import { SquareFormComponent } from '@app/libs/features/base-payment/components/square-form/square-form.component';
import { StripeFormComponent } from '@app/libs/features/base-payment/components/stripe-form/stripe-form.component';

@UntilDestroy()
@Component({
  selector: 'app-base-payment',
  standalone: true,
  imports: [CommonModule, ButtonModule, InplaceModule, SharedModule, TranslateModule, SquareFormComponent, StripeFormComponent],
  templateUrl: './base-payment.component.html',
  styleUrls: ['./base-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasePaymentComponent implements OnInit {

  @Input()
  submitCardText = 'Continue';

  @Input()
  allowSaveCardData: boolean;

  @Input() set paymentMethods(value) {
    this.isActive = value && value.length === 0;
    this.activated.emit(this.isActive);
    this.cdr.detectChanges();
  }

  @Input()
  user: User;

  @Output()
  paymentMethodsUpdated: EventEmitter<UserPaymentMethod[]> = new EventEmitter<UserPaymentMethod[]>();

  @Output()
  activated: EventEmitter<boolean> = new EventEmitter<boolean>();

  private minVal = 100;

  enableSquare = false;
  enableStripe = true;
  isActive = false;

  paymentForm: UntypedFormGroup;

  constructor(private customValidator: CustomValidator,
              public session: SessionService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.paymentForm = new UntypedFormGroup({
      amount: new UntypedFormControl('',
        { validators: [Validators.required, Validators.min(100)], updateOn: 'change' }),
    });
  }

  receiveUpdatedPaymentMethods(updatedList: UserPaymentMethod[]) {
    this.paymentMethodsUpdated.emit(updatedList);
  }

  getError() {
    return this.customValidator.getErrors(this.paymentForm, 'amount') + ` ${this.minVal} `;
  }

  activate(): void {
    this.isActive = true;
    this.activated.emit(true);
  }
}
