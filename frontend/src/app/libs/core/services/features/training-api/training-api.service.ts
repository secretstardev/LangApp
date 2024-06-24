import { Injectable } from '@angular/core';
import { EntityService } from '@app/libs/core/services/common/entity-service.model';
import { Drill, DrillCard, Hidings, Training, TrainingEndMessage } from '@app/libs/core/models';
import { HttpApiService } from '@app/libs/core/services/http-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingApiService implements EntityService<Training> {
  basePath = 'drills';
  constructor(private httpApi: HttpApiService) {}

  getOne(): Observable<Training> {
    return this.httpApi.get(this.basePath + '/list');
  }

  getTrainingCard(cardId: string): Observable<DrillCard> {
    return this.httpApi.get(this.basePath + '/card', {
      id: cardId,
    });
  }

  reportTrainingDrills(body: { drills: Drill[] }): Observable<TrainingEndMessage> {
    return this.httpApi.post(this.basePath + '/report-progress', body);
  }

  saveTrainingHidings(body: Hidings): Observable<{ drills: Drill[] }> {
    return this.httpApi.post<{ drills: Drill[] }>(this.basePath + '/hide', body);
  }
}
