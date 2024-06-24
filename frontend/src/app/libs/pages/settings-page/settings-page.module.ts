import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsProfilePageComponent } from './settings-profile-page/settings-profile-page.component';
import { SettingsPluginPageComponent } from './settings-plugin-page/settings-plugin-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { PageHeaderComponent } from '@app/libs/shared';
import { SettingsPluginContainerComponent, SettingsProfileContainerComponent } from '@app/libs/features/settings';

@NgModule({
  declarations: [SettingsProfilePageComponent, SettingsPluginPageComponent, SettingsPageComponent],
  imports: [CommonModule, SettingsPageRoutingModule, PageHeaderComponent, SettingsProfileContainerComponent, SettingsPluginContainerComponent],
})
export class SettingsPageModule {}
