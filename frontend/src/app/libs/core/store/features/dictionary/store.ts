import { Injectable } from '@angular/core';
import { Dictionary, DictionaryAdd, DictionaryGet, DictionaryMove } from '@app/libs/core/models';
import { DictionaryApiService } from '@app/libs/core/services';

import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { deleteEntities, selectAllEntities, setEntities, upsertEntities, withEntities } from '@ngneat/elf-entities';
import { joinRequestResult, trackRequestResult } from '@app/libs/core/store/common/lib-fix/request-result';
import { tap } from 'rxjs/operators';
import { EntitiesState } from '@ngneat/elf-entities/src/lib/entity.state';
import { selectPaginationData, setPage, updatePaginationData, withPagination } from '@ngneat/elf-pagination';
import { getTypeGuard, makeTypeGuard, metaToStorePagination } from '@app/libs/core/store/common';
import { map, Observable } from 'rxjs';
import { TableStoreUtil } from '../../common';

export interface DictionaryStoreModel extends EntitiesState<Dictionary> {
  includedIds: number[];
  excludedIds: number[];
  selectedAll: boolean;
  filter: DictionaryGet;
  total: number;
}

const storeKey = 'dictionaries';
const defaultFilter: DictionaryGet = {
  page: 1,
  perPage: 20,
  expand: 'dictionaryWord',
};
const store = createStore(
  { name: storeKey },
  withEntities<Dictionary>(),
  withProps<DictionaryStoreModel>({ filter: defaultFilter, includedIds: [], excludedIds: [], selectedAll: false, total: 0 }),
  withPagination()
);

makeTypeGuard(storeKey, 'retrieveList');
makeTypeGuard(storeKey, 'lazyLoad');

const actions = {
  retrieveList: getTypeGuard(storeKey, 'retrieveList'),
  lazyLoad: getTypeGuard(storeKey, 'lazyLoad'),
};

@Injectable({
  providedIn: 'root',
})
export class DictionaryStore {
  entities$ = store.pipe(selectAllEntities(), joinRequestResult([actions.retrieveList]));

  selectionIds$: Observable<number[]> = store
    .combine({
      entities: store.pipe(selectAllEntities()),
      includedIds: store.pipe(select((state) => state.includedIds)),
      excludedIds: store.pipe(select((state) => state.excludedIds)),
      selectedAll: store.pipe(select((state) => state.selectedAll)),
    })
    .pipe(map(TableStoreUtil.getSelectionIds));

  selectionTotal$: Observable<number> = store
    .combine({
      includedIds: store.pipe(select((state) => state.includedIds)),
      excludedIds: store.pipe(select((state) => state.excludedIds)),
      selectedAll: store.pipe(select((state) => state.selectedAll)),
      total: store.pipe(select((state) => state.total)),
    })
    .pipe(map(TableStoreUtil.selectionTotal));

  pagination$ = store.pipe(selectPaginationData());

  selectedAll$ = store.pipe(select((state) => state.selectedAll));

  constructor(private dictionaryApiService: DictionaryApiService) {}

  retrieveList(filter?: Partial<DictionaryGet>) {
    store.update(setEntities([]), setProp('includedIds', []), setProp('excludedIds', []), setProp('selectedAll', false));
    const newFilter: DictionaryGet = {
      ...defaultFilter,
      ...filter,
    };
    return this.dictionaryApiService.getList(newFilter).pipe(
      tap((result) => {
        store.update(
          setEntities(result.items),
          updatePaginationData(metaToStorePagination(result._meta)),
          setPage(
            result._meta.currentPage,
            result.items.map((c) => c.id)
          ),
          setProp('filter', newFilter),
          setProp('total', result._meta.totalCount)
        );
      }),
      trackRequestResult([actions.retrieveList], { skipCache: true })
    );
  }

  lazyLoad(filter?: Partial<DictionaryGet>) {
    const newFilter = {
      ...store.getValue().filter,
      ...filter,
    };
    return this.dictionaryApiService.getList(newFilter).pipe(
      tap((result) => {
        store.update(
          upsertEntities(result.items),
          updatePaginationData(metaToStorePagination(result._meta)),
          setPage(
            result._meta.currentPage,
            result.items.map((c) => c.id)
          )
        );
      }),
      trackRequestResult([actions.lazyLoad], { skipCache: true })
    );
  }

  selectAll(isSelected: boolean): void {
    store.update(setProp('selectedAll', isSelected));
    store.update(setProp('excludedIds', []));
    store.update(setProp('includedIds', []));
  }

  selectionIdsChange({ id, checked }: { id: number; checked: boolean }): void {
    if (store.getValue().selectedAll) {
      const currentIds = store.getValue().excludedIds || [];
      const ids = checked ? currentIds.filter((el) => el !== id) : [...currentIds, id];
      store.update(setProp('excludedIds', ids));
    } else {
      const currentIds = store.getValue().includedIds || [];
      const ids = checked ? [...currentIds, id] : currentIds.filter((el) => el !== id);
      store.update(setProp('includedIds', ids));
    }
  }

  move(params: DictionaryMove): Observable<Dictionary> {
    return this.dictionaryApiService.move(params).pipe(
      tap(() => {
        store.update(setProp('includedIds', []));
        store.update(deleteEntities(params.ids));
      })
    );
  }

  add(params: DictionaryAdd): Observable<Dictionary> {
    return this.dictionaryApiService.add(params).pipe(
      tap(() => {
        store.update(setProp('includedIds', []));
      })
    );
  }

  importEntities(value: string): Observable<Dictionary[]> {
    return this.dictionaryApiService.importEntities(value).pipe(
      tap((value) => {
        store.update(upsertEntities(value));
      })
    );
  }

  deleteEntities(listId: number, ids: number[]): Observable<void> {
    return this.dictionaryApiService.deleteList(ids, listId).pipe(
      tap(() => {
        store.update(setProp('includedIds', []), setProp('excludedIds', []), setProp('selectedAll', false), deleteEntities(ids));
      })
    );
  }
}
