import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from '@app/services/api.service';
import { UntypedFormBuilder } from '@angular/forms';
import { CustomValidator } from '@app/services/custom-validator';
import { map, Observable, of, shareReplay, take } from 'rxjs';
import { Content } from '@app/interfaces/common.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatingService } from '@app/services/translating.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ViewportScroller } from '@angular/common';
import { UserService } from '@app/services/user.service';
import { MaterialsDataSource } from '@app/libs/features/materials/materials.data-source';
import { ContentsApiService } from '@app/libs/core/services';
import { DropdownItem, GeneralHelper } from '@app/libs/shared';
import {
  materialsCardPageConfig,
  materialsListPageFilterConfig
} from '@app/libs/pages/content/components/materials-list-page/materials-list-page.config';
import { Filters } from '@app/libs/features/materials/filters/filters.model';
import { MaterialSortOptions, MaterialStudiedOptions } from '@app/content/materials/common/constant';
import { FiltersComponent } from '@app/libs/features/materials/filters';
import { NavigationStateService } from '@app/libs/core/services/common/navigation-state-service.service';
import { FiltersStore } from '@app/libs/core/store';

@UntilDestroy()
@Component({
  selector: 'app-materials-page',
  templateUrl: './materials-list-page.component.html',
  styleUrls: ['./materials-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MaterialsListPageComponent implements OnInit, OnDestroy {
  @HostBinding('class.typography') enableTypography = true;

  buttons = materialsCardPageConfig;
  filterConfig = materialsListPageFilterConfig;

  loading$: Observable<boolean>;
  dataSource$: Observable<MaterialsDataSource>;
  dataSource: MaterialsDataSource;

  currentOffset = 0;
  currentPerPage;
  defaultPerPage;
  _lastAppliedFilter;

  itemSize = 174;
  isInitialOffset = true;
  filters: Filters = {};
  availableValues: Record<string, Observable<DropdownItem[]>> = {};

  initialized = false;

  @ViewChild(CdkVirtualScrollViewport)
    cdkScroll: CdkVirtualScrollViewport;

  @ViewChild('filtersBlock')
    filtersComponent: FiltersComponent;

  constructor(
    private api: ApiService,
    private contentsApiService: ContentsApiService,
    private customValidator: CustomValidator,
    private formBuilder: UntypedFormBuilder,
    private translatingService: TranslatingService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private viewportScroller: ViewportScroller,
    private navigationStateService: NavigationStateService,
    private store: FiltersStore
  ) {
    this.route.queryParams.pipe(take(1), untilDestroyed(this)).subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.filters = (params['filter'] && GeneralHelper.base64ToObject(params['filter']));
        this.store.updateFilters(this.filters);
      } else {
        this.store.setDefault(true);
      }
    });
  }

  ngOnInit() {
    this.store.filters$.pipe(untilDestroyed(this)).subscribe(filters => {
      const isEqual = GeneralHelper.deepEqual(this.filters, filters);
      this.filters = filters;
      !isEqual && this.updateUrl();
    });

    this.readDefaultsConfig();
    this.analyzeRoute();
    this.setAvailableValues();
    this.dataSource$ = GeneralHelper.allParams(this.route).pipe(
      map((params) => {
        if (this._lastAppliedFilter === params['filter']) {
          const formParams = GeneralHelper.toQueryParams(this.filters, 'filter');
          this.dataSource = new MaterialsDataSource(formParams, this.contentsApiService, this.currentOffset,
            this.navigationStateService);
          return this.dataSource;
        }
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemSize();
  }

  setAvailableValues(): void {
    this.filterConfig.fields.forEach((field) => {
      this.availableValues[field.filterKey] = this.getFilterValues(field.filterKey);
    });
  }

  getFilterValues(filterKey: string): Observable<DropdownItem[]> {
    switch (filterKey) {
      case 'categoryId':
        return this.api.getAllCategories({ 'per-page': '100' }).pipe(
          map((categories) =>
            categories.items.map((item) => ({
              value: item.id,
              label: item.title,
            }))
          ),
          shareReplay(1)
        );
      case 'level':
        return this.api.getContentLevels().pipe(shareReplay(1));
      case 'length':
        return this.api.getContentLengthVariants().pipe(shareReplay(1));
      case 'sort':
        return of(MaterialSortOptions);
      case 'titleLang':
        return this.api.getContentTitleLanguages().pipe(shareReplay(1));
      case 'isStudied':
        return of(MaterialStudiedOptions);
    }
  }

  updateItemSize() {
    const cards = this.cdkScroll.elementRef.nativeElement?.querySelectorAll('.card');
    if (cards && cards[0] && cards[1]) {
      this.itemSize = cards[1].getBoundingClientRect().y - cards[0].getBoundingClientRect().y;
    } else {
      setTimeout(() => {
        this.updateItemSize();
      }, 1000);
    }
  }


  updateUrl(): void {
    this.router.navigate([], { queryParams: this.getQueryParamsForUrl(), replaceUrl: true });
  }

  getQueryParamsForUrl() {
    const params = {};
    if (this.currentPerPage !== this.defaultPerPage) {
      params['per-page'] = String(this.currentPerPage);
    }
    const filterValue = GeneralHelper.filterEmptyFromObject(this.filters);
    if (typeof filterValue?.categoryId === 'object' && filterValue?.categoryId?.length === 0) {
      // set categoryId as [-1] (indication for empty array) to add condition to remove all the Favorite categoryIds
      filterValue.categoryId = [-1];
    }

    for (const key of Object.keys(filterValue)) {
      if (typeof filterValue[key] === 'boolean') {
        filterValue[key] = filterValue[key] ? 1 : 0;
      }
    }

    if (Object.keys(filterValue).length !== 0) {
      params['filter'] = GeneralHelper.objectToBase64(filterValue);
    }
    if (this.currentOffset !== 0) {
      params['offset'] = this.currentOffset;
    }

    return params;
  }

  readDefaultsConfig(): void {
    this.defaultPerPage = this.filterConfig?.defaults?.defaultPerPage ?? 20;
    this.currentPerPage = this.defaultPerPage;
  }

  analyzeRoute(): void {
    GeneralHelper.allParams(this.route)
      .pipe(
        map((params) => {
          this.currentOffset = params['offset'] !== undefined ? Number(params['offset']) : 0;
          this.currentPerPage = params['per-page'] !== undefined ?
            Number(params['per-page']) :
            this.defaultPerPage;

          if (this.initialized &&
                       Object.keys(GeneralHelper.filterEmptyFromObject(this.filters))?.length !== 0 &&
                       Object.keys(params)?.length === 0) {
            this.filters = {};
            this.filtersComponent.setDefaultFilters().subscribe();
            return;
          }

          if (this.filters && params['filter'] !== this._lastAppliedFilter) {

            let filter: any = (params['filter'] && GeneralHelper.base64ToObject(params['filter'])) || '';
            if (filter?.categoryId?.length && filter?.categoryId[0] === -1) {
              filter = {
                ...filter,
                categoryId: [],
              };
            }

            const newFilterValue = { ...this.filters, ...filter };
            // do not update form if nothing will change
            const isSameValue = GeneralHelper.deepEqual(newFilterValue, this.filters);
            if (!isSameValue) {
              this.store.setFilters(newFilterValue);
            }
          }
          this._lastAppliedFilter = params['filter'];
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  offsetChanged(newOffset: number) {
    if (this.isInitialOffset) {
      this.isInitialOffset = false;
      this.updateItemSize();
      setTimeout(() => {
        const scrollPosition = this.viewportScroller.getScrollPosition();
        if (this.cdkScroll && scrollPosition[1] == 0 && newOffset == 0 && this.currentOffset != 0) {
          const viewportOffset = this.cdkScroll.measureViewportOffset();
          this.cdkScroll.scrollToOffset(Math.ceil(viewportOffset + this.currentOffset * this.itemSize));
        }
      });
    } else {
      this.currentOffset = newOffset;
      if (window) {
        // avoid triggering Angular route update
        let newUrl = window.location.href
          .replace(/\?offset=\d+/, '?')
          .replace(/&offset=\d+/, '')
          .replace(/\?$/, '');
        newUrl += newUrl.includes('?') ? '&' : '?';
        newUrl += this.currentOffset > 0 ? 'offset=' + this.currentOffset : '';
        window.history.replaceState(window.history.state, null, newUrl);
      }
    }
  }

  trackById(index: number, item: Content[]) {
    return item?.[0]?.id || -1 * index;
  }

  removeFromFeed(id): void {
    this.api
      .setContentHiddenAttribute(id, {
        isHidden: true,
      })
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.dataSource.removeElement((el) => el.id === id);
      });
    this.cdkScroll.checkViewportSize();
  }

  ngOnDestroy() {
    this.store.resetFilters();
  }
}
