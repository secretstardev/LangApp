import { DropdownItem } from '@app/libs/shared';

export const MaterialSortOptions: DropdownItem[] = [
  { value: 'random', label: 'Random' },
  { value: 'rank', label: 'Popularity' },
];

export const MaterialStudiedOptions: DropdownItem[] = [
  { value: '0', label: 'StudiedFilter.NotStarted' },
  { value: '1', label: 'StudiedFilter.Finished' },
  { value: '2', label: 'StudiedFilter.StartedAndUnfinished' },
  { value: '3', label: 'StudiedFilter.Hidden' },
];


export const DEFAULT_CURRENCY = 'EUR';
