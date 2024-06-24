export interface DictionaryListCreate {
  name: string;
  importWords: boolean;
  type: 'user' | 'default';
  wordsList: string;
}

export type DictionaryListUpdate = Pick<DictionaryListCreate, 'name' | 'type'> & { id: number };
