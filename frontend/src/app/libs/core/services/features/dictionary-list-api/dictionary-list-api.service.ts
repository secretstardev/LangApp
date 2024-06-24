import { Injectable } from '@angular/core';
import { EntityService } from '@app/libs/core/services/common/entity-service.model';
import { BaseResponse, DictionaryList, DictionaryListCreate, DictionaryListGet, DictionaryListUpdate } from '@app/libs/core/models';
import { HttpApiService } from '@app/libs/core/services/http-api.service';
import { map, Observable } from 'rxjs';
import { SortApiUtil } from '@app/libs/core/services/common';

@Injectable({
  providedIn: 'root',
})
export class DictionaryListApiService implements EntityService<DictionaryList> {
  basePath = 'dictionaries/lists';
  constructor(private httpApi: HttpApiService) {}

  getList(params: DictionaryListGet): Observable<BaseResponse<DictionaryList>> {
    return this.httpApi.get<BaseResponse<DictionaryList>>(this.basePath, params).pipe(
      map((resp) => ({
        ...resp,
        items: resp.items.sort(SortApiUtil.sortById),
      }))
    );
  }

  getOne(id: string): Observable<DictionaryList> {
    return this.httpApi.get<DictionaryList>(this.basePath + '/' + id);
  }

  create(form: DictionaryListCreate): Observable<DictionaryList> {
    return this.httpApi.post(this.basePath, form);
  }

  update({ id, ...form }: DictionaryListUpdate): Observable<DictionaryList> {
    return this.httpApi.put(this.basePath + '/' + id, form);
  }

  delete(id: number): Observable<DictionaryList> {
    return this.httpApi.delete(this.basePath, id);
  }
}
