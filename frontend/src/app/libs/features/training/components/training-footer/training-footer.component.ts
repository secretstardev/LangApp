import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-training-footer',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule],
  templateUrl: './training-footer.component.html',
  styleUrls: ['./training-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingFooterComponent {
  @Input() isAnswered = false;
  @Input() hasAnswer = false;

  @Output() clickContinue = new EventEmitter<void>();
  @Output() clickDontRemember = new EventEmitter<void>();
}
