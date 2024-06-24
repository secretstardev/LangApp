import { DictionaryType } from './dictionary-type.model';

export interface DictionaryWord {
  id: number;
  type: DictionaryType;
  query: string[];
  data: DictionaryWordData; // todo do if need
}

export interface DictionaryWordData {
  frequencyPmw: number;
  frequencyRank: number;
  frequencySource: string;
  isWord: boolean;
}
