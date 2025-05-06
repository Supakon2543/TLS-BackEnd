import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChemicalController } from 'src/chemical/chemical.controller';

@Module({
  controllers: [UsersController, ChemicalController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
