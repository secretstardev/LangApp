import { Injectable } from '@angular/core';
import { HttpApiService } from '../../http-api.service';
import { EntityService } from '../../common/entity-service.model';
import { Observable } from 'rxjs';
import { BaseResponse, Content, ContentGet } from '@app/libs/core/models';

@Injectable({
  providedIn: 'root',
})
export class ContentsApiService implements EntityService<Content> {
  basePath = 'contents';

  constructor(private httpApi: HttpApiService) {
  }

  getList(params: ContentGet): Observable<BaseResponse<Content>> {
    return this.httpApi.get(this.basePath, params);
  }
}
