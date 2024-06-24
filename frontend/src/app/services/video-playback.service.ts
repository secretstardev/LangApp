import { Injectable } from '@angular/core';
import { ActivityService } from './activity.service';

@Injectable({
  providedIn: 'root',
})
export class VideoPlaybackService {
  constructor(private activityService: ActivityService) {}

  isUserActiveDuringVideoPlayback(isUserActive: boolean, isVideoPlaying: boolean): boolean {
    return isUserActive || isVideoPlaying;
  }

  updateVideoPlaybackStatus(isVideoPlaying: boolean): void {
    this.activityService.updateLastUserActionTimestamp();
  }
}
