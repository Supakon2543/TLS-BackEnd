import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';

@Injectable()
export class LineService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new line
  async create(data: CreateLineDto) {
    return this.prisma.line.create({ data });
  }

  // Retrieve all lines
  async findAll() {
    return this.prisma.line.findMany();
  }

  // Retrieve a single line by ID
  async findOne(id: number) {
    const line = await this.prisma.line.findUnique({ where: { id } });
    if (!line) {
      throw new NotFoundException(`Line with ID ${id} not found`);
    }
    return line;
  }

  // Update a line by ID
  async update(id: number, data: UpdateLineDto) {
    await this.findOne(id); // Ensure it exists
    return this.prisma.line.update({
      where: { id },
      data,
    });
  }

  // Delete a line by ID
  async remove(id: number) {
    await this.findOne(id); // Ensure it exists
    return this.prisma.line.delete({ where: { id } });
  }
}
