import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { BehaviorSubject, Subject, Subscription, timer } from 'rxjs';
import { TrainingGuard } from '../training/guards/training.guard';
import { routingConfig } from '@app/libs/config';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private userActivity$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private activityType: 'drills' | 'contents' | null = null;

  // Added variable to store the timestamp of the last user action
  private lastUserActionTimestamp: number;
  private userActivityInterval: ReturnType<typeof setInterval>;
  private activityData: any[] = [];

  private resendErroredActivitiesSubscription: Subscription;

  private boundUpdateLastUserActionTimestamp: any;

  private activityDataLoaded$ = new Subject<void>();
  private userActionThreshold = 30 * 1000; // 30 seconds

  private routeConfig = routingConfig;

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private trainingGuard: TrainingGuard) {
    this.boundUpdateLastUserActionTimestamp = this.updateLastUserActionTimestamp.bind(this);
    this.init();
  }

  initializeActivityTracking() {
    // Set up event listeners for user activity and video playback status here.
    this.attachEventListeners();
    this.countActivityTime();
    this.updateLastUserActionTimestamp();
  }

  private attachEventListeners() {
    window.addEventListener('click', this.boundUpdateLastUserActionTimestamp);
    window.addEventListener('touchstart', this.boundUpdateLastUserActionTimestamp);
    window.addEventListener('scroll', this.boundUpdateLastUserActionTimestamp);
  }

  private removeEventListeners() {
    window.removeEventListener('click', this.boundUpdateLastUserActionTimestamp);
    window.removeEventListener('touchstart', this.boundUpdateLastUserActionTimestamp);
    window.removeEventListener('scroll', this.boundUpdateLastUserActionTimestamp);
  }

  private init(): void {
    this.sendActivityData();
    this.resendErroredActivities();
  }

  isUserOnValidPage(): boolean {
    const url = this.router.url;
    if (url.startsWith(this.routeConfig.training.fullPath) && !url.startsWith(
      this.routeConfig.training.index.fullPath)) {
      this.activityType = 'drills';
      return true;
    }

    if (url.startsWith(this.routeConfig.content.materials.view.fullPath)) {
      this.activityType = 'contents';
      return true;
    }

    return false;
  }

  isUserActive(): boolean {
    const currentTime = Date.now();
    const timeSinceLastUserAction = currentTime - this.lastUserActionTimestamp;

    const activeByUserAction = timeSinceLastUserAction < this.userActionThreshold;

    return activeByUserAction && document.visibilityState != 'hidden';
  }

  countActivityTime(): void {
    clearInterval(this.userActivityInterval);
    this.userActivityInterval = setInterval(() => {
      this.writeIntermediateState();
    }, 1000);
  }

  private generateNonceToken(): string {
    const rand = Math.random().toString(36).substring(2);
    const time = Date.now().toString(36);
    return rand + time;
  }

  writeIntermediateState(): void {
    const enableTracking = this.isUserOnValidPage() && this.isUserActive();

    // Re-read the fresh state from localStorage
    this.activityData = this.localStorageService.getActivityData();

    const currentTime = Date.now();
    let activity = this.activityData.find(
      (activity) => activity.activity_type === this.activityType && activity.status === 'collecting');

    if (enableTracking) {
      let timeDifference: number;
      if (!activity) {
        activity = {
          activity_type: this.activityType,
          seconds: timeDifference,
          nonce_token: this.generateNonceToken(),
          status: 'collecting',
          lastUpdate: currentTime - 1000,
        };
        this.activityData.push(activity);
      }

      timeDifference = Math.min(currentTime - activity.lastUpdate, this.userActionThreshold) / 1000;
      activity.lastUpdate = currentTime;
      activity.seconds += timeDifference;
      if (activity.seconds >= 60) {
        activity.status = 'waiting_to_send';
      }
      this.localStorageService.saveActivityData(this.activityData);
    } else if (activity) {
      let timeDifference: number;
      timeDifference = currentTime - activity.lastUpdate;
      if (timeDifference > 10000) {
        activity.status = 'waiting_to_send';
        this.localStorageService.saveActivityData(this.activityData);
      }
    }

    if (activity && activity.status == 'waiting_to_send') {
      this.sendActivityData();
    }

    this.userActivity$.next(true);
  }

  sendActivityData(): void {
    this.activityData = this.localStorageService.getActivityData();
    const waitingToSendActivities = this.activityData.filter((activity) => activity.status === 'waiting_to_send');
    waitingToSendActivities.forEach((activity) => {
      this.sendActivity(activity);
    });
  }

  sendActivity(activity) {
    this.apiService.addActivity(activity.activity_type, activity.seconds, activity.nonce_token).subscribe({
      next: (response) => {
        if (response.success === true || response?.errors?.nonce_token) {
          activity.status = 'sent';
          activity.lastUpdate = Date.now();
          this.localStorageService.updateActivity(activity);
        } else if (response?.errors) {
          activity.status = 'validation_error';
          activity.lastUpdate = Date.now();
          this.localStorageService.updateActivity(activity);
        }
      },
      error: () => {
        activity.status = 'sending_error';
        activity.lastUpdate = Date.now();
        this.localStorageService.updateActivity(activity);
      },
    });
  }

  resendErroredActivities(): void {
    const initialDelay = Math.floor(Math.random() * 5000);
    const period = 60000 + Math.floor(Math.random() * 60000);

    this.resendErroredActivitiesSubscription = timer(initialDelay, period).subscribe(() => {
      this.localStorageService.cleanOldActivities();
      this.activityData = this.localStorageService.getActivityData();
      const erroredActivities = this.activityData.filter((activity) => activity.status === 'sending_error');
      erroredActivities.forEach((activity) => {
        this.sendActivity(activity);
      });
    });
  }

  updateLastUserActionTimestamp(): void {
    this.lastUserActionTimestamp = Date.now();
  }

  cleanUpActivityTracking(): void {
    this.removeEventListeners();
    clearInterval(this.userActivityInterval);
    if (this.resendErroredActivitiesSubscription) {
      this.resendErroredActivitiesSubscription.unsubscribe();
    }
  }

  loadStoredActivityData() {
    const storedActivityData = this.localStorageService.getActivityData();

    if (storedActivityData && storedActivityData.length > 0) {
      this.activityData = storedActivityData;
      this.activityDataLoaded$.next();
    }
  }
}
