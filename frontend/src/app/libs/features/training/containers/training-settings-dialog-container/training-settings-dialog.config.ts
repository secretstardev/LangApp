import { TrainingCardType } from '@app/libs/core/models';

export interface TrainingSettingsOption {
  text: string;
  value: TrainingCardType | TrainingSettingsMainOption | TrainingSettingsIntensityOption;
}

export type TrainingSettingsMainOption = 'autoPlayAudio' | 'activeTypeQuestions';

export type TrainingSettingsIntensityOption = 'dayLimit';

export const trainingSettingsMainOptions: TrainingSettingsOption[] = [
  {
    text: 'StudySettings.OptionMain1',
    value: 'autoPlayAudio',
  },
  {
    text: 'StudySettings.OptionMain2',
    value: 'activeTypeQuestions',
  },
];

export const trainingSettingsIntensityOptions: TrainingSettingsOption[] = [
  {
    text: 'StudySettings.OptionIntensity1',
    value: 'dayLimit',
  },
];

export const trainingSettingsAdditionalOptions: TrainingSettingsOption[] = [
  {
    text: 'StudySettings.OptionAdditional1',
    value: 'selectFuriganaForOneKanji',
  },
  {
    text: 'StudySettings.OptionAdditional2',
    value: 'selectFuriganaForWholeWord',
  },
  {
    text: 'StudySettings.OptionAdditional3',
    value: 'typeFuriganaForWholeWord',
  },
  {
    text: 'StudySettings.OptionAdditional4',
    value: 'selectTranslationForWord',
  },
  {
    text: 'StudySettings.OptionAdditional5',
    value: 'selectWordForTranslation',
  },
  {
    text: 'StudySettings.OptionAdditional6',
    value: 'selectWordForAudio',
  },
  {
    text: 'StudySettings.OptionAdditional7',
    value: 'selectWordForSentence',
  },
  {
    text: 'StudySettings.OptionAdditional8',
    value: 'selectAudioForWord',
  },
];
