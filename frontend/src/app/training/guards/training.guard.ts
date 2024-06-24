import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CardsService } from '@app/training/cards/cards.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingGuard  {
  constructor(private cardService: CardsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cardService.cards$.pipe(
      map((cards) => {
        if (cards) {
          return true;
        }
        return this.router.createUrlTree(['training/index']);
      })
    );
  }

  isUserOnTrainingPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const canActivateResult = this.canActivate(route, state);
    console.log(canActivateResult);
    if (typeof canActivateResult === 'boolean') {
      return canActivateResult;
    } else {
      return false; // Handle other return types as needed
    }
  }
}
