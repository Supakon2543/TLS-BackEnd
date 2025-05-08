import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as needed
import { CreateLabProcessDto } from './dto/create-lab_process.dto';
import { UpdateLabProcessDto } from './dto/update-lab_process.dto';

@Injectable()
export class LabProcessService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateLabProcessDto) {
    return this.prisma.lab_process.create({
      data: createDto,
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
