import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactField } from '@app/libs/core/models/features/contact/contact.model';
import { CustomValidator } from '@app/services/custom-validator';
import { ContactForm } from '@app/libs/features/contact';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-contact-fields',
  standalone: true,
  imports: [CommonModule, InputTextModule, InputTextareaModule, NgxCaptchaModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-fields.component.html',
  styleUrls: ['./contact-fields.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFieldsComponent implements OnInit {

  @Input()
  fields: ContactField[];

  @Input()
  form: ContactForm;

  @ViewChild('reCaptcha2Component') reCaptcha2Component: ReCaptcha2Component;

  constructor(public api: ApiService,
              private customValidator: CustomValidator,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  get language(): string {
    return localStorage.getItem('lang');
  }

  checkError(fieldName: string) {
    const field = this.form.get(fieldName);
    return (field.touched || field.dirty) && !field.valid;
  }

  getError(fieldName: string) {
    return this.customValidator.getErrors(this.form, fieldName);
  }

  reloadCaptcha(): void {
    this.reCaptcha2Component.reloadCaptcha();
  }

  success(): void {
    this.cdr.detectChanges();
  }
}
