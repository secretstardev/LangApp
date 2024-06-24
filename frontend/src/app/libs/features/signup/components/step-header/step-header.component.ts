import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-step-header',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepHeaderComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  size: 'big' | 'normal' | 'small' = 'normal';

  @Input()
  allowBack = true;

  @Output()
  goBack: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
