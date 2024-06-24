import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { IconComponent, IconType } from '../../icon';

@Component({
  selector: 'app-button-next',
  standalone: true,
  imports: [CommonModule, IconModule, RippleModule, ButtonModule, IconComponent],
  templateUrl: './button-next.component.html',
  styleUrls: ['./button-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonNextComponent {
  @HostBinding('class.typography') enableTypography = true;

  @Input() icon?: IconType;
  @Input() iconColor?: string;
  @Input() background?: string;

  @Output() btnClick = new EventEmitter<void>();
}
