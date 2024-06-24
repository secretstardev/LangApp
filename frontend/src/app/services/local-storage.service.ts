import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly activityDataKey = 'activity_data';

  constructor() {}

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  saveActivityData(activityData: any[]): void {
    this.setItem(this.activityDataKey, activityData);
  }

  getActivityData(): any[] {
    return this.getItem(this.activityDataKey) || [];
  }

  deleteActivity(nonce_token: string): void {
    const activityData = this.getActivityData();
    const updatedActivityData = activityData.filter((activity) => activity.nonce_token !== nonce_token);
    this.saveActivityData(updatedActivityData);
  }

  updateActivity(updatedActivity: any): void {
    const activityData = this.getActivityData();
    const activityIndex = activityData.findIndex((activity) => activity.nonce_token === updatedActivity.nonce_token);

    if (activityIndex > -1) {
      activityData[activityIndex] = updatedActivity;
      this.saveActivityData(activityData);
    }
  }

  cleanOldActivities(): void {
    const activityData = this.getActivityData();
    const currentTime = Date.now();
    const updatedActivityData = activityData.filter((activity) => {
      const timeDifference = currentTime - activity.lastUpdate;
      return timeDifference < 120000 || (activity.status !== 'collecting' && activity.status !== 'waiting_to_send' && activity.status !== 'sending_error');
    });
    this.saveActivityData(updatedActivityData);
  }
}
