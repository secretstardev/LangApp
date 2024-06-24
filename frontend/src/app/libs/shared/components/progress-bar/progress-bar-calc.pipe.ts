import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progressBarCalc',
  standalone: true,
})
export class ProgressBarCalcPipe implements PipeTransform {
  transform(value: number): string {
    return `--circle-progress:${value}%`;
  }
}
