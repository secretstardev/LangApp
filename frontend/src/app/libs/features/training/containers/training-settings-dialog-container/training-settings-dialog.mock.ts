import { TrainingSettingsIntensityOption, TrainingSettingsMainOption } from './training-settings-dialog.config';
import { TrainingCardType } from '@app/libs/core/models';

export const trainingSettingsMainMockOptions: TrainingSettingsMainOption[] = ['autoPlayAudio', 'activeTypeQuestions'];

export const trainingSettingsIntensityMockOptions: TrainingSettingsIntensityOption[] = ['dayLimit'];

export const trainingSettingsAdditionalMockOptions: TrainingCardType[] = [
  'selectAudioForWord',
  'selectTranslationForWord',
  'selectWordForSentence',
  'selectFuriganaForWholeWord',
  'selectFuriganaForOneKanji',
  'selectWordForAudio',
  'selectWordForTranslation',
  'typeFuriganaForWholeWord',
];
