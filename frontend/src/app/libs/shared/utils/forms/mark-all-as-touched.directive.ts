import { ChangeDetectorRef, Directive, Inject, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appMarkAllAsTouched]',
})
export class MarkAllAsTouchedDirective implements OnInit {
  constructor(private changeDetectorRef: ChangeDetectorRef, @Optional() @Inject(NgControl) private parent?: NgControl, @Optional() @Inject(NG_VALUE_ACCESSOR) @Self() private valueAccessors?: Array<ControlValueAccessor>) {}

  public ngOnInit(): void {
    this.registerMarkAllAsTouched();
  }

  private registerMarkAllAsTouched(): void {
    if (!this.parent?.control || !this.valueAccessors?.length) {
      return;
    }

    const controls: Array<AbstractControl> = Object.values(this.valueAccessors[0]).filter((v: unknown) => v instanceof AbstractControl);

    if (controls.length === 0) {
      return;
    }

    const control = controls[0];
    const parentControl = this.parent.control;
    const parentMarkAllAsTouched = parentControl.markAllAsTouched;

    this.parent.control.markAllAsTouched = (): void => {
      parentMarkAllAsTouched.bind(parentControl)();
      control.markAllAsTouched();
      this.changeDetectorRef.markForCheck();
    };
  }
}
