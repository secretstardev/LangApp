import { Pipe, PipeTransform } from '@angular/core';
import { DictionaryList } from '@app/libs/core/models';
import { PageHeaderBreadcrumbLabel } from '@app/libs/shared';

@Pipe({
  name: 'dictionaryPageHeader',
  standalone: true,
})
export class DictionaryPageHeaderPipe implements PipeTransform {
  transform(list?: DictionaryList, isAllList?: boolean): PageHeaderBreadcrumbLabel[] {
    if (isAllList) {
      return [
        {
          id: 1,
          editable: false,
          label: 'All',
        },
        {
          id: 2,
          editable: false,
          label: 'ViewWordList',
        },
      ];
    }

    return [
      {
        id: 1,
        editable: true,
        label: list?.name,
      },
      {
        id: 2,
        editable: false,
        label: 'ViewWordList',
      },
    ];
  }
}
