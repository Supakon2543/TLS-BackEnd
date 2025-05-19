import { IsBoolean, IsInt, IsString, Length } from 'class-validator';

export class CreateSampleStageDto {
  @IsInt()
  id: number;

  @IsInt()
  order: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsBoolean()
  text_input: boolean;

  @IsBoolean()
  status: boolean;

  @IsInt()
  created_by: number;

  @IsInt()
  updated_by: number;
}
