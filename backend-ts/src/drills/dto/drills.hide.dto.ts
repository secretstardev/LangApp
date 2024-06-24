import { IsArray, IsDefined, IsIn, IsOptional, IsString } from 'class-validator';
import { Drill } from '../drills.interfaces';

export class DrillsHideDto {
  @IsString()
  @IsIn(['onlyCurrentQuestion', 'allWithCurrentWord', 'disableCardType', 'disableAudioQuestionsFor1Hour'])
  mode: string;
  @IsOptional()
  cardToHide?: string;
  @IsDefined()
  @IsArray()
  drills: Drill[];
}
