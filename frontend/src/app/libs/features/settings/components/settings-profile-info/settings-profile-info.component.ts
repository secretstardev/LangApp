import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@app/interfaces/common.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-profile-info',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './settings-profile-info.component.html',
  styleUrls: ['./settings-profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfileInfoComponent {
  @Input() user?: User;
}
