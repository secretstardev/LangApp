import { IconType } from '@app/libs/shared/components';

export interface HomeNextButton {
  id: HomeNextButtonEnum;
  icon: IconType;
  iconColor: string;
  text: string;
  background: string;
}

export enum HomeNextButtonEnum {
  continue,
  watchNew,
  studyWords,
  surprise,
}
