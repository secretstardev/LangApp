import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateAdmin } from '@app/guards/canactivate-admin';
import { CanactivateNologged } from '@app/guards/canactivate-nologged';
import { CanactivateLogged } from '@app/guards/canactivate-logged';
import { ThemeMainComponent } from '@app/theme/theme.main.component';
import { routingConfig } from '@app/libs/config/routing.config';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [CanactivateAdmin],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: routingConfig.auth.path,
    canActivate: [CanactivateNologged],
    loadChildren: () => import('./libs/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'partners',
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./partners/partners.module').then((m) => m.PartnersModule),
  },
  {
    path: routingConfig.contacts.path,
    loadChildren: () => import('./libs/pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: routingConfig.dictionary.path,
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./libs/pages/dictionary-page/dictionary-page.module').then((m) => m.DictionaryPageModule),
  },
  {
    path: 'training',
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./training/training.module').then((m) => m.TrainingModule),
  },
  {
    path: routingConfig.payment.path,
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./libs/pages/payment/payment.module').then((m) => m.PaymentModule),
  },
  {
    path: routingConfig.training2.path,
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./libs/pages/training-page/training-page.module').then((m) => m.TrainingPageModule),
  },
  {
    path: 'content',
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./libs/pages/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: 'category',
    canActivate: [CanactivateAdmin],
    loadChildren: () => import('./category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: routingConfig.home.path,
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./libs/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: routingConfig.settings.path,
    canActivate: [CanactivateLogged],
    loadChildren: () => import('./libs/pages/settings-page/settings-page.module').then((m) => m.SettingsPageModule),
  },
  {
    path: routingConfig.notfound.path,
    loadChildren: () => import('./libs/pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: routingConfig.home.fullPath,
    pathMatch: 'full',
  },
  {
    path: '',
    component: ThemeMainComponent,
    children: routes,
  },
  {
    path: '**',
    redirectTo: routingConfig.notfound.fullPath,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
