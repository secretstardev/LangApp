import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon';
import { TranslateModule } from '@ngx-translate/core';

type MessageType = 'not-found' | 'access-denied';

@Component({
  selector: 'app-message-with-image',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './message-with-image.component.html',
  styleUrls: ['./message-with-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageWithImageComponent {
  @HostBinding('class.typography') enableTypography = true;
  @Input() type?: 'not-found' | 'access-denied';
  @Input() text?: string;
  @Input() title?: string;
  @Input() size: 'default' | 'small' = 'default';

  defaultMessages: Record<MessageType, { text: string; title: string }> = {
    'access-denied': {
      title: 'MessageWithImage.AccessDeniedTitle',
      text: 'MessageWithImage.AccessDeniedDescription',
    },
    'not-found': {
      title: 'MessageWithImage.NotFoundTitle',
      text: 'MessageWithImage.NotFoundDescription',
    },
  };
}
