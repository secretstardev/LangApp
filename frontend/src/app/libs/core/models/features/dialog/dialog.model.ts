import { IconType } from '@app/libs/shared';
import { Type } from '@angular/core';

export interface CustomDialogModel {
  title?: string;
  headerIcon?: IconType;
  showHeader?: boolean;
  titleSize?: 'big' | 'normal' | 'small';
  closable?: boolean;
  contentPadding?: string;
  breakpoints?: { [key: string]: string };
  input?: any;
  componentType?: Type<any>;
  hideCustomHeader?: boolean;
}
