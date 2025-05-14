import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryEditDto } from './dto/create-category_edit.dto';
import { UpdateCategoryEditDto } from './dto/update-category_edit.dto';

@Injectable()
export class CategoryEditService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateCategoryEditDto) {
    return this.prisma.category_edit.upsert({
      where: { id: data.id }, // Use the id from the data object
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(data: CreateCategoryEditDto) {
    return this.prisma.category_edit.create({ data });
  }

  async findAll() {
    return this.prisma.category_edit.findMany();
  }

  async findOne(id: number) {
    const item = await this.prisma.category_edit.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`CategoryEdit with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, data: UpdateCategoryEditDto) {
    await this.findOne(id);
    return this.prisma.category_edit.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.category_edit.delete({ where: { id } });
  }
}
