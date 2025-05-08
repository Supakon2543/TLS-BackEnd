import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

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
