import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent } from '../../icon';

@Component({
  selector: 'app-button-more',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent],
  templateUrl: './button-more.component.html',
  styleUrls: ['./button-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonMoreComponent {
  @Output() btnClick = new EventEmitter<void>();
}
