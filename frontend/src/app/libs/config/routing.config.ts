export const routingConfig = {
  home: {
    path: 'home',
    fullPath: '/home',
  },
  auth: {
    path: 'auth',
    fullPath: '/auth',
    signin: {
      path: 'signin',
      fullPath: '/auth/signin',
    },
    signup: {
      path: 'signup',
      fullPath: '/auth/signup',
    },
  },
  payment: {
    path: 'payment',
    fullPath: '/payment',
    registration: {
      path: 'registration',
      fullPath: '/payment/registration',
    },
  },
  content: {
    path: 'content',
    fullPath: '/content',
    materials: {
      path: 'materials',
      fullPath: '/content/materials',
      view: {
        path: 'materials/:id',
        fullPath: '/content/materials/',
      },
    },
  },
  training: {
    path: 'training',
    fullPath: '/training',
    index: {
      path: 'index',
      fullPath: '/training/index',
    },
  },
  settings: {
    path: 'settings',
    fullPath: '/settings',
    profile: {
      path: 'profile',
      fullPath: '/settings/profile',
    },
    plugin: {
      path: 'plugin',
      fullPath: '/settings/plugin',
    },
  },
  dictionary: {
    path: 'dictionary',
    fullPath: '/dictionary',
    dictionary: {
      path: ':list-id',
      fullPath: '/dictionary',
      idKey: 'list-id',
    },
    create: {
      path: 'create',
      fullPath: '/dictionary/create',
    },
  },
  training2: {
    path: 'training2',
    fullPath: '/training2',
    start: {
      path: 'start',
      fullPath: '/training2/start',
    },
    plugin: {
      path: 'plugin',
      fullPath: '/settings/plugin',
    },
  },
  contacts: {
    path: 'contacts',
    fullPath: '/contacts',
  },
  notfound: {
    path: 'not-found',
    fullPath: '/not-found',
  },
};

export enum TrainingCardTypeRouteEnum {
  kanjiInfo = 'kanji-info',
  wordInfo = 'word-info',
  selectFuriganaForOneKanji = 'furigana-for-one-kanji',
  selectFuriganaForWholeWord = 'furigana-for-whole-word',
  typeFuriganaForWholeWord = 'type-furigana-for-whole-word',
  selectTranslationForWord = 'translation-for-word',
  selectWordForTranslation = 'word-for-translation',
  selectWordForAudio = 'word-for-audio',
  selectWordForSentence = 'word-for-sentence',
  selectWordForSentenceVideo = 'word-for-sentence-video',
  selectAudioForWord = 'audio-for-word',
}
