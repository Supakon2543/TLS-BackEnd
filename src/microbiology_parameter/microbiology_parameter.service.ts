import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust path if needed
import { CreateMicrobiologyParameterDto } from './dto/create-microbiology_parameter.dto';
import { UpdateMicrobiologyParameterDto } from './dto/update-microbiology_parameter.dto';

@Injectable()
export class MicrobiologyParameterService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateMicrobiologyParameterDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.microbiology_parameter.create({ data });
    }
    return this.prisma.microbiology_parameter.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // Create new record
  async create(dto: CreateMicrobiologyParameterDto) {
    return this.prisma.microbiology_parameter.create({
      data: dto,
    });
  }

  // Get all records
  async findAll() {
    return this.prisma.microbiology_parameter.findMany({
      orderBy: { order: 'asc' },
    });
  }

  // Get records with filters
  async getMicrobiologyParameters(params: {
    id?: number;
    keyword?: string;
    status?: number;
  }) {
    const { id, keyword, status } = params;

    return this.prisma.microbiology_parameter.findMany({
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

  // Get one record by ID
  async findOne(id: number) {
    const item = await this.prisma.microbiology_parameter.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Chemical Parameter with ID ${id} not found`);
    }

    return item;
  }

  // Update a record
  async update(id: number, dto: UpdateMicrobiologyParameterDto) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.microbiology_parameter.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a record
  async remove(id: number) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.microbiology_parameter.delete({
      where: { id },
    });
  }
}