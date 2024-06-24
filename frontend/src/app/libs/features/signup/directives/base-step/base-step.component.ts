import { EventEmitter, Output, Directive, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseStepDirective {
  @Input() group: FormGroup;
  @Input() control: FormControl<any>;
  @Output() completed = new EventEmitter<any>();
  @Output() returnToPreviousStep = new EventEmitter<void>();

  completeStep(data?: any) {
    this.completed.emit(data);
  }

  goToPreviousStep() {
    this.returnToPreviousStep.emit();
  }
}
