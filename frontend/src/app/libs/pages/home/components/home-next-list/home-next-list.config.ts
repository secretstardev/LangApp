import { HomeNextButton, HomeNextButtonEnum } from '@app/libs/pages/home/components/home-next-list/home-next-list.model';

export const homeNextListButtons: HomeNextButton[] = [
  {
    id: HomeNextButtonEnum.continue,
    icon: 'arrow-right',
    text: 'ContinueWhatStarted',
    iconColor: 'var(--primary-tulip-500-base)',
    background: 'var(--tulip-gradient)',
  },
  {
    id: HomeNextButtonEnum.watchNew,
    icon: 'video-play',
    text: 'WatchNewContent',
    iconColor: 'var(--states-info-500-base)',
    background: 'var(--states-info-500-base)',
  },
  {
    id: HomeNextButtonEnum.studyWords,
    icon: 'note',
    text: 'StudyWords',
    iconColor: 'var(--color-custom-orange)',
    background: 'var(--color-custom-orange)',
  },
  {
    id: HomeNextButtonEnum.surprise,
    icon: 'surprise box',
    text: 'SurpriseMe',
    iconColor: 'var(--states-success-500-base)',
    background: 'var(--states-success-500-base)',
  },
];
