import { Directive, HostListener } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { UserService } from '@app/services/user.service';
import { caretRangeFromPoint, showForRange, state } from '../../../../../../extension/build-for-site/common';

@Directive({
  selector: '[onclickTranslation]',
  standalone: true,
})
export class OnclickTranslationDirective {
  constructor(private api: ApiService, private userService: UserService) {}

  @HostListener('click', ['$event'])
  onClickTranslation(e: MouseEvent) {
    state.apiCall = (httpMethod: string, apiMethod: string, body: any) => {
      return this.api.apiRequest(httpMethod, apiMethod, { body }).toPromise();
    };
    state.user = this.userService.user$.value;
    showForRange(caretRangeFromPoint(e.x, e.y));
  }
}
