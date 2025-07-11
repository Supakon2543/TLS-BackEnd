import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateLocationDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.location.create({ data: createData }); // Create a new record
    }
    return this.prisma.location.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  async getLocations(params: {
  id?: number;
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
  if (typeof status === 'number' && status !== 0) {
    whereClause.status = status === 1;
  }

  // Add keyword filter
  if (keyword && keyword.trim() !== '') {
    whereClause.name = {
      contains: keyword.trim(),
      mode: 'insensitive',
    };
  }

  // Use raw SQL for the entire query to get exact collation control
  let baseQuery = `
    SELECT * FROM public.location
  `;
  
  let conditions: string[] = [];
  let queryParams: any[] = [];
  let paramIndex = 1;

  // Build WHERE conditions
  if (Object.keys(whereClause).length > 0) {
    if (whereClause.id) {
      conditions.push(`id = $${paramIndex}`);
      queryParams.push(whereClause.id);
      paramIndex++;
    }
    
    if (whereClause.status !== undefined) {
      conditions.push(`status = $${paramIndex}`);
      queryParams.push(whereClause.status);
      paramIndex++;
    }
    
    if (whereClause.name?.contains) {
      conditions.push(`name ILIKE $${paramIndex}`);
      queryParams.push(`%${whereClause.name.contains}%`);
      paramIndex++;
    }
  }

  // Add WHERE clause if conditions exist
  if (conditions.length > 0) {
    baseQuery += ` WHERE ${conditions.join(' AND ')}`;
  }

  // ✅ Add ORDER BY with specific collation
  baseQuery += ` ORDER BY name COLLATE "C" ASC`;

  // Execute the query
  return this.prisma.$queryRawUnsafe(baseQuery, ...queryParams);
}

  async findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } });
    if (!location) throw new NotFoundException(`Location ID ${id} not found`);
    return location;
  }

  async update(id: number, data: UpdateLocationDto) {
    await this.findOne(id);
    return this.prisma.location.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.location.delete({ where: { id } });
  }
}
