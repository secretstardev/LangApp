import { DictionaryList, DictionaryListType } from '@app/libs/core/models';

export const DictionaryListMock: DictionaryList[] = [
  {
    id: 1,
    name: 'All Words',
    type: DictionaryListType.all,
    total: 150,
  },
  {
    id: 2,
    name: 'Main Dictionary',
    type: DictionaryListType.system,
    total: 60,
  },
  {
    id: 3,
    name: 'Dictionary school 25',
    type: DictionaryListType.user,
    total: 30,
  },
  {
    id: 4,
    name: 'Words for Quite Long Book name 2nd Edition Unit 1 Lesson 15',
    type: DictionaryListType.user,
    total: 20,
  },
  {
    id: 5,
    name: 'Test 1',
    type: DictionaryListType.user,
    total: 15,
  },
  {
    id: 6,
    name: 'Test 2',
    type: DictionaryListType.user,
    total: 25,
  },
];
