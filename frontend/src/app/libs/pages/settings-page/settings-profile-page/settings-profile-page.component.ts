import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-profile-page',
  templateUrl: './settings-profile-page.component.html',
  styleUrls: ['./settings-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsProfilePageComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  constructor() {}

  ngOnInit(): void {}
}
