import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarCalcPipe } from './progress-bar-calc.pipe';
import { TippyDirective } from '@ngneat/helipopper';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, ProgressBarCalcPipe, TippyDirective, TranslateModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() type: 'circle' | 'rect' = 'circle';
  @Input() tooltip = '';
  @Input() fillColor: 'primary' | 'success' | 'disabled' = 'success';

  @HostBinding('class.isRect')
  get isRectClass(): boolean {
    return this.type === 'rect';
  }
}
