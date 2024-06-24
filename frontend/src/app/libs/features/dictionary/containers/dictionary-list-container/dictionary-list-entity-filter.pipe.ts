import { Pipe, PipeTransform } from '@angular/core';
import { RequestResult } from '@ngneat/elf-requests';
import { DictionaryList } from '@app/libs/core/models';

@Pipe({
  name: 'dictionaryListEntityFilter',
  standalone: true,
})
export class DictionaryListEntityFilterPipe implements PipeTransform {
  transform(value: RequestResult & { data: DictionaryList[] }, hideAll: boolean, hideIds: number[]): RequestResult & { data: DictionaryList[] } {
    return {
      ...value,
      data: dictionaryListEntityFilter(value.data, hideAll, hideIds),
    };
  }
}

function dictionaryListEntityFilter(entities: DictionaryList[], hideAll: boolean, hideIds: number[]): DictionaryList[] {
  let filteredEntities = [...entities];

  if (hideAll) {
    filteredEntities = filteredEntities.filter((el) => el.type !== 'all');
  }

  if (hideIds) {
    filteredEntities = filteredEntities.filter((el) => !hideIds.includes(el.id));
  }

  return filteredEntities;
}
