import { isPlatformServer, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { environment } from '../../../../../../environments/environment';
import { UserPaymentMethod } from '@app/interfaces/common.interface';

enum LoadingStatus {
  Initial,
  Loading,
  Loaded,
  Error
}

@UntilDestroy()
@Component({
  selector: 'app-square-form',
  standalone: true,
  templateUrl: './square-form.component.html',
  imports: [
    TranslateModule,
    ButtonModule,
    CheckboxModule,
    NgIf
  ],
  styleUrls: ['./square-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareFormComponent implements OnInit {
  @Input()
  submitCardText: string;

  apiLoadingStatus = LoadingStatus.Initial;
  scriptUrl = '';
  applicationId = '';
  locationId = '';

  squarePayments: any;
  cardPaymentMethod: any;
  buttonEnabled = true;

  @ViewChild('cardContainer', { static: true }) cardContainer: ElementRef;
  @Output() updatedListEvent = new EventEmitter<UserPaymentMethod[]>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private api: ApiService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.scriptUrl = environment.square.env === 'sandbox' ?
      'https://sandbox.web.squarecdn.com/v1/square.js' :
      'https://web.squarecdn.com/v1/square.js';
    this.applicationId = environment.square[environment.square.env].applicationId;
    this.locationId = environment.square[environment.square.env].locationId;

    this.loadSquareApi();
  }

  loadSquareApi() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (window.hasOwnProperty('Square')) {
      this.apiLoadingStatus = LoadingStatus.Loaded;
      this.onApiLoaded();
    } else if (this.apiLoadingStatus === LoadingStatus.Initial) {
      this.apiLoadingStatus = LoadingStatus.Loading;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;

      script.src = this.scriptUrl;

      script.onload = () => {
        this.apiLoadingStatus = LoadingStatus.Loaded;
        this.onApiLoaded();
      };

      script.onerror = () => {
        this.apiLoadingStatus = LoadingStatus.Error;
        this.cdr.detectChanges();
      };

      document.body.appendChild(script);
    }
  }

  async onApiLoaded() {
    //@ts-ignore
    this.squarePayments = window.Square.payments(this.applicationId, this.locationId);
    this.reinitCardPaymentMethod();
    this.cdr.detectChanges();
  }

  async reinitCardPaymentMethod() {
    if (this.cardPaymentMethod != null) {
      await this.cardPaymentMethod.destroy();
    }

    this.cardPaymentMethod = await this.squarePayments.card();
    await this.cardPaymentMethod.attach(this.cardContainer.nativeElement);
  }

  async handlePaymentMethodSubmission(event: MouseEvent) {
    event.preventDefault();
    const paymentMethod = this.cardPaymentMethod;

    try {
      // disable the submit button as we await tokenization and make a payment request.
      this.buttonEnabled = false;
      const token = await this.tokenize(paymentMethod);
      await this.createPayment(token);
      this.buttonEnabled = true;
    } catch (e) {
      this.buttonEnabled = true;
      //displayPaymentResults('FAILURE');
      console.error(e.message);
    }
  }

  async tokenize(paymentMethod: any) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(
          tokenResult.errors
        )}`;
      }

      throw new Error(errorMessage);
    }
  }

  async createPayment(token: string) {
    this.api.addCardSquare({ nonce: token }).pipe(untilDestroyed(this)).subscribe((res) => {
      this.updatedListEvent.emit(res);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.translateService.instant('Payment method was successfully added')
      });
      this.reinitCardPaymentMethod();
    });
  }
}
