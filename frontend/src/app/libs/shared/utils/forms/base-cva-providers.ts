import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef, Type } from '@angular/core';
import { BaseCvaGroup } from './base-cva-group';
import { BaseCvaControl } from './base-cva-control';

export function baseCvaProviders<T>(component: Type<BaseCvaGroup<any> | BaseCvaControl<any>>) {
  return [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => component),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => component),
      multi: true,
    },
  ];
}
