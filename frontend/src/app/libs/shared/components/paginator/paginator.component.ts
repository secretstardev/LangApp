import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PaginationData } from '@ngneat/elf-pagination';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() pagination?: PaginationData;
  @Output() pageChange = new EventEmitter<Partial<PaginationData>>();

  onPageChange(event: PaginatorState) {
    this.pageChange.emit({
      perPage: event.rows,
      currentPage: event.page + 1,
    });
  }
}
