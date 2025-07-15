import { Module } from '@nestjs/common';
import { CategoryEditService } from './category_edit.service';
import { CategoryEditController } from './category_edit.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategoryEditController],
  providers: [CategoryEditService /*, PrismaService*/],
})
export class CategoryEditModule {}
