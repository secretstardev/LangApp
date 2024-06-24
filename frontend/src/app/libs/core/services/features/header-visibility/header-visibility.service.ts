import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderVisibilityService {
  private showHeaderSubject = new BehaviorSubject<boolean>(true);
  public showHeader$ = this.showHeaderSubject.asObservable();

  setShowHeader(visible: boolean) {
    this.showHeaderSubject.next(visible);
  }
}
