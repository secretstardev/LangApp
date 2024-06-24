export interface FiltersField {
  type?: FilterTypes;
  filterKey?: string;
  placeHolder?: string;
  isExpandable?: boolean;
}

export interface FiltersConfig {
  fields: FiltersField[];
  defaults: FiltersDefaults;
}

export interface FiltersDefaults {
  defaultPerPage: number;
}

export type FilterTypes = 'multiSelect' | 'dropdown' | 'toggleButton' | 'sort' | 'search';

export interface FilterFieldTemplates {
  selectedItem?: string;
  itemTemplate?: string;
  label?: string;
}

export interface FilterExpansionEvent {
  event?: any;
  field: FiltersField;
  control: any;
}

export interface Filters {
  categoryId?: number[];
  titleLang?: string;
  isStudied?: string;
  length?: { gt?: string, lt?: string };
  level?: string;
  sort?: string;
}
