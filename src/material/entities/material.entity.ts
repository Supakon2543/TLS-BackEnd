import {
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';
  
  export class MaterialEntity {
    @IsOptional()
    @IsInt()
    id?: number;
  
    @IsString()
    @Length(1, 100)
    name: string;
  
    @IsString()
    @Length(1, 100)
    test_report_name: string;
  
    @IsBoolean()
    status: boolean;
  
    @IsOptional()
    @IsDate()
    created_on?: Date;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  
    @IsOptional()
    @IsDate()
    updated_on?: Date;
  
    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  