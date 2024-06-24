import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { HomeNextButtonEnum } from './components/home-next-list/home-next-list.model';
import { Router } from '@angular/router';
import { routingConfig } from '@app/libs/config/routing.config';
import { Activity, ContentStatus, StudiedValues } from '@app/libs/core/models';
import { map, Observable, share } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DateUtils, GeneralHelper } from '@app/libs/shared';
import { ActivityApiService, ContentsApiService, UserStatsApiService } from '@app/libs/core/services';
import { ApiService } from '@app/services/api.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @HostBinding('class.typography') enableTypography = true;

  currentDate = new Date();
  user$ = this.userService.user$;
  activities$ = this.getActivities().pipe(share());
  currentActivity$ = this.activities$.pipe(map((activities) => activities[activities.length - 1]));
  learningMinutes$ = this.currentActivity$.pipe(map((activity) => Math.round((activity?.total_seconds || 0) / 60)));
  goalMinutes$ = this.currentActivity$.pipe(map((activity) => Math.ceil((activity?.goal_seconds || 600) / 60)));
  userStats$ = this.userStatsApi.getOne();

  constructor(private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private contentsApi: ContentsApiService,
    private activityApi: ActivityApiService,
    private userStatsApi: UserStatsApiService) {
  }

  clickHomeNextButton(event: HomeNextButtonEnum) {
    switch (event) {
      case HomeNextButtonEnum.continue:
        return this.router.navigate([routingConfig.content.materials.fullPath],
          {
            queryParams: {
              filter: GeneralHelper.objectToBase64({ isStudied: StudiedValues.started_and_unfinished })
            }
          });
      case HomeNextButtonEnum.watchNew:
        return this.router.navigateByUrl(routingConfig.content.materials.fullPath);
      case HomeNextButtonEnum.studyWords:
        return this.router.navigateByUrl(routingConfig.training.index.fullPath);
      case HomeNextButtonEnum.surprise:
        return this.getSurpriseVideoId()
          .pipe(untilDestroyed(this))
          .subscribe((video) => {
            this.router.navigate([routingConfig.content.materials.view.fullPath, video.id]);
          });
    }
  }

  private getSurpriseVideoId(): Observable<any> {
    return this.apiService.randomVideo();
  }

  private getActivities(): Observable<Activity[]> {
    const currentDate = new Date();
    const date120DaysAgo = new Date();
    date120DaysAgo.setDate(currentDate.getDate() - 112);
    return this.activityApi
      .getList({
        filter: {
          date: {
            gte: DateUtils.backendRequest(date120DaysAgo),
            lte: DateUtils.backendRequest(currentDate),
          },
        },
      })
      .pipe(map((resp) => resp.items));
  }
}
