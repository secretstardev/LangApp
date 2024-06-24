import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FilterExpansionEvent, Filters, FiltersConfig } from '@app/libs/features/materials/filters/filters.model';
import { SharedModule } from '@app/shared/shared.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, Observable, Subscription, take } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DropdownComponent, DropdownItem, GeneralHelper, IconComponent, MultiselectComponent } from '@app/libs/shared';
import { UserService } from '@app/services/user.service';
import { SearchFieldComponent } from '@app/libs/features/search-field/search-field.component';
import { MATERIAL_FILTER_DEFAULTS } from '@app/libs/features/materials/filters/filters.config';
import { FiltersStore } from '@app/libs/core/store/features/materials/filters';

enum FormFields {
  categoryId = 'categoryId',
  level = 'level',
  length = 'length',
  sort = 'sort',
  titleLang = 'titleLang',
  isStudied = 'isStudied',
  search = 'search',
}

interface FiltersForm {
  [FormFields.categoryId]: FormControl<number[]>;
  [FormFields.level]: FormControl<string>;
  [FormFields.length]: FormControl<{ gt?: string; lt?: string }>;
  [FormFields.sort]: FormControl<string>;
  [FormFields.titleLang]: FormControl<string>;
  [FormFields.isStudied]: FormControl<string>;
  [FormFields.search]: FormControl<string>;
}

@UntilDestroy()
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, TranslateModule, SharedModule, ReactiveFormsModule, SearchFieldComponent, IconComponent, DropdownComponent, MultiselectComponent, DropdownComponent],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, AfterViewInit {
  @Input()
    config: FiltersConfig;

  @Input()
    availableValues: Record<string, Observable<DropdownItem[]>>;

  @Input()
    isExpandable: boolean;

  @Input()
    preventFormReInitialization = false;

  @Output()
    filterChange: EventEmitter<Filters> = new EventEmitter<Filters>();

  @Output()
    controlExpanded: EventEmitter<FilterExpansionEvent> = new EventEmitter<FilterExpansionEvent>();

  currentOffset = 0;
  mainForm: FormGroup<FiltersForm>;
  _valueChangeSub: Subscription;

  private localFilterState: Filters;

  constructor(private apiService: ApiService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private store: FiltersStore) {
  }

  ngOnInit(): void {
    this.formGroupRoutine();
  }

  ngAfterViewInit() {
    combineLatest([
      this.store.default$,
      this.store.filters$
    ]).pipe(untilDestroyed(this)).subscribe(([isDefault, filters]) => {
      this.localFilterState = filters;
      if (!isDefault && !GeneralHelper.deepEqual(this.localFilterState, this.mainForm)) {
        const resetValues = Object.keys(this.mainForm.controls).reduce((acc, key) => ({ ...acc, [key]: null }), {});
        this.mainForm.patchValue({ ...resetValues, ...this.localFilterState }, { emitEvent: false });
      }
    });
  }

  formGroupRoutine(): void {
    this.mainForm = new FormGroup<FiltersForm>({
      [FormFields.categoryId]: new FormControl<number[]>(MATERIAL_FILTER_DEFAULTS[FormFields.categoryId],
        { nonNullable: true }),
      [FormFields.level]: new FormControl<string>(MATERIAL_FILTER_DEFAULTS[FormFields.level], { nonNullable: true }),
      [FormFields.length]: new FormControl<{ gt?: string; lt?: string }>(MATERIAL_FILTER_DEFAULTS[FormFields.length],
        { nonNullable: true }),
      [FormFields.sort]: new FormControl<string>(MATERIAL_FILTER_DEFAULTS[FormFields.sort], { nonNullable: true }),
      [FormFields.titleLang]: new FormControl<string>(MATERIAL_FILTER_DEFAULTS[FormFields.titleLang],
        { nonNullable: true }),
      [FormFields.isStudied]: new FormControl<string>(MATERIAL_FILTER_DEFAULTS[FormFields.isStudied],
        { nonNullable: true }),
      [FormFields.search]: new FormControl<string>(MATERIAL_FILTER_DEFAULTS[FormFields.search], { nonNullable: true }),
    });

    this._valueChangeSub?.unsubscribe();
    this._valueChangeSub = this.mainForm.valueChanges.pipe(untilDestroyed(this))
      .subscribe((e) => this.onFormUpdated(e));

    this.route.queryParams.pipe(take(1), untilDestroyed(this)).subscribe(params => {
      if (Object.keys(params).length === 0 && !this.preventFormReInitialization) {
        this.setDefaultFilters().subscribe();
      }
    });
  }

  onFormUpdated(newValues: any) {
    this.store.setFilters(newValues);
    this.filterChange.emit(newValues);
  }

  setDefaultFilters(): Observable<void> {
    this.mainForm.reset(MATERIAL_FILTER_DEFAULTS, { emitEvent: false });
    this.setFavoriteCategories();

    return combineLatest([this.userService.user$.asObservable(), this.apiService.getUserContentLevelsMap()]).pipe(
      take(1),
      map(([user, mapValues]) => {
        if (user.languageLevel) {
          const filterLevel = mapValues.find((el) => el.userKnowledge === user.languageLevel).filterValue;
          filterLevel && this.mainForm.get(FormFields.level).patchValue(filterLevel);
        }
      }),
      untilDestroyed(this)
    );
  }

  setFavoriteCategories() {
    const favoriteCategoryIds = this.getFavoriteCategories();
    if (favoriteCategoryIds?.length) {
      this.mainForm.get(FormFields.categoryId).patchValue(favoriteCategoryIds);
    }
  }

  getFavoriteCategories() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.favoriteCategoryId || [];
  }
}
