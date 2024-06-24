import { DictionaryFilter } from './dictionary-filter.model';

export interface DictionaryGet {
  page?: number;
  perPage?: number;
  expand?: 'dictionaryWord';
  filter?: DictionaryFilter;
  listId?: number;
}
