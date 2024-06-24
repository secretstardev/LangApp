import { ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';

import * as jstz from 'jstz';
import { CustomValidator } from '@app/services/custom-validator';
import { ApiError } from '@app/services/api-error';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { SessionService } from '@app/services/session.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Category, Language } from '@app/interfaces/common.interface';
import { getCountryForTimezone } from 'countries-and-timezones';
import { IconService } from '@abhinavakhil/iconify-angular';
import flagIcons from '@app/common/icons-flag';
import { SignUpConfiguration } from '@app/libs/pages/auth/components/signup-page/signup-page.config';
import { routingConfig } from '@app/libs/config';
import { catchError, of } from 'rxjs';
import { TelephoneInputValue } from '@app/libs/features/intl-tel-input/intl-tel-input-wrapper.component';
import { cloneDeep } from 'lodash';

type SignUpForm = FormGroup<{
  name: FormControl<string>;
  telephone: FormControl<TelephoneInputValue>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordRepeat: FormControl<string>;
  languageLevel: FormControl<number>;
  languages: FormControl<any>;
  penaltyAmount: FormControl<number>;
  favoriteCategoryId: FormControl<string>;
  tariff: FormControl<string>;
}>;

@UntilDestroy()
@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;
  config = cloneDeep(SignUpConfiguration);
  signupForm: SignUpForm;
  errors: any[] = [];
  quickSignup = false;
  routingConfig = routingConfig;

  activeStep = 0;

  languageToLearn = 'ja';
  categories: Category[];
  availableLanguages: Language[] = [];
  selectedLanguages = [];
  languageOptions = [];
  languageSearch = '';

  currency = 'EUR';

  timezone: string;
  country: string;

  constructor(
    private api: ApiService,
    private customValidator: CustomValidator,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private sessionService: SessionService,
    iconService: IconService
  ) {
    iconService.registerAll(flagIcons);
  }

  ngOnInit() {
    this.timezone = this.detectTimezone();
    this.country = getCountryForTimezone(this.timezone).id.toLowerCase();
    this.signupForm = this.formBuilder.group(
      {
        //timezone: [this.getTimezone() || ''],
        //language: [this.getLanguage() || ''],
        //invitedByUserId: [this.getInvitedByUserId() || ''],
        name: ['', { validators: [Validators.required], updateOn: 'change' }],
        //company: [''],
        telephone: [
          '',
          {
            asyncValidators: [CustomValidator.debouncedAsyncValidator(CustomValidator.confirmPhoneValue)],
            updateOn: 'change',
          },
        ],
        email: [
          '',
          {
            validators: [Validators.required],
            asyncValidators: [CustomValidator.debouncedAsyncValidator(CustomValidator.confirmEmailPattern)],
            updateOn: 'change',
          },
        ],
        password: [
          '',
          {
            validators: [Validators.required, CustomValidator.confirmPasswordRulesCheck],
            updateOn: 'change',
          },
        ],
        passwordRepeat: ['', { validators: this.quickSignup ? [] : [Validators.required], updateOn: 'change' }],
        languageLevel: [''],
        languages: ['', { validators: [Validators.required], updateOn: 'change' }],
        penaltyAmount: this.config.steps[1].extendedAttributes.minValue,
        favoriteCategoryId: [''],
        tariff: [''],
      },
      {
        validators: this.quickSignup ? [] : [CustomValidator.confirmPasswordCheck, (form) => CustomValidator.fillFromApiErrors(form, this.errors)],
      }
    );
    this.signupForm.get('name').valueChanges.subscribe((value) => {
      // console.trace('name', value, this.signupForm.get('name').errors);
    });
    this.signupForm.get('name').statusChanges.subscribe((value) => {
      // console.trace('name', value, this.signupForm.get('name').errors);
    });
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (params['email']) {
        this.signupForm.get('email').setValue(params['email']);
      }
    });
    this.api.getAllTariffs().subscribe((tariffs) => {
      this.currency = tariffs.currency;
      tariffs.tariffList.forEach((tariff) => {
        const planToUpdate = this.config.plans.find((plan) => plan.id === tariff.id);
        planToUpdate.totalPrice.price = tariff.amount;
      });
      this.config.plans = [...this.config.plans];
      this.cdr.detectChanges();
    });

    this.api.getAllCategories({ 'per-page': '100' }).subscribe((c) => {
      this.categories = c.items;
    });

    this.api.getAllLanguage().subscribe((languages) => {
      this.availableLanguages = languages.items.slice(0);

      // move current browser language to the top
      const browserLangs = window.navigator.languages ?? [window.navigator.language];
      const newLanguages: Language[] = [];
      for (const browserLang of browserLangs) {
        const browserLang2 = browserLang.substring(0, 2);
        if (browserLang !== this.languageToLearn || browserLang2 != this.languageToLearn) {
          let langIndex = this.availableLanguages.findIndex((l) => l.code == browserLang);
          if (langIndex === -1) {
            langIndex = this.availableLanguages.findIndex((l) => l.code == browserLang2);
          }
          if (langIndex !== -1) {
            const langValue = this.availableLanguages[langIndex];
            if (!newLanguages.includes(langValue)) {
              this.availableLanguages.splice(langIndex, 1)[0];
              this.availableLanguages.splice(newLanguages.length, 0, langValue);
              newLanguages.push(langValue);
            }
          }
        }
      }
      this.signupForm.get('languages').setValue(newLanguages.map((l) => l.code));
      this.selectedLanguages = newLanguages.map((lang) => lang.code);
    });

    const param: string = this.route.snapshot.queryParams.tariff;
    if (param && this.config.plans.some((plan) => plan.slug === param)) {
      this.setPaymentPlan(this.config.plans.findIndex((plan) => plan.slug === param));
    }
  }

  setValue(fieldName: string, value: any, moveToNextStep = true) {
    this.signupForm.get(fieldName).setValue(value);
    if (moveToNextStep) {
      this.nextStep();
    }
  }

  prevStep() {
    this.activeStep--;
    while (this.config?.steps[this.activeStep].condition && this.activeStep > 0 && !this.config?.steps[this.activeStep].condition(this.signupForm)) {
      this.activeStep--;
    }

    if (this.activeStep < 0) {
      this.activeStep = 0;
    }
  }

  nextStep() {
    this.activeStep++;
    while (this.config?.steps[this.activeStep]?.condition && this.activeStep < this.config?.steps.length && !this.config?.steps[this.activeStep].condition(this.signupForm)) {
      this.activeStep++;
    }

    if (this.activeStep >= this.config?.steps.length) {
      this.activeStep = this.config?.steps.length - 1;
    }

    if (this.activeStep === 9) {
      this.submit();
    }
  }

  detectTimezone() {
    let timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;
    if (!timezone) {
      const tz = jstz.determine();
      timezone = tz.name();
    }
    return timezone;
  }

  getLanguage() {
    return this.sessionService.language;
  }

  getInvitedByUserId(): number {
    return parseInt(this.cookieService.get('invitedByUserId'));
  }

  setPaymentPlan(index: number): void {
    this.signupForm.patchValue({
      tariff: this.config.plans[index]?.slug,
    });
    this.nextStep();
  }

  submit() {
    this.errors = [];
    const data = {
      ...this.signupForm.value,
      invitedByUserId: this.getInvitedByUserId(),
      language: this.getLanguage(),
      timezone: this.timezone,
      telephone: this.signupForm.get('telephone').value?.e164Number,
      currency: this.currency,
    };
    this.api
      .signUp(data)
      .pipe(catchError((err) => of(err)))
      .subscribe((res) => {
        if (res instanceof ApiError) {
          this.errors = res.error;
          CustomValidator.fillFromApiErrors(this.signupForm, this.errors);
          const errorsByField = this.api.groupErrorsByField(res.error);
          stepsLoop: for (const step of this.config.steps) {
            for (const field of step.fields) {
              if (errorsByField[field]) {
                this.activeStep = this.config.steps.indexOf(step);
                break stepsLoop;
              }
            }
          }
          if (this.activeStep === this.config.steps.length - 1) {
            this.activeStep = 0;
          }
        } else {
          this.router.navigate([this.routingConfig.payment.registration.fullPath]);

          window.postMessage({ type: 'LoginSuccess', text: 'Login' }, '*');
        }
      });
  }

  getErrors(fieldName: string): string {
    return this.customValidator.getErrors(this.signupForm, fieldName);
  }

  checkError(fieldName: string, onlyIfDirtyOrTouched = true) {
    const field = this.signupForm.get(fieldName);
    return (!onlyIfDirtyOrTouched || field.dirty || field.touched) && !field.valid && !field.pending;
  }

  updateLanguages(newLanguages: string[]): void {
    this.selectedLanguages = newLanguages;
  }
}
