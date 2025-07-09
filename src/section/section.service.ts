import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

async getSections(params: {
  id?: number;
  keyword?: string;
  status?: number | string; // This parameter will be ignored
}) {
  let { id, keyword } = params; // Remove status from destructuring

  // Convert id to number if it's a string
  id = id !== undefined ? +id : undefined;

  // ✅ Return empty array if id is explicitly 0
  if (id === 0) {
    return [];
  }

  // Build where clause
  const whereClause: any = {};

  // ✅ Always filter for active sections only (cannot be overridden)
  whereClause.status = true;

  // Add id filter
  if (typeof id === 'number' && !isNaN(id) && id > 0) {
    whereClause.id = id;
  }

  // ✅ Add keyword filter for both section name AND location name
  if (keyword && keyword.trim() !== '') {
    whereClause.OR = [
      {
        name: {
          contains: keyword.trim(),
          mode: 'insensitive',
        },
      },
      {
        location: {
          name: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
          status: true, // Ensure location is also active
        },
      },
    ];
  }

  // Get sections with filters and sort by location name
  const sections = await this.prisma.section.findMany({
    where: whereClause,
    orderBy: [
      {
        location: {
          name: 'asc',
        },
      },
      {
        name: 'asc',
      },
    ],
    include: {
      location: {
        select: { 
          name: true,
          status: true, // Include status for debugging if needed
        },
      },
    },
  });

  // Transform the response to include location_name at the top level
  return sections.map((s) => ({
    ...s,
    location_name: s.location?.name ?? null,
    location: undefined,
  }));
}

  // Create or update a record
  async createOrUpdate(data: CreateSectionDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.section.create({ data: createData }); // Create a new record
    }
    return this.prisma.section.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(data: CreateSectionDto) {
    return this.prisma.section.create({ data });
  }

  async findAll() {
    return this.prisma.section.findMany();
  }

  async findOne(id: number) {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) throw new NotFoundException(`Section ID ${id} not found`);
    return section;
  }

  async update(id: number, data: UpdateSectionDto) {
    await this.findOne(id);
    return this.prisma.section.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.section.delete({ where: { id } });
  }
}
