export type TrainingCompleteWhatNextType = 'ComeBackLater' | 'SelectAnother' | 'StudyMore' | 'ChangeGoal';

export interface TrainingCompleteWhatNext {
  text: string;
  isLink: boolean;
  id: TrainingCompleteWhatNextType;
}

export const trainingCompleteWhatNext: TrainingCompleteWhatNext[] = [
  {
    id: 'ComeBackLater',
    text: 'TrainingComplete.ComeBackLater',
    isLink: false,
  },
  {
    id: 'SelectAnother',
    text: 'TrainingComplete.SelectAnother',
    isLink: false,
  },
  {
    id: 'StudyMore',
    text: 'TrainingComplete.StudyMore',
    isLink: true,
  },
  {
    id: 'ChangeGoal',
    text: 'TrainingComplete.ChangeGoal',
    isLink: true,
  },
];
