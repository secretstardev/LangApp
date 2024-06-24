import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { FilterExpansionEvent } from '@app/libs/features/materials/filters/filters.model';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownItem } from '../dropdown';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BaseCvaControl } from '../../../utils';
import { IconComponent } from '@app/libs/shared/components/icon/icon.component';

@UntilDestroy()
@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [CommonModule, MultiSelectModule, ReactiveFormsModule, SharedModule, TranslateModule, IconComponent],
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true,
    },
  ],
})
export class MultiselectComponent extends BaseCvaControl<DropdownItem[]> implements OnInit {
  @Input()
  options: DropdownItem[];

  @Input()
  isExpandable: boolean;

  @Input()
  filterKey: string;

  @Input()
  styleClass: string;

  @Input()
  appendTo: string = 'body';

  @Input()
  optionLabel = 'label';

  @Input()
  optionValue = 'value';

  @Input()
  placeHolder: string;

  @Input()
  showClear: boolean;

  @Input()
  expandableBreakpoints: string[] = ['(max-width: 768px)', '(max-height: 900px)'];

  @Output()
  controlExpanded: EventEmitter<FilterExpansionEvent> = new EventEmitter<FilterExpansionEvent>();

  @ViewChild('multiSelect') multiSelect: MultiSelect;

  hidePanelDisplay = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private translateService: TranslateService) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.multiSelect?.overlayVisible) {
      this.multiSelect.overlayVisible = false;
      this.multiSelect.cd.detectChanges();
    }
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.updatePlaceholderValue();
    });
    this.breakpointObserver
        .observe(this.expandableBreakpoints)
        .pipe(untilDestroyed(this))
        .subscribe(result => {
          this.hidePanelDisplay = this.isExpandable && result.matches;
        });
  }

  processControlExpansion(event, control): void {
    this.controlExpanded.emit({
      event,
      field: {
        type: 'multiSelect',
        filterKey: this.filterKey,
        placeHolder: this.placeHolder,
        isExpandable: this.isExpandable,
      },
      control,
    });
  }

  selectAll(values: DropdownItem[]): void {
    if (this.control.value?.length === values?.length) {
      this.control.setValue([]);
    } else {
      this.control.setValue(values.map((listItem) => listItem.value as any));
    }
  }

  writeValue(value: DropdownItem[]) {
    this.control.setValue(value, { emitEvent: false });
    this.updatePlaceholderValue();
    if (!value && this.multiSelect) {
      this.multiSelect.selectedOptions = value;
    }
  }

  registerOnChange(fn: (_: DropdownItem[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  panelDisplayHandler(): void {
    if (this.appendTo === 'body') {
      const parentElement = this.multiSelect.itemsViewChild.nativeElement?.parentNode?.parentNode?.parentNode?.parentNode;
      const minWidth = parentElement.style.minWidth;
      if (parentElement && minWidth) {
        parentElement.style.maxWidth = minWidth;
      }
    }
  }

  //note: hardcode for WA of empty placeholder with dynamic value
  //todo: remove after this bug is fixed in v16 or upgraded to v17 (https://github.com/primefaces/primeng/issues/14320)
  updatePlaceholderValue(): void {
    if (!this.multiSelect) return;
    setTimeout(() => {
      if (!this.multiSelect?.value?.length) {
        const parentDiv = this.multiSelect.el.nativeElement.querySelector('.p-multiselect-label-container > div');

        if (parentDiv) {
          parentDiv.classList.add('p-placeholder');
        }
      }
    });
  }
}
