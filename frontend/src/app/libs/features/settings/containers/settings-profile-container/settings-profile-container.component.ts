import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsProfileFormComponent, SettingsProfileInfoComponent } from '../../components';
import { ApiService } from '@app/services/api.service';
import { DropdownLanguagePipe, TimeZonesDropdownPipe } from '../../pipes';
import { User } from '@app/interfaces/common.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiError } from '@app/services/api-error';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@app/services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-settings-profile-container',
  standalone: true,
  imports: [CommonModule, SettingsProfileInfoComponent, SettingsProfileFormComponent, TimeZonesDropdownPipe, DropdownLanguagePipe],
  templateUrl: './settings-profile-container.component.html',
  styleUrls: ['./settings-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfileContainerComponent implements OnInit {
  combinedObservable$: Observable<any>;

  user$ = this.api.usersMe();
  languages$ = this.api.getAllLanguage();
  timeZones$ = this.api.getTimeZones();
  languageLevels$ = this.api.getLanguageLevels();

  constructor(private api: ApiService,
    private messageService: MessageService,
    private userService: UserService,
    private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.combinedObservable$ = combineLatest({
      user: this.user$,
      languages: this.languages$,
      timeZones: this.timeZones$,
      languageLevels: this.languageLevels$.pipe(map(levels => levels.map(level => ({
        label: level,
        value: level
      }))))
    });
  }

  save(user: Partial<User>) {
    this.api
      .updateUser(user)
      .pipe(
        filter((result) => !(result instanceof ApiError)),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('snackbar.settings-edit-success'),
          detail: this.translateService.instant('snackbar.settings-edit-success')
        });
        if (user.password) {
          this.userService.logout();
        }
      });
  }
}
