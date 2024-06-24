import { DataJson } from '../basic';
import { Category } from '../category';
import { ContentAttribute } from './content-attribute.model';
import { ContentType } from './content-type.model';
import { ContentStatus } from './content-status.model';

export interface ContentBasic {
  id?: number;
  title: string;
  type: ContentType;
  sourceLink: string;
  text: string;
  status: ContentStatus;
  length: number;
  level: number;
  deleted: number;
  tagsJson: string[];
  dataJson: DataJson;
  format: string;
  cleanText?: any;
  imageUrl?: string;
  titleTranslated: string;
}

export interface Content extends ContentBasic {
  recommendedVideos: ContentBasic[];
  categories: Category[];
  contentAttribute: ContentAttribute;
}
