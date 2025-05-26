import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as needed
import { CreateLabProcessDto } from './dto/create-lab_process.dto';
import { UpdateLabProcessDto } from './dto/update-lab_process.dto';

@Injectable()
export class LabProcessService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a lab process
  async createOrUpdate(data: CreateLabProcessDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.lab_process.create({ data: createData }); // Create a new record
    }
    return this.prisma.lab_process.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(createDto: CreateLabProcessDto) {
    return this.prisma.lab_process.create({
      data: createDto,
    });
  }

  async getLabProcesses(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      return [];
    }

    return this.prisma.lab_process.findMany({
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
    return this.prisma.lab_process.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const process = await this.prisma.lab_process.findUnique({
      where: { id },
    });

    if (!process) {
      throw new NotFoundException(`LabProcess with ID ${id} not found`);
    }

    return process;
  }

  async update(id: number, updateDto: UpdateLabProcessDto) {
    await this.findOne(id); // Ensure existence before update

    return this.prisma.lab_process.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure existence before delete

    return this.prisma.lab_process.delete({
      where: { id },
    });
  }
}
