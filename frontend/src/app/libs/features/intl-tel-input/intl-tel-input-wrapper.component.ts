import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlTelInputComponent, IntlTelInputNgModule, IntlTelInputOptions } from 'intl-tel-input-ng';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseCvaControl } from '@app/libs/shared';

export interface TelephoneInputValue {
  actualValue: string;
  e164Number?: string;
}

@Component({
  selector: 'app-intl-tel-input',
  standalone: true,
  imports: [CommonModule, IntlTelInputNgModule, FormsModule],
  templateUrl: './intl-tel-input-wrapper.component.html',
  styleUrls: ['./intl-tel-input-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IntlTelInputWrapperComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: IntlTelInputWrapperComponent,
      multi: true,
    },
  ],
})
export class IntlTelInputWrapperComponent extends BaseCvaControl<TelephoneInputValue> implements AfterViewInit {
  @Input()
  cssClass: string;

  @Input()
  labelCssClass: string;

  @Input()
  required: boolean;

  @Input()
  options: IntlTelInputOptions;

  private _isValid = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  @ViewChild('phoneNumberField')
  phoneNumberField: IntlTelInputComponent;

  ngAfterViewInit() {
    this.setPhoneNumberValue();
  }

  setPhoneNumberValue(): void {
    setTimeout(() => {
      this.control.value?.actualValue?.length > 0 && this.phoneNumberField.intlTelInput.setNumber(this.control.value.actualValue);
    });
  }

  onPhoneNumberUpdate(complete): void {
    this._isValid = !!complete;
    if (this.phoneNumberField?.phoneNumber?.length > 0) {
      this.control.setValue(
        {
          actualValue: this.phoneNumberField.phoneNumber,
          e164Number: complete || undefined,
        },
        { emitEvent: true }
      );
    } else {
      this.control.setValue(null);
    }

    this.cdr.detectChanges();
  }

  /* internal */
  writeValue(value: TelephoneInputValue) {
    if (this.phoneNumberField) {
      this.setPhoneNumberValue();
    }
    this._isValid = !!value?.e164Number;
    this.control.setValue(value, { emitEvent: false });
    this.onTouched();
  }
}
