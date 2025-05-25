import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateSampleStageDto } from './dto/create-sample_stage.dto';
import { UpdateSampleStageDto } from './dto/update-sample_stage.dto';

@Injectable()
export class SampleStageService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateSampleStageDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; 
      return this.prisma.sample_stage.create({ data: createData }); // Create a new record
    }
    return this.prisma.sample_stage.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(createDto: CreateSampleStageDto) {
    return this.prisma.sample_stage.create({
      data: createDto,
    });
  }

  async getSampleStages(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    return this.prisma.sample_stage.findMany({
      where: {
        ...(id && { id }),
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
