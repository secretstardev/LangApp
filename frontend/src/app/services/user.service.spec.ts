import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SessionService } from './session.service';
import { ActivityService } from './activity.service';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { CookieModule } from 'ngx-cookie';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('UserService', () => {
  let userService: UserService;
  let sessionService: SessionService;
  let activityService: ActivityService;
  let httpTestingController: HttpTestingController;

  class MockApiService {
    get() {}
    post() {}
  }

  class MockTranslateService {
    setDefaultLang(lang: string) {}
    instant() {
      return '';
    }
    use(lang: string) {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CookieModule.forRoot(), RouterModule, RouterTestingModule],
      providers: [UserService, SessionService, ActivityService, { provide: ApiService, useClass: MockApiService }, { provide: TranslateService, useClass: MockTranslateService }, CookieService, { provide: ActivatedRoute, useValue: { params: of({}) } }],
    });

    userService = TestBed.inject(UserService);
    sessionService = TestBed.inject(SessionService);
    activityService = TestBed.inject(ActivityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  function createTestUser(): any {
    return {
      id: 1,
      name: 'John Doe',
      company: 'Example Company',
      site: 'example.com',
      telephone: '123-456-7890',
      email: 'john.doe@example.com',
      balance: '1000',
      balancePartner: '500',
      registerIp: '192.168.0.1',
      lastLoginIp: '192.168.0.2',
      addedDateTime: '2021-01-01T00:00:00',
      comment: 'Test user',
      isServicePaused: 0,
      invitedByUserId: 2,
      isPartner: 1,
      enablePartnerPayments: 1,
      wmr: '12345',
      timezone: 'UTC',
      language: 'en',
      languages: ['en', 'fr'],
      accessToken: 'token',
      isLoggedIn: true,
      isAdmin: false,
      currency: 'USD',
      config: {},
      extensionSettings: {},
      notifications: [],
      paidUntilDateTime: '2022-01-01T00:00:00',
      partnerPercent: '10',
      isPaid: true,
      tariff: 'monthly',
      penaltyAmount: 0,
      languageLevel: 'intermediate',
      favoriteCategoryId: [1, 2, 3],
      dailyGoal: 100,
      avatar: 'avatar.png',
    };
  }

  it('should initialize and clean up activity tracking on user login and logout', () => {
    spyOn(activityService, 'initializeActivityTracking');
    spyOn(activityService, 'loadStoredActivityData');
    spyOn(activityService, 'cleanUpActivityTracking');

    const testUser = createTestUser();
    sessionService.user$.next(testUser);

    expect(activityService.initializeActivityTracking).toHaveBeenCalled();
    expect(activityService.loadStoredActivityData).toHaveBeenCalled();

    sessionService.user$.next(null);

    expect(activityService.cleanUpActivityTracking).toHaveBeenCalled();
  });
});
