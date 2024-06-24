import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router } from '@angular/router';
import { ApiError } from '@app/services/api-error';
import { FieldError } from '@app/interfaces/common.interface';
import { CustomValidator } from '@app/services/custom-validator';
import { SessionService } from '@app/services/session.service';
import { catchError, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
@UntilDestroy()
export class SigninComponent implements OnInit {
  constructor(private api: ApiService,
              private customValidator: CustomValidator,
              private messageService: MessageService,
              private formBuilder: UntypedFormBuilder,
              private router: Router,
              private sessionService: SessionService) {
  }

  @HostBinding('class.typography') enableTypography = true;

  signinForm: UntypedFormGroup;
  errors: FieldError[] = [];

  isLoaded = true;

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, CustomValidator.confirmEmailPattern], updateOn: 'blur' }],
      password: ['', { validators: [Validators.required], updateOn: 'change' }],
    });
  }

  onSubmit() {
    this.errors = [];
    this.isLoaded = false;
    this.api.login(this.signinForm.value).pipe(catchError(err => of(err))).subscribe((res) => {
      if (res instanceof ApiError) {
        this.errors = res.error;
        this.isLoaded = true;
      } else {
        this.messageService.clear();
        (<any>window).router = this.router;
        this.sessionService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
          if (user) {
            this.router
                .navigate(['/content/materials'])
                .then((e) => {
                  console.log('router navigate', e);
                })
                .catch((e) => {
                  console.log('router navigate error', e);
                });

            window.postMessage({ type: 'LoginSuccess', text: 'Login' }, '*');
          }
        });
      }
    });
  }

  getErrors(fieldName: string): string {
    return this.customValidator.getErrors(this.signinForm, fieldName);
  }

  checkError(fieldName: string) {
    let field = this.signinForm.get(fieldName);
    return (field.touched || field.dirty) && !field.valid;
  }
}
