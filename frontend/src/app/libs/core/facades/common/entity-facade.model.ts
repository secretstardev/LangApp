import { Observable } from 'rxjs';
import { BaseResponse } from '@app/libs/core/models';

export interface EntityFacade<T> {
  getList?: (params?: any) => Observable<BaseResponse<T>>;
  getOne?: (id: string, params?: any) => Observable<T>;
  create?: (params: any) => Observable<T>;
  update?: (params: any) => Observable<T>;

  retrieveList?: (params?: any) => void;

  selectList$?: Observable<T[]>;
}
