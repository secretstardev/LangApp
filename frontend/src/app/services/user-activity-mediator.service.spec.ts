import { TestBed } from '@angular/core/testing';
import { UserActivityMediatorService } from './user-activity-mediator.service';
import { ActivityService } from './activity.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockActivityService {
  initializeActivityTracking() {}
  loadStoredActivityData() {}
  cleanUpActivityTracking() {}
}

describe('UserActivityMediatorService', () => {
  let service: UserActivityMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserActivityMediatorService, { provide: ActivityService, useClass: MockActivityService }, { provide: ActivatedRoute, useValue: { params: of({}) } }],
    });
    service = TestBed.inject(UserActivityMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
