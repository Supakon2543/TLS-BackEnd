import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryEditDto } from './dto/create-category_edit.dto';
import { UpdateCategoryEditDto } from './dto/update-category_edit.dto';

@Injectable()
export class CategoryEditService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateCategoryEditDto) {

    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.category_edit.create({ data: createData });
    }
    return this.prisma.category_edit.upsert({
      where: { id: data.id }, // Use the id from the data object
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async getcategory_edit(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.category_edit.findMany({
          where: {
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              name: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { order: 'asc' }, // Sorting by order or any field as needed
        });
      }
      return [];
    }

    return this.prisma.category_edit.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { order: 'asc' },
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
