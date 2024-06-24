import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-dictionary-table-header-row]',
  standalone: true,
  imports: [CommonModule, TableModule, TranslateModule, CheckboxModule, FormsModule],
  templateUrl: './dictionary-table-header-row.component.html',
  styleUrls: ['./dictionary-table-header-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryTableHeaderRowComponent {
  @Input() selectAll = false;
  @Input() colspanCount: number = 0;

  @Output() selectAllChange = new EventEmitter<boolean>();
}
