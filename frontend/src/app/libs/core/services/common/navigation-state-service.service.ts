import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {

  constructor(private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  saveState(cacheKey: string, state: any): void {
    const globalState = window.history.state || {};
    globalState[cacheKey] = { ...globalState[cacheKey], ...state };

    window.history.replaceState(globalState, null, null);
  }

  getState(cacheKey: string): any {
    const globalState = window.history.state;
    return globalState ? globalState[cacheKey] : null;
  }

  goBack(hasPreviousRoute): void {
    if (hasPreviousRoute) {
      this.location.back();
    } else {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
  }
}
