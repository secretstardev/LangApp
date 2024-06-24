import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconComponent } from '../../icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-footer',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent, TranslateModule],
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooterComponent {
  @Input() cancelBtnTitle = 'Cancel';
  @Input() applyBtnTitle = 'Apply';
  @Input() disabledApply = false;

  @Output() clickCancel = new EventEmitter<void>();
  @Output() clickApply = new EventEmitter<void>();
}
