import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { TrainingStore } from '@app/libs/core/store';
import { routingConfig } from '@app/libs/config';

export const trainingStartGuard = (next: ActivatedRouteSnapshot) => {
  return inject(TrainingStore).drills$.pipe(
    map((drills) => {
      return drills.isSuccess ? true : createUrlTreeFromSnapshot(next, [routingConfig.training2.fullPath]);
    })
  );
};
