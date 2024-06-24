import { Injectable } from '@angular/core';
import { DictionaryList, DictionaryListCreate, DictionaryListGet, DictionaryListUpdate } from '@app/libs/core/models';

import { createStore } from '@ngneat/elf';
import { addEntities, deleteEntities, selectActiveEntity, selectAllEntities, setActiveId, setEntities, updateEntities, upsertEntities, withActiveId, withEntities } from '@ngneat/elf-entities';
import { joinRequestResult, trackRequestResult } from '@app/libs/core/store/common/lib-fix/request-result';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestResult } from '@ngneat/elf-requests';
import { DictionaryListApiService } from '@app/libs/core/services';
import { getTypeGuard, makeTypeGuard } from '@app/libs/core/store/common';

const storeKey = 'dictionaryLists';
const store = createStore({ name: storeKey }, withEntities<DictionaryList>(), withActiveId());

makeTypeGuard(storeKey, 'retrieveList');
makeTypeGuard(storeKey, 'retrieveOne');

const actions = {
  retrieveList: getTypeGuard(storeKey, 'retrieveList'),
  retrieveOne: getTypeGuard(storeKey, 'retrieveOne'),
};

@Injectable({
  providedIn: 'root',
})
export class DictionaryListStore {
  entities$: Observable<RequestResult & { data: DictionaryList[] }> = store.pipe(selectAllEntities(), joinRequestResult([actions.retrieveList]));
  selectedEntity$ = store.pipe(selectActiveEntity());

  constructor(private listApiService: DictionaryListApiService) {}

  retrieveList(params: DictionaryListGet) {
    return this.listApiService.getList(params).pipe(
      tap((result) => {
        store.update(setEntities(result.items));
      }),
      trackRequestResult([actions.retrieveList], { skipCache: true })
    );
  }

  retrieveOne(id: number) {
    return this.listApiService.getOne(id + '').pipe(
      tap((result) => {
        store.update(upsertEntities([result]));
      }),
      trackRequestResult([actions.retrieveOne], { skipCache: true })
    );
  }

  create(form: DictionaryListCreate) {
    return this.listApiService.create(form).pipe(
      tap((result) => {
        store.update(addEntities(result));
      })
    );
  }

  update(form: DictionaryListUpdate) {
    return this.listApiService.update(form).pipe(
      tap((result) => {
        store.update(updateEntities(form.id, { name: result.name, type: result.type }));
      })
    );
  }

  delete(id: number) {
    return this.listApiService.delete(id).pipe(
      tap(() => {
        store.update(deleteEntities([id]));
      })
    );
  }

  selectEntity(id: number) {
    store.update(setActiveId(id));
  }
}
