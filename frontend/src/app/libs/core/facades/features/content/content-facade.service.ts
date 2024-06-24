import { Injectable } from '@angular/core';
import { EntityFacade } from '../../common/entity-facade.model';
import { ContentsApiService } from '@app/libs/core/services';
import { BaseResponse, Content, ContentGet } from '@app/libs/core/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentFacadeService implements EntityFacade<Content> {
  constructor(private contentsApiService: ContentsApiService) {}

  getList(params: ContentGet): Observable<BaseResponse<Content>> {
    return this.contentsApiService.getList(params);
  }
}
