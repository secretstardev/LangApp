import { ContentStudied } from '@app/libs/core/models/features/content/content-studied.model';

export interface ContentAttribute {
  id: number;
  contentId: number;
  userId: number;
  isStudied: ContentStudied;
  isHidden: boolean;
}
