import { Injectable } from '@angular/core';
import { HttpApiService } from '../../http-api.service';
import { Observable } from 'rxjs';
import { Activity, ActivityGet, BaseResponse } from '@app/libs/core/models';
import { EntityService } from '@app/libs/core/services/common/entity-service.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityApiService implements EntityService<Activity> {
  basePath = 'activities';
  constructor(private httpApi: HttpApiService) {}

  getList(params: ActivityGet): Observable<BaseResponse<Activity>> {
    return this.httpApi.get(this.basePath, params);
  }
}
