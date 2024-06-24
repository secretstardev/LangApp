import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dictionary-form-page',
  templateUrl: './dictionary-form-page.component.html',
  styleUrls: ['./dictionary-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryFormPageComponent {
  @HostBinding('class.typography') enableTypography = true;
}
