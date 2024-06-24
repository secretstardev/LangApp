import { TestBed, fakeAsync, tick, discardPeriodicTasks, flushMicrotasks } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ActivityService } from './activity.service';
import { ActivatedRoute } from '@angular/router';
import { TrainingGuard } from '../training/guards/training.guard';
import {
  MaterialViewPageComponent
} from '@app/libs/pages/content/components/materials-view-page/material-view-page.component';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from 'primeng/api';
import { APP_BASE_HREF } from '@angular/common';
import { User } from '../interfaces/common.interface';
import { TranslateService } from '@ngx-translate/core';
import { CookieService, CookieOptionsProvider, COOKIE_OPTIONS } from 'ngx-cookie';
import { UserService } from './user.service';

const mockTranslateService = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);
const mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'put', 'remove']);
const mockApiService = jasmine.createSpyObj('ApiService', ['addActivity', 'refreshUserInfo']);

describe('ActivityService', () => {
  let service: ActivityService;
  let apiService: ApiService;
  let localStorageService: LocalStorageService;
  let activatedRoute: ActivatedRoute;
  let trainingGuard: TrainingGuard;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        TrainingGuard,
        LocalStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                data: { component: null },
              },
            },
          },
        },
        {
          provide: ApiService,
          useValue: mockApiService,
        },
        UserService,
        MessageService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: CookieOptionsProvider, useClass: CookieOptionsProvider },
        { provide: COOKIE_OPTIONS, useValue: {} },
      ],
    });
    service = TestBed.inject(ActivityService);
    apiService = TestBed.inject(ApiService);
    localStorageService = TestBed.inject(LocalStorageService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trainingGuard = TestBed.inject(TrainingGuard);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Write and run tests for ActivityService methods here
  describe('isUserOnValidPage', () => {
    it('returns true when user is on a training page', () => {
      spyOn(trainingGuard, 'isUserOnTrainingPage').and.returnValue(true);
      expect(service.isUserOnValidPage()).toBeTrue();
    });

    it('returns true when user is on content/view page', () => {
      activatedRoute.snapshot.firstChild.data.component = MaterialViewPageComponent;
      expect(service.isUserOnValidPage()).toBeTrue();
    });

    it('returns false when user is not on a valid page', () => {
      spyOn(trainingGuard, 'isUserOnTrainingPage').and.returnValue(false);
      activatedRoute.snapshot.firstChild.data.component = null;
      expect(service.isUserOnValidPage()).toBeFalse();
    });
  });

  it('should update lastUserActionTimestamp', () => {
    const timestamp = Date.now();
    service.updateLastUserActionTimestamp(timestamp);
    expect(service['lastUserActionTimestamp']).toEqual(timestamp);
  });

  it('should return true when user is active within 30 seconds', () => {
    const timestamp = Date.now();
    spyOnProperty(document, 'visibilityState', 'get').and.returnValue('visible');
    service.updateLastUserActionTimestamp(timestamp);
    expect(service.isUserActive()).toBeTrue();
  });

  it('should return false when user is not active within 30 seconds', () => {
    const timestamp = Date.now() - 31000;
    spyOnProperty(document, 'visibilityState', 'get').and.returnValue('visible');
    service.updateLastUserActionTimestamp(timestamp);
    expect(service.isUserActive()).toBeFalse();
  });

  it('should return true when user is active and video is playing', () => {
    const timestamp = Date.now();
    service.updateLastUserActionTimestamp(timestamp);
    spyOn(service, 'isUserActive').and.returnValue(true);
    spyOnProperty(document, 'visibilityState', 'get').and.returnValue('hidden');
    expect(service.isUserActive()).toBeTrue();
  });

  describe('countActivityTime', () => {
    it('should call writeIntermediateState every 1000ms if user is on a valid page and active', fakeAsync(() => {
      spyOn(service, 'isUserOnValidPage').and.returnValue(true);
      spyOn(service, 'isUserActive').and.returnValue(true);
      spyOn<any>(service, 'writeIntermediateState');

      service.countActivityTime();
      tick(1000);

      expect(service['writeIntermediateState']).toHaveBeenCalled();

      (service['writeIntermediateState'] as jasmine.Spy).calls.reset();
      tick(1000);

      expect(service['writeIntermediateState']).toHaveBeenCalled();

      discardPeriodicTasks();
    }));
  });

  describe('writeIntermediateState', () => {
    beforeEach(() => {
      spyOn(localStorageService, 'getActivityData').and.returnValue([]);
      spyOn(localStorageService, 'saveActivityData');
    });

    it('should not update activity data if user is not on valid page', () => {
      spyOn(service, 'isUserOnValidPage').and.returnValue(false);
      spyOn(service, 'isUserActive').and.returnValue(false);

      service.writeIntermediateState();

      expect(localStorageService.getActivityData).not.toHaveBeenCalled();
      expect(localStorageService.saveActivityData).not.toHaveBeenCalled();
    });

    it('should not update activity data if user is not active', () => {
      spyOn(service, 'isUserOnValidPage').and.returnValue(true);
      spyOn(service, 'isUserActive').and.returnValue(false);

      service.writeIntermediateState();

      expect(localStorageService.getActivityData).not.toHaveBeenCalled();
      expect(localStorageService.saveActivityData).not.toHaveBeenCalled();
    });

    it('should not update activity data if document is hidden', () => {
      spyOn(service, 'isUserOnValidPage').and.returnValue(true);
      service['lastUserActionTimestamp'] = Date.now();
      spyOnProperty(document, 'visibilityState', 'get').and.returnValue('hidden');

      (localStorageService.getActivityData as jasmine.Spy).calls.reset();
      (localStorageService.saveActivityData as jasmine.Spy).calls.reset();

      service.writeIntermediateState();

      expect(localStorageService.getActivityData).not.toHaveBeenCalled();
      expect(localStorageService.saveActivityData).not.toHaveBeenCalled();
    });

    it('should save new activity data with correct activity type, status, lastUpdate and call userActivity$.next(true)', () => {
      spyOn(service, 'isUserOnValidPage').and.returnValue(true);
      spyOn(service, 'isUserActive').and.returnValue(true);
      spyOn(service['userActivity$'], 'next');
      service['activityType'] = 'contents';
      service['lastUserActionTimestamp'] = Date.now() - 1000;

      service.writeIntermediateState();

      expect(localStorageService.getActivityData).toHaveBeenCalled();
      expect(localStorageService.saveActivityData).toHaveBeenCalled();
      expect(service['userActivity$'].next).toHaveBeenCalledWith(true);

      const savedData = localStorageService.getActivityData();
      expect(savedData.length).toBe(1);
      expect(savedData[0].activity_type).toBe('contents');
      expect(savedData[0].status).toBe('collecting');
      expect(savedData[0].lastUpdate).toBeDefined();
    });

    it('should update existing activity data with correct activity type, status, and lastUpdate', () => {
      spyOn(service, 'isUserOnValidPage').and.returnValue(true);
      spyOn(service, 'isUserActive').and.returnValue(true);
      spyOn(service['userActivity$'], 'next');
      service['activityType'] = 'contents';
      service['activityData'] = [
        {
          activity_type: 'contents',
          seconds: 0,
          nonce_token: 'test-token',
          status: 'collecting',
          lastUpdate: Date.now() - 1000,
        },
      ];

      service.writeIntermediateState();

      expect(localStorageService.getActivityData).toHaveBeenCalled();
      expect(localStorageService.saveActivityData).toHaveBeenCalled();
      expect(service['userActivity$'].next).toHaveBeenCalledWith(true);

      const savedData = localStorageService.getActivityData();
      expect(savedData.length).toBe(1);
      expect(savedData[0].activity_type).toBe('contents');
      expect(savedData[0].status).toBe('collecting');
      expect(savedData[0].lastUpdate).toBeDefined();
    });
  });

  describe('sendActivityData', () => {
    beforeEach(() => {
      spyOn(localStorageService, 'deleteActivity');
      spyOn(localStorageService, 'updateActivity');
      spyOn(localStorageService, 'getActivityData').and.returnValue([
        {
          activity_type: 'contents',
          seconds: 0,
          nonce_token: 'test-token',
          status: 'waiting_to_send',
        },
      ]);
    });

    afterEach(() => {
      (localStorageService.deleteActivity as jasmine.Spy).calls.reset();
      (localStorageService.updateActivity as jasmine.Spy).calls.reset();
    });

    it('should call apiService.addActivity with waiting_to_send activities', fakeAsync(() => {
      (apiService.addActivity as jasmine.Spy).and.returnValue(of({ status: 'success' }));

      service.sendActivityData();
      service['userActivity$'].next(true);
      tick(60000);

      expect(apiService.addActivity).toHaveBeenCalled();
      expect(localStorageService.updateActivity).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should update activity status to sending_error when apiService.addActivity fails', fakeAsync(() => {
      (apiService.addActivity as jasmine.Spy).and.returnValue(throwError(() => new Error()));

      service.sendActivityData();
      service['userActivity$'].next(true);
      tick(60000);

      expect(apiService.addActivity).toHaveBeenCalled();
      expect(localStorageService.updateActivity).toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should update activity status to sent when nonce_token is already_processed', fakeAsync(() => {
      (apiService.addActivity as jasmine.Spy).and.returnValue(of({ status: 'already_processed' }));

      service.sendActivityData();
      service['userActivity$'].next(true);
      tick(60000);

      expect(apiService.addActivity).toHaveBeenCalled();
      expect(localStorageService.updateActivity).toHaveBeenCalled();

      discardPeriodicTasks();
    }));
  });

  describe('resendErroredActivities', () => {
    beforeEach(() => {
      spyOn(localStorageService, 'deleteActivity');
      spyOn(localStorageService, 'updateActivity');
      spyOn(localStorageService, 'getActivityData').and.returnValue([
        {
          activity_type: 'contents',
          seconds: 10,
          nonce_token: 'test_nonce_token',
          status: 'sending_error',
        },
      ]);
      spyOn(console, 'error');
    });

    afterEach(() => {
      (localStorageService.deleteActivity as jasmine.Spy).calls.reset();
      (localStorageService.updateActivity as jasmine.Spy).calls.reset();
      (console.error as jasmine.Spy).calls.reset();
    });

    it('should attempt to resend activities with sending_error status and update their status to sent if successful', fakeAsync(() => {
      const erroredActivity = {
        activity_type: 'contents',
        seconds: 10,
        nonce_token: 'test_nonce_token',
        status: 'sending_error',
      };
      service['activityData'].push(erroredActivity);

      (apiService.addActivity as jasmine.Spy).and.returnValue(of({ status: 'success' }));

      service.resendErroredActivities();
      service['userActivity$'].next(true);
      tick(150000);
      flushMicrotasks();

      expect(apiService.addActivity).toHaveBeenCalled();
      expect(localStorageService.updateActivity).toHaveBeenCalledWith({ ...erroredActivity, status: 'sent' });
      discardPeriodicTasks();
    }));

    it('should keep the sending_error status and log an error if the resend is unsuccessful', fakeAsync(() => {
      const erroredActivity = {
        activity_type: 'contents',
        seconds: 10,
        nonce_token: 'test_nonce_token',
        status: 'sending_error',
      };
      service['activityData'].push(erroredActivity);

      (apiService.addActivity as jasmine.Spy).and.returnValue(throwError(() => new Error('Resend failed')));

      service.resendErroredActivities();
      service['userActivity$'].next(true);
      tick(150000);
      flushMicrotasks();

      expect(apiService.addActivity).toHaveBeenCalled();
      expect(erroredActivity.status).toBe('sending_error');
      discardPeriodicTasks();
    }));
  });

  const createUserMock = (): Partial<User> => ({
    id: 1,
    name: 'User',
    company: 'Company',
    site: 'Site',
    telephone: '1234567890',
    email: 'user@example.com',
    balance: '0',
    // ...add other required properties with mock data
    // ...add other required properties with mock data if needed
    balancePartner: '0',
    registerIp: '127.0.0.1',
    lastLoginIp: '127.0.0.1',
    addedDateTime: '2022-10-01T10:00:00',
    // ...add other required properties with mock data
  });

  it('should call initializeActivityTracking when user$ BehaviorSubject emits a new user object', () => {
    const spyOnInitialize = spyOn(service, 'initializeActivityTracking').and.callThrough();
    const testUser = createUserMock();
    userService.user$.next(testUser as User);
    expect(spyOnInitialize).toHaveBeenCalled();
  });

  it('should add event listeners for user activity and video playback status in attachEventListeners', () => {
    const spyOnAddEventListener = spyOn(window, 'addEventListener');
    service['attachEventListeners']();
    expect(spyOnAddEventListener).toHaveBeenCalledTimes(3);
    expect(spyOnAddEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(spyOnAddEventListener).toHaveBeenCalledWith('touchstart', jasmine.any(Function));
    expect(spyOnAddEventListener).toHaveBeenCalledWith('scroll', jasmine.any(Function));
  });

  it('should remove event listeners for user activity and video playback status in removeEventListeners', () => {
    const spyOnRemoveEventListener = spyOn(window, 'removeEventListener');
    service['removeEventListeners']();
    expect(spyOnRemoveEventListener).toHaveBeenCalledTimes(3);
    expect(spyOnRemoveEventListener).toHaveBeenCalledWith('click', jasmine.any(Function));
    expect(spyOnRemoveEventListener).toHaveBeenCalledWith('touchstart', jasmine.any(Function));
    expect(spyOnRemoveEventListener).toHaveBeenCalledWith('scroll', jasmine.any(Function));
  });

  it('should remove event listeners and stop timers when cleanUpActivityTracking is called', fakeAsync(() => {
    const spyOnRemoveEventListeners = spyOn(service, 'removeEventListeners' as any).and.callThrough();
    const testUser = createUserMock();

    userService.user$.next(testUser as User);
    service.cleanUpActivityTracking();

    expect(spyOnRemoveEventListeners).toHaveBeenCalled();

    tick(60000);
    discardPeriodicTasks();
    flushMicrotasks();
  }));
  it('should call loadStoredActivityData when user$ BehaviorSubject emits a new user object', () => {
    const spyOnLoadStoredActivityData = spyOn(service, 'loadStoredActivityData').and.callThrough();
    const testUser = createUserMock();
    userService.user$.next(testUser as User);
    expect(spyOnLoadStoredActivityData).toHaveBeenCalled();
  });
});
