import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, IconComponent, TranslateModule],
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TablePaginatorComponent implements OnInit {

  @Input()
  pageSize: number;

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild('paginator')
  public paginatorComponent: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
  }

}
