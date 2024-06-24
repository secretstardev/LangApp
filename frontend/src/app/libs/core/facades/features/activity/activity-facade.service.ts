import { Injectable } from '@angular/core';
import { ActivityApiService } from '@app/libs/core/services';
import { Activity, ActivityGet, BaseResponse } from '@app/libs/core/models';
import { Observable } from 'rxjs';
import { EntityFacade } from '@app/libs/core/facades/common/entity-facade.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityFacadeService implements EntityFacade<Activity> {
  constructor(private activityApiService: ActivityApiService) {}

  getList(params: ActivityGet): Observable<BaseResponse<Activity>> {
    return this.activityApiService.getList(params);
  }
}
