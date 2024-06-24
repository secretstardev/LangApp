import { Observable } from 'rxjs';
import { BaseResponse } from '@app/libs/core/models';

export interface EntityService<T> {
  getList?: (params?: any) => Observable<BaseResponse<T>>;
  getOne?: (id: string, params?: any) => Observable<T>;
  create?: (params: any) => Observable<T>;
  update?: (params: any) => Observable<T>;
  move?: (params: any) => Observable<T>;
  deleteList?: (ids: number[], params?: any) => Observable<void>;

  basePath: string;
}
