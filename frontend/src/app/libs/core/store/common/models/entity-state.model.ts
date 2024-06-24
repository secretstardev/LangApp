export type BaseStoreActionKeys = 'retrieveList' | 'getOne' | 'create' | 'deleteOne' | 'updateOne' | 'share' | 'addTo' | 'moveTo' | 'removeFrom';

export interface EntityState<T> {
  entities: T[];
  statusList: EntityStateStatusList;
}

export type EntityStateStatusList = { [key in BaseStoreActionKeys]: EntityStateStatus } & { [key: string]: EntityStateStatus };

export interface EntityStateStatus {
  status?: 'pending' | 'success' | 'error';
  params?: unknown;
}
