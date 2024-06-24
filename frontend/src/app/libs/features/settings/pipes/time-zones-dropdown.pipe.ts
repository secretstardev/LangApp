import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '@app/libs/shared';
import { TimeZoneGroup } from '@app/libs/core/models';

@Pipe({
  name: 'timeZonesDropdown',
  standalone: true,
})
export class TimeZonesDropdownPipe implements PipeTransform {
  transform(timeZones: TimeZoneGroup[]): DropdownItem[] {
    if (!timeZones) {
      return [];
    }

    const flattenedItems: DropdownItem[] = [];

    timeZones.forEach(group => {
      group.zones.forEach(zone => {
        flattenedItems.push({
          label: zone.value,
          value: zone.value,
        });
      });
    });

    return flattenedItems;
  }
}
