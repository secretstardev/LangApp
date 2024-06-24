import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { ApiService } from '@app/services/api.service';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanactivateLogged } from '@app/guards/canactivate-logged';
import { CanactivateNologged } from '@app/guards/canactivate-nologged';
import { CustomPaginatorTranslator } from '@app/services/custom-paginator-translator';
import { CanactivateAdmin } from '@app/guards/canactivate-admin';
import { SessionService } from '@app/services/session.service';
import { CustomValidator } from '@app/services/custom-validator';
import { HttpInterceptorService } from '@app/http/http-interceptor';
import { ThemeModule } from '@app/theme/theme.module';
import {
  APP_BASE_HREF,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
  registerLocaleData
} from '@angular/common';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import localeRu from '@angular/common/locales/ru';
import { WebpackTranslateLoader } from './WebpackTranslateLoader';
import { CookieModule } from 'ngx-cookie';
import { IonicModule } from '@ionic/angular';
import { UserService } from './services/user.service';
import { ErrorInterceptor } from '@app/libs/core/services';
import { popperVariation, provideTippyConfig, tooltipVariation, withContextMenuVariation } from '@ngneat/helipopper';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { sticky } from 'tippy.js';
import { CustomDialogService } from '@app/services/custom-dialog.service';
import { DialogService } from 'primeng/dynamicdialog';
import { IntlTelInputNgModule } from 'intl-tel-input-ng';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
    BrowserAnimationsModule,
    ThemeModule,
    ConfirmDialogModule,
    CookieModule.withOptions(),
    IonicModule.forRoot(),
    IntlTelInputNgModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (pl: PlatformLocation) => pl.getBaseHrefFromDOM(),
      deps: [PlatformLocation],
    },
    SessionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => () => userService.checkInvitedByUrlParams(),
      deps: [UserService],
      multi: true,
    },
    ApiService,
    CustomDialogService,
    DialogService,
    CanactivateAdmin,
    CanactivateLogged,
    CanactivateNologged,
    CustomValidator,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorTranslator },
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    MessageService,
    ConfirmationService,
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomRouteReuseStrategy,
    // },
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: {
          ...tooltipVariation,
          arrow: true,
        },
        popper: popperVariation,
        contextMenu: withContextMenuVariation({
          ...tooltipVariation,
          sticky: true,
          plugins: [sticky],
          interactive: true,
        }),
        stickyArrow: {
          ...tooltipVariation,
          arrow: true,
          sticky: true,
          plugins: [sticky],
          interactive: true,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
