import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path based on your structure
import { CreateSampleRetainingDto } from './dto/create-sample_retaining.dto';
import { UpdateSampleRetainingDto } from './dto/update-sample_retaining.dto';

@Injectable()
export class SampleRetainingService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateSampleRetainingDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.sample_retaining.create({ data: createData }); // Create a new record
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
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      return [];
    }

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
      orderBy: { order: 'asc' }, // Sorting by order or any field as needed
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
