import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Length,
  IsEmail,
} from 'class-validator';

export class LocationEmail {
  @IsString()
  @Length(1, 15)
  id: string;

  @IsInt()
  user_location_id: number;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  email_notification?: string;

  @IsBoolean()
  status: boolean;

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
