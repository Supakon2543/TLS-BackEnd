import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  async getSections(params: { id?: number; keyword?: string; status?: number }) {
  const { id, keyword, status } = params;

  return this.prisma.section.findMany({
    where: {
      ...(id && { id }),
      ...(typeof status === 'number' && status !== 0
        ? { status: status === 1 }
        : {}),
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' }
      }),
    },
    orderBy: { name: 'asc' },
  });
}

  // Create or update a record
  async createOrUpdate(data: CreateSectionDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.section.create({ data });
    }
    return this.prisma.section.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(data: CreateSectionDto) {
    return this.prisma.section.create({ data });
  }

  async findAll() {
    return this.prisma.section.findMany();
  }

  async findOne(id: number) {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) throw new NotFoundException(`Section ID ${id} not found`);
    return section;
  }

  async update(id: number, data: UpdateSectionDto) {
    await this.findOne(id);
    return this.prisma.section.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.section.delete({ where: { id } });
  }
}
