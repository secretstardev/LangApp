import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldError } from '@app/interfaces/common.interface';
import { IconComponent } from '@app/libs/shared';

@Component({
  selector: 'app-message-error',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageErrorComponent {
  @Input()
  errors: FieldError[] = [];

  close(index: number): void {
    this.errors = this.errors.filter((_, i) => i !== index);
  }
}
