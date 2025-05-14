import {
    IsInt,
    IsString,
    IsOptional,
    IsBoolean,
    Length,
  } from 'class-validator';
  
  export class CreateCategoryEditDto {
    
    @IsInt()
    id: number;

    @IsInt()
    order: number;
  
    @IsString()
    @Length(1, 50)
    name: string;
  
    @IsOptional()
    @IsBoolean()
    status?: boolean;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  }
  