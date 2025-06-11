import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column 
} from 'typeorm';
import { 
  IsBoolean, 
  IsInt, 
  IsString, 
  Length 
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
}