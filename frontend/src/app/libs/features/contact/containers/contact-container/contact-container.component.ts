import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForm, ContactFormComponent } from '@app/libs/features/contact';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactConfig } from '@app/libs/features/contact/containers/contact-container/contact.config';
import { User } from '@app/interfaces/common.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from '@app/services/user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { ContactSubmit } from '@app/libs/core/models/features/contact/contact.model';
import { ApiService } from '@app/services/api.service';

@UntilDestroy()
@Component({
  selector: 'app-contact-container',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, ButtonModule, InputTextModule, InputTextareaModule, NgxCaptchaModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactContainerComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  config = ContactConfig;
  user$: Observable<User>;
  submitRequest$: Observable<boolean>;

  constructor(private userService: UserService,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$.pipe(untilDestroyed(this));
  }

  handleSubmit(values: ContactSubmit): void {
    this.submitRequest$ = this.api.sendMessage(values).pipe(map(() => true), catchError(() => of(false)));
  }

}
