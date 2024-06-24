import { DictionaryDrillCard } from './dictionary-drill-card.model';
import { DictionaryType } from './dictionary-type.model';
import { DictionaryWord } from './dictionary-word.model';

export interface Dictionary {
  id: number;
  context: string;
  date: string;
  dictionaryWord: DictionaryWord;
  dictionary_word_id: number;
  drill_card: DictionaryDrillCard[];
  drill_due: string;
  drill_last: string;
  drill_progress: number;
  mnemonic_id: number;
  original_word: string;
  translate_word: string;
  type: DictionaryType;
  url: string;
  user_id: number;
}
