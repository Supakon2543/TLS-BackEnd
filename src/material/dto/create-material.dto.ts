import { IsBoolean, IsInt, IsOptional, IsString, Length } from "class-validator";

export class CreateMaterialDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 100)
  test_report_name: string;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
