import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IsSelectionRowPipe, ProgressBarComponent } from '@app/libs/shared';
import { Dictionary } from '@app/libs/core/models';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dictionary-table-body-row, [app-dictionary-table-body-row]',
  standalone: true,
  imports: [CommonModule, TableModule, ProgressBarComponent, CheckboxModule, IsSelectionRowPipe, FormsModule, TranslateModule],
  templateUrl: './dictionary-table-body-row.component.html',
  styleUrls: ['./dictionary-table-body-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryTableBodyRowComponent {
  @Input() dictionary?: Dictionary;
  @Input() rowIndex = 0;
  @Input() selectionIds: number[] = [];

  @Output() selectionChange = new EventEmitter<boolean>();
}
