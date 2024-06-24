import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconComponent } from '@app/libs/shared';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule } from '@ngx-translate/core';
import { FilterExpansionEvent } from '@app/libs/features/materials/filters/filters.model';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel-sub-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, IconComponent, SharedModule, SidebarModule, TranslateModule, FormsModule],
  templateUrl: './sub-page.component.html',
  styleUrls: ['./sub-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubPageComponent implements OnInit {

  @HostBinding('class.typography') enableTypography = true;

  @Input()
  isVisible = false;

  @Input()
  filtersGroup: FormGroup;

  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  _data: FilterExpansionEvent;
  _value = [];

  @Input() set data(value) {
    this._data = value;
    this._value = this._data?.control?.value;
    this.cdr.detectChanges();
  }


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  applyValues(): void {
    switch (this._data?.field?.type) {
      case 'multiSelect':
        if (this._data?.field?.filterKey) {
          this.filtersGroup.controls[this._data.field.filterKey].setValue(this._value);
        }
        break;
    }
    this.toggleSubPanel();
  }

  toggleSubPanel() {
    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }

}
