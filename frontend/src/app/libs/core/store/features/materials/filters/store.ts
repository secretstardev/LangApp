import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { getTypeGuard, makeTypeGuard } from '@app/libs/core/store/common';
import { Filters } from '@app/libs/features/materials/filters/filters.model';

export interface FiltersStoreModel {
  filters: Filters;
  activeFilters: number;
  isDefault: boolean;
}

const storeKey = 'filters';

const defaultFilters: Filters = {};

makeTypeGuard(storeKey, 'updateFilters');
makeTypeGuard(storeKey, 'resetFilters');

const actions = {
  updateFilters: getTypeGuard(storeKey, 'updateFilters'),
  resetFilters: getTypeGuard(storeKey, 'resetFilters')
};

const store = createStore(
  { name: storeKey },
  withProps<FiltersStoreModel>({
    isDefault: true,
    filters: defaultFilters,
    activeFilters: 0
  })
);

@Injectable({
  providedIn: 'root',
})
export class FiltersStore {
  constructor() {
  }

  get filters$() {
    return store.pipe(select(state => state.filters));
  }

  get default$() {
    return store.pipe(select(state => state.isDefault));
  }

  setDefault(isDefault: boolean): void {
    store.update(state => ({
      ...state,
      isDefault
    }));
  }

  setFilters(newFilters: Partial<Filters>): void {
    store.update(state => ({
      ...state,
      filters: { ...newFilters },
      activeFilters: (Object.keys(newFilters)?.length || 0),
      isDefault: false
    }));
  }

  updateFilters(newFilters: Partial<Filters>): void {
    store.update(state => ({
      ...state,
      filters: { ...state.filters, ...newFilters },
      activeFilters: (Object.keys(state.filters)?.length || 0) + (Object.keys(newFilters)?.length || 0),
      isDefault: false
    }));
  }

  resetFilters(): void {
    this.setFilters(defaultFilters);
    store.update(setProp('activeFilters', 0));
  }
}
