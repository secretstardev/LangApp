import { Component, Input } from '@angular/core';
import { Tariff, User } from '@app/interfaces/common.interface';

@Component({
  selector: 'app-home-study-message-box',
  templateUrl: './home-study-message-box.component.html',
  styleUrls: ['./home-study-message-box.component.scss'],
})
export class HomeStudyMessageBoxComponent {
  @Input() learningMinutes?: number;
  @Input() goalMinutes?: number;
  @Input() user?: User;
  protected readonly Tariff = Tariff;
}
