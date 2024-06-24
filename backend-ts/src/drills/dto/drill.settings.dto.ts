import { IsOptional, IsArray, IsString, IsDateString, ValidateNested, IsDefined, IsBoolean, IsNumber } from 'class-validator';
import { Drill } from '../drills.interfaces';
import { Exclude, Expose, TransformOptions, Type } from 'class-transformer';
import { Transform } from 'class-transformer';

export function Default(defaultValue: any, options?: TransformOptions) {
  return Transform((o: any) => (o.value !== null && o.value !== undefined ? o.value : defaultValue), options);
}

@Exclude()
export class DrillSettings {
  @Expose()
  disabledCardTypes: string[] = [];

  @Expose()
  disabledCardIds: string[] = [];

  @Expose()
  disabledWordIds: number[] = [];

  @Expose()
  newWordsDailyLimit: number = 30;

  @Expose()
  disableAudioQuestionsUntil: string = null;

  @Expose()
  autoPlayAudio: boolean = true;
}

export class UpdateDrillSettingsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  disabledCardTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  disabledCardIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  disabledWordIds?: number[];

  @IsOptional()
  @IsNumber()
  newWordsDailyLimit?: number;

  @IsOptional()
  @IsDateString()
  disableAudioQuestionsUntil?: string;

  @IsOptional()
  @IsBoolean()
  autoPlayAudio?: boolean;
}

export class UpdateDrillSettingsBodyDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateDrillSettingsDto)
  settings: UpdateDrillSettingsDto;
  @IsOptional()
  @IsArray()
  drills?: Drill[];
}
