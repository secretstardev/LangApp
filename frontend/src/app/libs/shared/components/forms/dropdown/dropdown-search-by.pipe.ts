import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from './dropdown-item.model';

@Pipe({
  name: 'dropdownSearchBy',
  standalone: true,
})
export class DropdownSearchByPipe implements PipeTransform {
  transform(items: DropdownItem[], value: string | number, searchBy: 'label' | 'value' = 'value'): DropdownItem {
    return items.find((el) => (searchBy === 'value' ? el.value === value : el.label === value));
  }
}
