import { Pipe, PipeTransform } from '@angular/core';
import { Content } from '@app/interfaces/common.interface';
import { LOCALIZED_TITLE_VALUE } from '@app/libs/features/material';

@Pipe({
  name: 'localizedTitle',
  standalone: true,
  pure: true
})
export class LocalizedTitlePipe implements PipeTransform {
  transform(item: Content, locale: string): string {
    const useLocalized = locale === LOCALIZED_TITLE_VALUE;
    return useLocalized && item?.titleLocalized ? item?.titleLocalized : item?.title;
  }
}
