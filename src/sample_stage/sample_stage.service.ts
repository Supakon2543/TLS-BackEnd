import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateSampleStageDto } from './dto/create-sample_stage.dto';
import { UpdateSampleStageDto } from './dto/update-sample_stage.dto';

@Injectable()
export class SampleStageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateSampleStageDto) {
    return this.prisma.sample_stage.create({
      data: createDto,
    });
  }

  async findAll() {
    return this.prisma.sample_stage.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const stage = await this.prisma.sample_stage.findUnique({
      where: { id },
    });

    if (!stage) {
      throw new NotFoundException(`SampleStage with ID ${id} not found`);
    }

    return stage;
  }

  async update(id: number, updateDto: UpdateSampleStageDto) {
    await this.findOne(id); // ensure it exists

    return this.prisma.sample_stage.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ensure it exists

    return this.prisma.sample_stage.delete({
      where: { id },
    });
  }
}
