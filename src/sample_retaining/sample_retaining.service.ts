import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path based on your structure
import { CreateSampleRetainingDto } from './dto/create-sample_retaining.dto';
import { UpdateSampleRetainingDto } from './dto/update-sample_retaining.dto';

@Injectable()
export class SampleRetainingService {
  constructor(private readonly prisma: PrismaService) {}


  async createOrUpdate(data: CreateSampleRetainingDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.sample_retaining.create({ data });
    }
    return this.prisma.sample_retaining.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(createDto: CreateSampleRetainingDto) {
    return this.prisma.sample_retaining.create({
      data: createDto,
    });
  }

  async getSampleRetainings(params: {
    id?: number;
    keyword?: string;
    status?: number;
  }) {
    const { id, keyword, status } = params;

    return this.prisma.sample_retaining.findMany({
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

  async findAll() {
    return this.prisma.sample_retaining.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.sample_retaining.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`SampleRetaining with ID ${id} not found`);
    }

    return record;
  }

  async update(id: number, updateDto: UpdateSampleRetainingDto) {
    await this.findOne(id); // ensure record exists

    return this.prisma.sample_retaining.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ensure record exists

    return this.prisma.sample_retaining.delete({
      where: { id },
    });
  }
}
