import {
    IsInt,
    IsString,
    IsOptional,
    IsBoolean,
    Length,
  } from 'class-validator';
  
  export class CategoryEdit {
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
    created_on?: Date;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  
    @IsOptional()
    updated_on?: Date;
  
    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  