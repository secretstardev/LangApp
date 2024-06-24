import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingConfig } from '@app/libs/config/routing.config';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsProfilePageComponent } from './settings-profile-page/settings-profile-page.component';
import { SettingsPluginPageComponent } from './settings-plugin-page/settings-plugin-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      {
        path: '',
        redirectTo: routingConfig.settings.profile.fullPath,
        pathMatch: 'full',
      },
      {
        path: routingConfig.settings.profile.path,
        component: SettingsProfilePageComponent,
      },
      {
        path: routingConfig.settings.plugin.path,
        component: SettingsPluginPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
