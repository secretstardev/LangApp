import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider/slider';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { TippyDirective, TippyInstance, TippyService } from '@ngneat/helipopper';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-signup-slider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SliderModule, TippyDirective, FormsModule, TooltipModule],
  templateUrl: './signup-slider.component.html',
  styleUrls: ['./signup-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CurrencyPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SignupSliderComponent,
      multi: true,
    },
  ],
})
export class SignupSliderComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @ViewChild('slider') sliderComponent: Slider;

  @Input()
  maxValue: number;

  @Input()
  minValue: number;

  @Input() set value(newValue: number) {
    this._value = newValue >= this.minValue ? newValue : this.minValue;
    this.onChange(this._value);
  }

  @Input()
  currencyValue = 'EUR';

  public tippy: TippyInstance;
  public isDisabled: boolean;
  _value: number;

  private onChange: (value: any) => void = () => {};
  private onTouched: (value: any) => void = () => {};

  constructor(private tippyService: TippyService, private currencyPipe: CurrencyPipe) {}

  ngAfterViewInit() {
    this.tippy = this.tippyService.create(this.sliderComponent.sliderHandle.nativeElement, '', {
      appendTo: this.sliderComponent.sliderHandle.nativeElement,
      placement: 'bottom',
      onShow: (instance) => {
        this.tippy.setContent(this._getFormatValue());
      },
    });
    this.sliderComponent.registerOnTouched(this.onTouched);
  }

  ngOnDestroy() {
    this.tippy.destroy();
  }

  private _getFormatValue(): string {
    return this.currencyPipe.transform(this._value ?? this.minValue, this.currencyValue, 'symbol', '1.0-0');
  }

  handleChange(evt: SliderChangeEvent): void {
    this.tippy.setContent(this._getFormatValue());
    this.onChange(this._value);
    this.tippy.show();
  }

  writeValue(value: number): void {
    this._value = value;
    if (this.sliderComponent) {
      this.sliderComponent.writeValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
