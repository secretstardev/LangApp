import { ContentStatus } from './content-status.model';
import { ContentDeleted } from './content-deleted.model';
import { ContentType } from './content-type.model';
import { ContentLength } from './content-length.model';
import { StudiedValues } from '@app/libs/core/models';

export interface ContentFilter {
  status?: ContentStatus;
  deleted?: ContentDeleted;
  type?: ContentType;
  length?: ContentLength;
  level?: number;
  categoryId?: number;
  isStudied?: StudiedValues;
  isHidden?: 0 | 1;
  youtubeChannelId?: string;
}
