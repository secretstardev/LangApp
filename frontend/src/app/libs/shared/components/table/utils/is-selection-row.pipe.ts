import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSelectionRow',
  standalone: true,
})
export class IsSelectionRowPipe implements PipeTransform {
  transform(value: { id: number }, selectionIds: number[]): boolean {
    return selectionIds.includes(value.id);
  }
}
