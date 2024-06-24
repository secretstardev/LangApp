import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiError } from '@app/services/api-error';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@app/services/user.service';

const DEFAULT_NOTIFICATION_TIMEOUT = 9_000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private userService: UserService;

  constructor(private injector: Injector,
    private messageService: MessageService,
    private router: Router,
    private translateService: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(response: HttpErrorResponse, catchValidationErrors = true): Observable<HttpEvent<any>> {
    if (response.error instanceof ErrorEvent) {
      this.messageService.add({
        severity: 'error',
        summary: `${this.translateService.instant('Error')}: ${this.translateService.instant(
          'Unable to connect to server')}`,
        detail: response.error.message,
        life: DEFAULT_NOTIFICATION_TIMEOUT,
        sticky: false,
        closable: true,
      });
      return throwError(
        () => this._generalError(response, this.translateService.instant('Unable to connect to server.')));
    } else if (response.error) {
      if (response.error?.[0]) {
        if (catchValidationErrors) {
          const fieldsErrorText = response.error?.[0]?.message ? response.error.map((e) => e.message).join('\n') : '';
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('Error'),
            detail: this.translateService.instant(response.statusText) + '\n' + fieldsErrorText,
            life: DEFAULT_NOTIFICATION_TIMEOUT,
            sticky: false,
            closable: true,
          });
        }
        return throwError(() => new ApiError(response.error, response.ok, response.status, response.statusText));
      } else if (response.error.message) {
        if (response.error.status === 402) {
          this.router.navigate(['payment']);
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('Please check your payment details'),
            detail: this.translateService.instant('Payment required to continue using the service.'),
            life: DEFAULT_NOTIFICATION_TIMEOUT,
            sticky: false,
            closable: true,
          });
          return throwError(() => () => response);
          // return of(this._generalError(response, 'Payment required to continue using the service.'));
        }
        if (response.error.status === 401) {
          this.userService = this.injector.get(UserService);
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('Error'),
            detail: this.translateService.instant('Login expired'),
            life: DEFAULT_NOTIFICATION_TIMEOUT,
            sticky: false,
            closable: true,
          });
          this.userService.logout();
          return throwError(() => () => response);
        }
        this.messageService.add({
          severity: 'error',
          summary: `${this.translateService.instant('Error')}: ${response.error.message}`,
          detail: response.message,
          life: DEFAULT_NOTIFICATION_TIMEOUT,
          sticky: false,
          closable: true,
        });
      } else if (response.message) {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('Error'),
          detail: response.message,
          life: DEFAULT_NOTIFICATION_TIMEOUT,
          sticky: false,
          closable: true
        });
      }

      return throwError(() => this._generalError(response, ''));
    } else {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('Unknown error'),
        detail: response?.error?.toString(),
        life: DEFAULT_NOTIFICATION_TIMEOUT,
        sticky: false,
        closable: true,
      });
      return throwError(() => this._generalError(response, `${this.translateService.instant('Unknown error')}.`));
    }
  }

  _generalError(response: HttpErrorResponse, message: string) {
    return new ApiError(
      [{ field: 'all', message: message + '  Error: ' + (response?.error?.message ?? response.message) }], false,
      response.status, response.statusText, response.error);
  }
}
