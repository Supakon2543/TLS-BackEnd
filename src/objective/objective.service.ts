import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@Injectable()
export class ObjectiveService {
  constructor(private readonly prisma: PrismaService) {}
  
  // Create or update a record
  async createOrUpdate(data: CreateObjectiveDto) {
    return this.prisma.objective.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(createobjectiveDto: CreateObjectiveDto) {
    return this.prisma.objective.create({
      data: createobjectiveDto,
    });
  }

  async getObjectives(params: {
    id?: number;
    keyword?: string;
    status?: number;
  }) {
    const { id, keyword, status } = params;

    return this.prisma.objective.findMany({
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
    return this.prisma.objective.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const objective = await this.prisma.objective.findUnique({
      where: { id },
    });

    if (!objective) {
      throw new NotFoundException(`objective with ID ${id} not found`);
    }

    return objective;
  }

  async update(id: number, updateobjectiveDto: UpdateObjectiveDto) {
    await this.findOne(id); // ensure it exists

    return this.prisma.objective.update({
      where: { id },
      data: updateobjectiveDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ensure it exists

    return this.prisma.objective.delete({
      where: { id },
    });
  }
}
