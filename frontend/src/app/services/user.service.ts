import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/interfaces/common.interface';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { EventService } from '@app/event.service';
import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { isPlatformServer } from '@angular/common';
import { randomFromRange } from '@app/shared/helpers';
import { Subscription } from 'rxjs';
import { UserActivityMediatorService } from './user-activity-mediator.service';
import { routingConfig } from '@app/libs/config';
import { APP_LANGUAGES } from '@app/constans/app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  public user$ = this.sessionService.user$;
  public lang$ = this.sessionService.lang$;
  public token$ = this.sessionService.token$;

  availableLanguages = APP_LANGUAGES;

  private interval: any;
  private userSubscription: Subscription;

  constructor(private http: HttpClient,
    private router: Router,
    private translateService: TranslateService,
    private eventService: EventService,
    private cookieService: CookieService,
    private api: ApiService,
    private sessionService: SessionService,
    @Inject(PLATFORM_ID) private platformId: any,
    private userActivityMediatorService: UserActivityMediatorService) {
    this.init();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  get apiHost(): string {
    return environment.apiUrl;
  }

  get language(): string {
    return this.lang$.value;
  }

  init() {
    const token = localStorage.getItem('token');
    this.token$.next(token);
    this.token$.subscribe((token) => {
      localStorage.setItem('token', token);
    });

    this.determineLanguage();

    const user = JSON.parse(localStorage.getItem('user'));
    this.user$.next(user);

    this.user$.subscribe((user) => {
      if (user?.language && this.lang$.value !== user?.language) {
        this._changeLanguage(user?.language);
      }
      localStorage.setItem('user', JSON.stringify(user));
    });

    if (this.user$.value) {
      this.api.refreshUserInfo();
    }

    // let savedAdmin = JSON.parse(localStorage.getItem('savedAdmin'));

    this.setUpSubscriptions();
    this.setUpUserSubscription();
  }

  determineLanguage() {
    let langVal = this.cookieService.get('language');
    // let langVal = localStorage.getItem('lang');
    if (!langVal) {
      const browserLangs = window.navigator.languages ?? [window.navigator.language];
      for (let browserLang of browserLangs) {
        browserLang = browserLang.slice(0, 2).toLowerCase();
        if (this.availableLanguages.indexOf(browserLang) !== -1) {
          langVal = browserLang;
          break;
        }
      }
    }
    if (!langVal) {
      langVal = 'en';
    }
    this.translateService.setDefaultLang('en');
    this._changeLanguage(langVal);
  }

  changeLanguage(newLanguage: string) {
    this._changeLanguage(newLanguage, true);

    if (this.user$.value !== null) {
      this.api.updateUser({ id: this.user$.value.id, language: newLanguage }).subscribe(() => {
      });
    }
  }

  _changeLanguage(newLanguage: string, fromUser = false) {
    if (newLanguage != this.lang$.value || fromUser) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 365 * 10);
      this.cookieService.put('language', newLanguage, { path: '/', expires: expires });
      this.translateService.use(newLanguage);
      this.eventService.emitChangeEvent({ type: 'language-change' });
      this.lang$.next(newLanguage);
    }
  }

  get isAdmin(): boolean {
    return this.user$.value?.isAdmin ?? false;
  }

  get openedAdmin() {
    return !!localStorage.getItem('savedAdmin');
  }

  _saveAdmin() {
    const _user = { ...this.user$.value };
    _user['accessToken'] = this.token$.value;
    localStorage.setItem('savedAdmin', JSON.stringify(_user));
  }

  openAsUser(user: User) {
    this._saveAdmin();
    this.user$.next(user);
    this.token$.next(user.accessToken);
    this.router.navigateByUrl('/');
  }

  checkInvitedByUrlParams() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('rr');
    if (value) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 180);
      this.cookieService.put('invitedByUserId', value, { path: '/', expires: expires });
    }
  }

  logout() {
    this.user$.next(null);
    this.token$.next(null);
    this.reloadAdmin();
    this.router.navigate([routingConfig.auth.signin.fullPath]);
  }

  reloadAdmin() {
    const savedAdminUser = JSON.parse(localStorage.getItem('savedAdmin'));
    if (savedAdminUser) {
      localStorage.removeItem('savedAdmin');
      this.user$.next(savedAdminUser);
    }
  }

  setUpSubscriptions() {
    let isFirstNavigation = true;
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        if (!isFirstNavigation && this.user$.value != null) {
          this.api.refreshUserInfo();
        }
        isFirstNavigation = false;
      }
    });
    this.interval = setInterval(async () => {
      if (this.user$.value != null) {
        this.api.refreshUserInfo();
      }
    }, randomFromRange(500, 600));

    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        const authToken = localStorage.getItem('token');
        if (authToken === 'null') {
          this.logout();
        }
      }
    }, false);
  }

  private setUpUserSubscription() {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.userActivityMediatorService.initializeActivityTracking();
        this.userActivityMediatorService.loadStoredActivityData();
      } else {
        this.userActivityMediatorService.cleanUpActivityTracking();
      }
    });
  }
}
