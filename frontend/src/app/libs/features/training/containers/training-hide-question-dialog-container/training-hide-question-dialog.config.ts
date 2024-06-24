export interface TrainingHideQuestionOption {
  text: string;
  value: TrainingHideQuestionOptionType;
  show: boolean;
}

export type TrainingHideQuestionOptionType = 'onlyCurrentQuestion' | 'allWithCurrentWord' | 'disableCardType' | 'disableAudioQuestionsFor1Hour';

export const trainingHideQuestionOptions: (isAudioQuestion: boolean) => TrainingHideQuestionOption[] = (isAudioQuestion: boolean) => [
  {
    text: 'HideQuestion.Option1',
    value: 'onlyCurrentQuestion',
    show: true,
  },
  {
    text: 'HideQuestion.Option2',
    value: 'allWithCurrentWord',
    show: true,
  },
  {
    text: 'HideQuestion.Option3',
    value: 'disableCardType',
    show: true,
  },
  {
    text: 'HideQuestion.Option4',
    value: 'disableAudioQuestionsFor1Hour',
    show: isAudioQuestion,
  },
];
