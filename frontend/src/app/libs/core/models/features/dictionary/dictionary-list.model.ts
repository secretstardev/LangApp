import { DictionaryListType } from './dictionary-list-type.model';

export interface DictionaryList {
  id: number;
  type: DictionaryListType;
  name: string;
  total?: number;
}
