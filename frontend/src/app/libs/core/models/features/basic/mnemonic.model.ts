import { MnemonicUser } from './mnemonic-user.model';

export interface Mnemonic {
  id?: number;
  user_id: number;
  word: string;
  text: string;
  images: string;
  rating: number;
  user_rating?: any;
  mnemonicsUsers: MnemonicUser[];
  addedDateTime?: number;
  updateDateTime?: number;
}
