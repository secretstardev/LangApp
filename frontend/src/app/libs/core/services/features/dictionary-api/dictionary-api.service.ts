import { Injectable } from '@angular/core';
import { EntityService } from '@app/libs/core/services/common/entity-service.model';
import { BaseApiComplete, BaseResponse, Dictionary, DictionaryAdd, DictionaryGet, DictionaryMove } from '@app/libs/core/models';
import { HttpApiService } from '@app/libs/core/services/http-api.service';
import { Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryApiService implements EntityService<Dictionary> {
  basePath = 'dictionaries';
  constructor(private httpApi: HttpApiService) {}

  getList(params: DictionaryGet): Observable<BaseResponse<Dictionary>> {
    const { listId, ...otherParams } = params;
    if (listId) {
      return this.httpApi.get(this.basePath + `/lists/${listId}/words`, otherParams);
    } else {
      return this.httpApi.get(this.basePath + '/index', otherParams);
    }
  }

  move({ listId, ...params }: DictionaryMove): Observable<Dictionary> {
    return this.httpApi.post(this.basePath + `/lists/${listId}/move`, params);
  }

  add({ listId, ...params }: DictionaryAdd): Observable<Dictionary> {
    return this.httpApi.post(this.basePath + `/lists/${listId}/words`, params);
  }

  deleteList(ids: number[], listId: number): Observable<void> {
    return this.httpApi.deleteList<BaseApiComplete>(`${this.basePath}/lists/${listId}/words`, ids).pipe(
      switchMap((resp) => {
        if (resp.success) {
          return of(void 0);
        } else {
          return throwError(() => new Error(JSON.stringify(resp.errors)));
        }
      })
    );
  }

  importEntities(entities: string): Observable<Dictionary[]> {
    return of([]);
    //  return this.httpApi.post(this.basePath + `/lists/${listId}/words`, params);
  }
}
