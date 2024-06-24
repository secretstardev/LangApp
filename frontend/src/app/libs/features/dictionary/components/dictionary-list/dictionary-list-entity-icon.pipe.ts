import { Pipe, PipeTransform } from '@angular/core';
import { DictionaryListType } from '@app/libs/core/models';
import { CustomIconType, IconType } from '@app/libs/shared';

@Pipe({
  name: 'dictionaryListEntityIcon',
  standalone: true,
})
export class DictionaryListEntityIconPipe implements PipeTransform {
  transform(type: DictionaryListType): IconType | CustomIconType {
    switch (type) {
      case DictionaryListType.all:
        return 'folder-gradient';
      default:
        return 'folder';
    }
  }
}
