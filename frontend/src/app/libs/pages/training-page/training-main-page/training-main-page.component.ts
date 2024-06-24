import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-training-main-page',
  templateUrl: './training-main-page.component.html',
  styleUrls: ['./training-main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingMainPageComponent {
  @HostBinding('class.typography') enableTypography = true;
}
