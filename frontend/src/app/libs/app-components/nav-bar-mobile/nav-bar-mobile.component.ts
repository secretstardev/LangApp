import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navBarMobileItems } from '@app/libs/app-components/nav-bar-mobile/nav-bar-mobile.config';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from '@app/libs/shared';

@Component({
  selector: 'app-nav-bar-mobile',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, IconComponent],
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarMobileComponent {
  @HostBinding('class.typography') enableTypography = true;

  items = navBarMobileItems;
}
