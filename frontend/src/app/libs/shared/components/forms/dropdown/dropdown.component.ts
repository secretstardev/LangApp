import {
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dropdown, DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FilterFieldTemplates } from '@app/libs/features/materials/filters/filters.model';
import { BaseCvaControl } from '../../../utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@app/libs/shared/components/icon/icon.component';

@UntilDestroy()
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownModule, TranslateModule, ReactiveFormsModule, ProgressSpinnerModule, IconComponent],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent<T> extends BaseCvaControl<T[]> implements OnInit {
  @Input()
  options: T[];

  @Input()
  styleClass: string;

  @Input()
  optionLabel = 'label';

  @Input()
  optionValue = 'value';

  @Input()
  placeholder: string;

  @Input()
  appendTo: any = 'body';

  @Input()
  scrollHeight: any = '260px';

  @Input()
  isExpandable: boolean = false;

  @Input()
  virtualScroll: boolean = false;

  @Input()
  virtualScrollItemSize: number;

  @Input()
  filter: boolean = false;

  @Input()
  resetFilterOnHide: boolean = false;

  @Input()
  group: boolean = false;

  @Input()
  showClear: boolean = false;

  @Input()
  templates: FilterFieldTemplates;

  @Input()
  expandableBreakpoints: string[] = ['(max-width: 768px)', '(max-height: 900px)'];

  @Input() pending = false;
  @Input() size: 'big' | 'default' = 'default';

  @Input() selectedItemTemplate?: TemplateRef<unknown>;
  @Input() itemTemplate?: TemplateRef<unknown>;
  @ViewChild('dropdown') dropdown: Dropdown;

  @Output() selectChange = new EventEmitter<DropdownChangeEvent>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.dropdown?.overlayVisible) {
      this.dropdown.overlayVisible = false;
      this.dropdown.cd.detectChanges();
    }
  }

  hidePanelDisplay: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private translateService: TranslateService) {
    super();
  }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.updatePlaceholderValue();
    });
    this.isExpandable &&
    this.breakpointObserver
        .observe(this.expandableBreakpoints)
        .pipe(untilDestroyed(this))
        .subscribe((result) => {
          this.hidePanelDisplay = result.matches;
        });
  }

  //note: hardcode for WA of empty placeholder with dynamic value
  //todo: remove after this bug is fixed in v16 or upgraded to v17 (https://github.com/primefaces/primeng/issues/14320)
  updatePlaceholderValue(): void {
    if (!this.dropdown) return;
    setTimeout(() => {
      const parentSpan = this.dropdown.el.nativeElement.querySelector('div > span');
      const existingChildSpans = parentSpan.querySelectorAll('span');
      if (!this.dropdown.value) {
        const translatedText = this.translateService.instant(this.placeholder);
        if (parentSpan) {
          if (!parentSpan.classList.contains('p-placeholder')) {
            parentSpan.classList.add('p-placeholder');
          }

          if (existingChildSpans.length > 1) {
            parentSpan.removeChild(existingChildSpans[1]);
          }

          if (existingChildSpans.length === 0) {
            const spanElement = document.createElement('span');
            spanElement.textContent = translatedText;
            parentSpan.appendChild(spanElement);
          } else {
            existingChildSpans[0].textContent = translatedText;
          }
        }
      } else if (existingChildSpans.length > 0) {
        parentSpan.removeChild(existingChildSpans[0]);
      }
    });
  }

  onValueChange(value): void {
    this.updatePlaceholderValue();
    this.selectChange.emit(value);
  }

  // WA for filtering visual bug
  onDDFilter(dd: any) {
    if (dd.scroller) {
      dd.scroller.contentEl.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  }

  writeValue(value: T[]) {
    this.control.setValue(value, { emitEvent: false });
    this.updatePlaceholderValue();
  }

  registerOnChange(fn: (_: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  panelDisplayHandler(): void {
    if (this.appendTo === 'body') {
      const parentElement = this.dropdown.itemsViewChild.nativeElement?.parentNode?.parentNode?.parentNode?.parentNode;
      const minWidth = parentElement?.style.minWidth;
      if (minWidth) {
        parentElement.style.maxWidth = minWidth;
      }
    }
  }
}
