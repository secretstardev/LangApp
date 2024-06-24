import { BaseStoreActionKeys, EntityState, EntityStateStatus, EntityStateStatusList } from '../models';

const defaultStatus: EntityStateStatus = {
  status: undefined,
  params: undefined,
};

export const defaultStatusList: EntityStateStatusList = {
  retrieveList: { ...defaultStatus },
  getOne: { ...defaultStatus },
  create: { ...defaultStatus },
  deleteOne: { ...defaultStatus },
  updateOne: { ...defaultStatus },
  share: { ...defaultStatus },
  addTo: { ...defaultStatus },
  moveTo: { ...defaultStatus },
  removeFrom: { ...defaultStatus },
};

export function onStoreActionStart<T>(key: BaseStoreActionKeys, state: EntityState<T>): Partial<EntityState<T>> {
  return {
    statusList: {
      ...state.statusList,
      [key]: { status: 'pending' },
    },
  };
}

export function onStoreActionComplete<T>(key: BaseStoreActionKeys, result: T[], state: EntityState<T>): Partial<EntityState<T>> {
  return {
    entities: result,
    statusList: {
      ...state.statusList,
      [key]: { status: 'success', params: result },
    },
  };
}

export function onStoreActionError<T>(key: BaseStoreActionKeys, result: unknown, state: EntityState<T>): Partial<EntityState<T>> {
  return {
    statusList: {
      ...state.statusList,
      [key]: { status: 'error', params: result },
    },
  };
}
