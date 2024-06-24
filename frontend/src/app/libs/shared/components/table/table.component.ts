import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoSizeVirtualScrollStrategy, RxVirtualFor, RxVirtualScrollViewportComponent } from '@rx-angular/template/experimental/virtual-scrolling';
import { RequestResult } from '@ngneat/elf-requests';
import { PaginationData } from '@ngneat/elf-pagination';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RequestDataStatusPipe } from './utils/request-data-status.pipe';
import { first, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageWithImageComponent } from '../messages';
import { PaginatorComponent } from '../paginator';

@UntilDestroy()
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, AutoSizeVirtualScrollStrategy, RxVirtualFor, RxVirtualScrollViewportComponent, ProgressSpinnerModule, RequestDataStatusPipe, MessageWithImageComponent, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> implements OnChanges {
  @Input() requestData: RequestResult & { data: T[] };
  @Input() pagination?: PaginationData;

  @Output() lazyLoad = new EventEmitter<Partial<PaginationData>>();
  @Output() pageChange = new EventEmitter<Partial<PaginationData>>();

  @ViewChild('tBody', { read: ElementRef }) tBody: ElementRef;
  @ContentChild('headerTemplate') headerTemplate!: TemplateRef<unknown>;
  @ContentChild('rowTemplate') rowTemplate!: TemplateRef<unknown>;
  @ContentChild('footerTemplate') footerTemplate!: TemplateRef<unknown>;

  private scrollHandler: any;

  ngOnChanges(changes: SimpleChanges) {
    if ('requestData' in changes && this.requestData) {
      if (this.requestData.data.length) {
        timer(500)
          .pipe(first(), untilDestroyed(this))
          .subscribe(() => {
            this.onScrollListener();
          });
      }
    }
  }

  onScrollListener(): void {
    const scrollViewport = this.tBody.nativeElement.querySelector('.rx-virtual-scroll__runway');

    if (this.scrollHandler) {
      scrollViewport.removeEventListener('scroll', this.scrollHandler);
    }

    this.scrollHandler = this.onLazyLoadEmit.bind(this);
    scrollViewport.addEventListener('scroll', this.scrollHandler);
  }

  onLazyLoadEmit(event: Event): void {
    const target = event.target as HTMLElement;
    const atBottom = target.scrollTop + target.clientHeight === target.scrollHeight;
    if (atBottom && !this.requestData.isLoading && this.pagination?.lastPage >= this.pagination?.currentPage + 1) {
      this.lazyLoad.emit({ perPage: this.pagination.perPage, currentPage: this.pagination.currentPage + 1 });
    }
  }
}
