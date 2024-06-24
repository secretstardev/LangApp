import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonsMenuComponent, IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: '[app-dictionary-table-footer-row]',
  standalone: true,
  imports: [CommonModule, ButtonModule, IconComponent, TranslateModule, ButtonsMenuComponent],
  templateUrl: './dictionary-table-footer-row.component.html',
  styleUrls: ['./dictionary-table-footer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryTableFooterRowComponent {
  @Input() selectedCount: number = 0;
  @Input() colspanCount: number = 0;
  @Input() isAllList = false;

  @Output() moveToEntities = new EventEmitter<void>();
  @Output() copyToEntities = new EventEmitter<void>();
  @Output() entitiesDelete = new EventEmitter<Event>();
  @Output() importWords = new EventEmitter<void>();
}
