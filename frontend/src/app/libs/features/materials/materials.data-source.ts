import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Content } from '@app/interfaces/common.interface';
import { Dictionary } from '@app/shared/helpers';
import chunk from 'lodash/chunk';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NavigationStateService } from '@app/libs/core/services/common/navigation-state-service.service';
import { ContentsApiService } from '@app/libs/core/services';

export class MaterialsDataSource extends DataSource<Content[] | undefined> {
  public get length() {
    return this._cachedData.length;
  }

  public pageSize = 10;
  public itemsPerRow = 1;
  public totalLength = 0;

  private _pagesToLoadAfterRemoval = 2;
  private _realPageSize = this.pageSize * this.itemsPerRow;
  private _maxAccessedPage = 0;
  private _randomSeed = Math.random();

  private _cachedData = Array.from<Content[]>({ length: this.currentOffset + this.pageSize });
  private _fetchedPages = new Set<number>();
  private _pendingRequests: { page: number; subscription: Subscription }[] = [];
  private _maxPendingRequests = 3;
  private _fullScrollMode = false;
  private readonly _dataStream = new BehaviorSubject<(Content[] | undefined)[]>(this._cachedData);
  private readonly _subscription = new Subscription();
  private cacheKey = 'materialsDataSource';

  constructor(public formParams: Dictionary<string>,
              private contentsApiService: ContentsApiService,
              public currentOffset = 0,
              private navigationStateService: NavigationStateService) {
    super();
    console.log("CONSTRUCTOR")
    this._loadState();
    this._fetchPage(1);
  }

  public connect(collectionViewer: CollectionViewer): Observable<(Content[] | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      })
    );
    return this._dataStream;
  }

  public disconnect(): void {
    this._subscription.unsubscribe();
    this.limitPendingRequests(0);
  }

  public limitPendingRequests(maxPendingRequests = this._maxPendingRequests) {
    if (this._pendingRequests.length >= maxPendingRequests) {
      const toCancel = this._pendingRequests.splice(0, this._pendingRequests.length - maxPendingRequests);
      for (const item of toCancel) {
        item.subscription.unsubscribe();
        this._fetchedPages.delete(item.page);
      }
    }
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize) + 1;
  }

  private async _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }

    this._fetchedPages.add(page);
    const queryParams = this.getQueryParams(page);
    const subscription = this.contentsApiService.getList(queryParams).subscribe((result) => {
      this._maxAccessedPage = Math.max(this._maxAccessedPage, page);

      if (this.totalLength != result._meta.totalCount / this.itemsPerRow) {
        this.totalLength = result._meta.totalCount / this.itemsPerRow;
        if (this._fullScrollMode) {
          this._cachedData.length = this.totalLength;
        }
      }
      if (!this._fullScrollMode) {
        this._cachedData.length = Math.min(
          Math.max(this._cachedData.length, (this._maxAccessedPage + 1) * this.pageSize), this.totalLength);
      }
      this._cachedData.splice((page - 1) * this.pageSize, this.pageSize, ...chunk(result.items, this.itemsPerRow));
      this._dataStream.next(this._cachedData);
      this._updateState();

      this._pendingRequests = this._pendingRequests.filter((r) => r.page != page);
    });

    this._pendingRequests.push({ page, subscription });
    this.limitPendingRequests();
  }

  private getQueryParams(page: number) {
    const params = { ...this.formParams };
    if (params['filter[sort]']) {
      params['sort'] = params['filter[sort]'];
      if (params['sort'] === 'random') {
        params['randomSeed'] = `${this._randomSeed}`;
      }
      delete params['filter[sort]'];
    }

    if (!params['filter[isHidden]']) {
      params['filter[isHidden]'] = '0';
    }

    if (params['filter[titleLang]']) {
      delete params['filter[titleLang]'];
    }

    if (params['filter[isStudied]'] === '3') {
        params['filter[isHidden]'] = '1';
        delete params['filter[isStudied]'];
    }

    params['filter[status]'] = '1';
    params['filter[deleted]'] = '0';

    params['page'] = String(page);
    params['per-page'] = String(this._realPageSize);

    return params;
  }

  private _loadState() {
    if (window) {
      const state = this.navigationStateService.getState(this.cacheKey);

      if (state && JSON.stringify(state.formParams) == JSON.stringify(this.formParams)) {
        this._cachedData = state._cachedData;
        this._fetchedPages = state._fetchedPages;
        this.totalLength = state.totalLength;
        this._dataStream.next(this._cachedData);
      }
    }
  }

  private _updateState() {
    if (window) {
      this.navigationStateService.saveState(this.cacheKey, this._generateState());
    }
  }

  private _generateState() {
    return {
      _cachedData: this._cachedData,
      _fetchedPages: this._fetchedPages,
      totalLength: this.totalLength,
      formParams: this.formParams,
    };
  }

  public removeElement(condition: (content: Content) => boolean): void {
    if (this.formParams['filter[isHidden]'] === '1') {
      return;
    }

    const index = this._cachedData.findIndex((contentArr) => contentArr?.find((content) => condition(content)));
    const page = this._getPageForIndex(index);
    this._invalidateBelow(page);
  }

  private _invalidateBelow(page: number): void {
    for (let i = page; i <= this._maxAccessedPage; i++) {
      this._fetchedPages.delete(i);

      if (i < page + this._pagesToLoadAfterRemoval) {
        this._fetchPage(i);
      } else {
        this._cachedData.splice(i * this.pageSize, this.pageSize, ...Array(this.pageSize).fill(undefined));
      }
    }
  }
}
