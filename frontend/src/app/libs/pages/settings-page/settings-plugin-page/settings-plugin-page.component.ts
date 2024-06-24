import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-plugin-page',
  templateUrl: './settings-plugin-page.component.html',
  styleUrls: ['./settings-plugin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPluginPageComponent implements OnInit {
  @HostBinding('class.typography') enableTypography = true;

  constructor() {}

  ngOnInit(): void {}
}
