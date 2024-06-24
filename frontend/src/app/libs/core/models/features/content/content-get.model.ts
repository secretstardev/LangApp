import { ContentFilter } from './content-filter.model';

export interface ContentGet {
  page?: number;
  perPage?: number;
  filter?: ContentFilter;
  sort?: 'random';
  randomSeed?: number;
}
