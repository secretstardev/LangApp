import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '@app/services/api.service';

@Injectable()
export class PaymentRegistrationGuard  {
  constructor(private apiService: ApiService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.apiService.getUserPaymentMethods().pipe(
      map(paymentMethods => {
        if (paymentMethods && paymentMethods.length > 0) {
          return this.router.createUrlTree(['payment']);
        }
        return true;
      })
    );
  }
}
