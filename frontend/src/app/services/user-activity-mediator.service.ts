import { Injectable } from '@angular/core';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class UserActivityMediatorService {
  constructor(private activityService: ActivityService) {}

  initializeActivityTracking() {
    this.activityService.initializeActivityTracking();
  }

  loadStoredActivityData() {
    this.activityService.loadStoredActivityData();
  }

  cleanUpActivityTracking() {
    this.activityService.cleanUpActivityTracking();
  }
}
