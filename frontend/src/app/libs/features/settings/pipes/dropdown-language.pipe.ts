import { Pipe, PipeTransform } from '@angular/core';
import { Language, ListResponse } from '@app/interfaces/common.interface';
import { DropdownItem } from '@app/libs/shared';

@Pipe({
  name: 'dropdownLanguage',
  standalone: true,
})
export class DropdownLanguagePipe implements PipeTransform {
  transform(languages: ListResponse<Language>): DropdownItem[] {
    return (languages?.items || []).map((el) => ({ label: el.title, value: el.code }));
  }
}
