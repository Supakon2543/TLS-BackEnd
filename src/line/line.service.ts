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
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.line.create({ data: createData }); // Create a new record
    }
    return this.prisma.line.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }
  async getLines(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    // ✅ Return empty array if id is explicitly 0
    if (id === 0) {
      return [];
    }

    // Build where clause
    const whereClause: any = {};

    // Add id filter (only if id is a valid positive number)
    if (typeof id === 'number' && !isNaN(id) && id > 0) {
      whereClause.id = id;
    }

    // Add status filter
    if (typeof status === 'number' && !isNaN(status) && status !== 0) {
      whereClause.status = status === 1;
    }

    // ✅ Add keyword filter for both name AND code
    if (keyword && keyword.trim() !== '') {
      whereClause.OR = [
        {
          name: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
        },
        {
          code: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
        },
      ];
    }

    // Get lines with filters
    return this.prisma.line.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      orderBy: [{ code: 'asc' }, { name: 'asc' }],
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
