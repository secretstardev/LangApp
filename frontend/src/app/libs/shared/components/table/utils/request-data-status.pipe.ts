import { Pipe, PipeTransform } from '@angular/core';
import { RequestResult } from '@ngneat/elf-requests';

@Pipe({
  name: 'requestDataStatus',
  standalone: true,
})
export class RequestDataStatusPipe implements PipeTransform {
  transform(data: RequestResult & { data: unknown[] }): 'loading' | 'nodata' | 'complete' {
    return data.isLoading ? 'loading' : data.data?.length ? 'complete' : 'nodata';
  }
}
