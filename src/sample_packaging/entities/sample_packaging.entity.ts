import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@Entity()
export class SamplePackaging {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  order: number;

  @Column({ length: 100 })
  @IsString()
  @Length(1, 100)
  name: string; // Sample Condition Name

  @Column()
  @IsBoolean()
  text_input: boolean;

  @Column()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsDate()
  created_on?: Date;

  @IsInt()
  created_by: number;

  @IsOptional()
  @IsDate()
  updated_on?: Date;

  @IsInt()
  updated_by: number;
}
