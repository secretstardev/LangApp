import { Injectable } from '@angular/core';
import { EntityService } from '@app/libs/core/services/common';
import { UserStats } from '@app/libs/core/models';
import { HttpApiService } from '@app/libs/core/services/http-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStatsApiService implements EntityService<UserStats> {
  basePath = 'users/stats';
  constructor(private httpApi: HttpApiService) {}

  getOne(): Observable<UserStats> {
    return this.httpApi.get(this.basePath);
  }
}
