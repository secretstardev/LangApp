import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingStartPageComponent } from './training-start-page/training-start-page.component';
import { routingConfig } from '@app/libs/config';
import { TrainingMainPageComponent } from './training-main-page/training-main-page.component';
import { trainingStartGuard } from './guards/training-start.guard';

const routes: Routes = [
  {
    path: '',
    component: TrainingStartPageComponent,
  },
  {
    path: routingConfig.training2.start.path,
    component: TrainingMainPageComponent,
    canActivate: [trainingStartGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPageRoutingModule {}
