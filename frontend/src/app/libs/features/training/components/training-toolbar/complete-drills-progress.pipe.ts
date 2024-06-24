import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completeDrillsProgress',
  standalone: true,
})
export class CompleteDrillsProgressPipe implements PipeTransform {
  transform(drillsLength: number, completedDrillsLength: number): number {
    return completedDrillsLength / (drillsLength / 100);
  }
}
