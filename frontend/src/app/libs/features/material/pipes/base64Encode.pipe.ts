import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64Encode',
  standalone: true
})
export class Base64EncodePipe implements PipeTransform {
  transform(value: any): any {
    const jsonString = JSON.stringify(value);
    const encodedUriComp = encodeURIComponent(jsonString);
    return btoa(encodedUriComp);
  }
}
