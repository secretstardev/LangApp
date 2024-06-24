import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BaseCvaControl, IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ReactiveFormsModule, IconComponent, TranslateModule],
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchFieldComponent,
      multi: true,
    },
  ],
})
export class SearchFieldComponent extends BaseCvaControl<string> implements OnInit {
  @Input()
  iconSide = 'left';

  @Input()
  allowClear = false;

  @Input()
  outlined = false;

  @Input()
  placeHolder = 'SearchContentPlaceholder';

  @Input()
  styleClass: string;

  @Input()
  inputStyleClass: string;

  @Output()
  valueSubmitted: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('clearIcon')
  clearIcon: ElementRef;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  clearInput(): void {
    this.control.setValue('');
  }

  submitValue(): void {
    this.valueSubmitted.emit(this.control.value);
  }

  writeValue(value: string) {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
