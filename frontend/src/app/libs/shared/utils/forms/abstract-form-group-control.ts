import { FormGroup } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({})
export abstract class AbstractFormGroupControl<T extends FormGroup, E = unknown> implements OnChanges {
  @Input() entity?: E;

  protected abstract mainForm: T;
  protected abstract onSubmit(): void;

  ngOnChanges(changes: SimpleChanges) {
    if ('entity' in changes && this.entity) {
      this.mainForm.patchValue(this.entity);
    }
  }

  submitClick(): void {
    if (this.mainForm.invalid) {
      this.mainForm.markAllAsTouched();
    } else {
      this.onSubmit();
    }
  }
}
