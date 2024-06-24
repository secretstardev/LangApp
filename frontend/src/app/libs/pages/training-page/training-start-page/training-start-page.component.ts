import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-training-start-page',
  templateUrl: './training-start-page.component.html',
  styleUrls: ['./training-start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingStartPageComponent {
  @HostBinding('class.typography') enableTypography = true;
}
