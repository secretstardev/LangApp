import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPluginFormComponent } from '@app/libs/features/settings/components/settings-plugin-form/settings-plugin-form.component';
import { SettingsProfileInfoComponent } from '@app/libs/features/settings';
import { ApiService } from '@app/services/api.service';
import { filter } from 'rxjs';
import { ApiError } from '@app/services/api-error';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserExtensionSettings } from '@app/libs/core/models';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-settings-plugin-container',
  standalone: true,
  imports: [CommonModule, SettingsPluginFormComponent, SettingsProfileInfoComponent],
  templateUrl: './settings-plugin-container.component.html',
  styleUrls: ['./settings-plugin-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPluginContainerComponent {
  user$ = this.api.usersMe();

  constructor(private api: ApiService, private messageService: MessageService, private translateService: TranslateService) {}

  save(id: number, extensionSettings: UserExtensionSettings) {
    this.api
      .updateUser({ id, extensionSettings })
      .pipe(
        filter((result) => !(result instanceof ApiError)),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('snackbar.settings-edit-success'),
          detail: this.translateService.instant('snackbar.settings-edit-success'),
        });
        window.postMessage({ type: 'saveSettingExtension' }, '*');
      });
  }
}
