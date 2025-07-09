import { IsInt, IsOptional } from 'class-validator';

export class MaterialMicrobiology {
  @IsInt()
  id: number;

  @IsInt()
  material_id: number;

  @IsInt()
  microbiology_parameter_id: number;

  @IsOptional()
  created_on?: Date;

  @IsOptional()
  @IsInt()
  created_by?: number;
}
