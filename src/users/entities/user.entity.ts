// src/users/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users') // You can name the table whatever you want
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  employee_id?: string;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  tel?: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  dept_code?: string;

  @Column({ nullable: true })
  dept_name?: string;

  @Column({ nullable: true })
  user_location_id?: string;

  @Column({ nullable: true })
  supervisor_code?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_on: Date;
}
