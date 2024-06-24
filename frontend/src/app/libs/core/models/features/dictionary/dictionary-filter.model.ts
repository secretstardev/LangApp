export interface DictionaryFilter {
  original_word?: {
    like?: string;
  };
  translate_word?: {
    like?: string;
  };
  type?: string;
  listId?: number;
}
