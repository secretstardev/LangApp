import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, IconComponent, InputTextModule, FormsModule],
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent {
  @Input() placeholder = 'Search';

  @Output() onFilterChange = new EventEmitter<string>();

  public value = '';
}
