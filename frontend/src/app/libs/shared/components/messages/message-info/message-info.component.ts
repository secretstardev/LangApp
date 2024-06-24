import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-info',
  templateUrl: './message-info.component.html',
  styleUrls: ['./message-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class MessageInfoComponent {
  @HostBinding('class.typography') enableTypography = true;
  @Input() type: 'success' | 'error' = 'success';
}
