import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';

@Injectable()
export class LineService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a line
  async createOrUpdate(data: CreateLineDto) {

    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Destructure to exclude id
      return this.prisma.line.create({ data: createData }); // Create a new record
    }
    return this.prisma.line.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

   // Retrieve lines with filters
  async getLines(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    return this.prisma.line.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { name: 'asc' },
    });
  }

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
