import { Directive, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

type EntityControls<Entity> = {
  [K in keyof Entity]: FormControl<Entity[K]>;
};

type EntityFromGroup<Entity> = FormGroup<EntityControls<Entity>>;

@Directive()
export abstract class BaseCvaGroup<Entity extends Record<string, any>> implements ControlValueAccessor, Validator, OnDestroy {
  protected control: EntityFromGroup<Entity>;
  protected onChange = (_: Entity): void => {};
  protected onTouched = (): void => {};
  protected onValidatorChange = (): void => {};
  protected destroy$ = new Subject<void>();

  constructor(controls: EntityControls<Entity>) {
    this.control = new FormGroup(controls);
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((entity) => {
      this.onChange(entity as unknown as Entity);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public writeValue(entity: Entity): void {
    this.control.setValue(entity);
  }

  public registerOnChange(fn: (_: Entity) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  public validate(): ValidationErrors | null {
    return this.control.valid ? null : { errors: this.control.errors };
  }
}
