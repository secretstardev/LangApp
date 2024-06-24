import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
  standalone: true,
})
export class JoinPipe implements PipeTransform {
  transform(value: any[], separator: string = ',', key: string = 'value'): string {
    if (value && value.length > 0) {
      if (!key) {
        return value.join(separator);
      }

      return value
        .filter((item) => item[key])
        .map((item) => item[key])
        .join(separator);
    }
  }
}
