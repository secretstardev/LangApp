import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactSubmit } from '@app/libs/core/models/features/contact/contact.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactFieldsComponent } from '@app/libs/features/contact/components/contact-fields/contact-fields.component';
import { ContactFormConfig } from '@app/libs/features/contact/components/contact-form/contact-form.config';
import { User } from '@app/interfaces/common.interface';
import { MessageService } from 'primeng/api';

export type ContactForm = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  body: FormControl<string>;
  recaptcha: FormControl<string>;
}>;

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, InputTextareaModule, NgxCaptchaModule, ReactiveFormsModule, TranslateModule, ContactFieldsComponent],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {

  @Input() user: User;

  @Input() set result(isSuccess: boolean) {
    if (typeof isSuccess !== 'boolean') {
      return;
    }

    if (isSuccess) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.translateService.instant('Messages sent'),
        life: 3000
      });
      this.mainForm.reset(this.defaultForm.value);
      if (this.user) {
        this.resetUser();
      }
    } else {
      this.mainForm.reset(this.mainForm.value);
    }
    this.fieldsComponent.reloadCaptcha();
    this.cdr.detectChanges();
  }

  @Output() formSubmit = new EventEmitter<ContactSubmit>();

  @ViewChild('fieldsComponent') fieldsComponent: ContactFieldsComponent;

  fields = ContactFormConfig;

  protected mainForm: ContactForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    body: new FormControl('', [Validators.required]),
    recaptcha: new FormControl('', [Validators.required]),
  });

  private defaultForm = { ...this.mainForm };

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private translateService: TranslateService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.resetUser();
    }
  }

  private resetUser(): void {
    this.mainForm.patchValue({ ...this.user });
  }

  protected onSubmit(): void {
    this.formSubmit.emit(this.mainForm.getRawValue());
  }
}
