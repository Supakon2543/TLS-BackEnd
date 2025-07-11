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
  status?: number | string;
}) {
  let { id, keyword, status } = params;

  // Convert id to number if it's a string
  id = id !== undefined ? +id : undefined;

  // Convert status to number if it's a string
  status = status !== undefined ? +status : undefined;

  // ✅ Return empty array if id is explicitly 0
  if (id === 0) {
    return [];
  }

  // Build where clause
  const whereClause: any = {};

  // ✅ Status filter logic
  if (status === 1) {
    // Show only sections with status = true AND location status = true
    whereClause.status = true;
    whereClause.location = {
      status: true,
    };
  } else if (status === 2) {
    // Show sections with status = false OR location status = false
    whereClause.OR = [
      {
        status: false,
      },
      {
        location: {
          status: false,
        },
      },
    ];
  }
  // If status is undefined or any other value, show all sections (no status filter)

  // Add id filter
  if (typeof id === 'number' && !isNaN(id) && id > 0) {
    whereClause.id = id;
  }

  // ✅ Add keyword filter for both section name AND location name
  if (keyword && keyword.trim() !== '') {
    // If we already have an OR condition from status filter, we need to handle it differently
    if (whereClause.OR) {
      // Combine existing OR conditions with keyword search
      whereClause.AND = [
        {
          OR: whereClause.OR, // Keep existing OR conditions
        },
        {
          OR: [
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
              },
            },
          ],
        },
      ];
      // Remove the original OR to avoid conflicts
      delete whereClause.OR;
    } else {
      // No existing OR conditions, add keyword search normally
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
          },
        },
      ];
    }
  }

  // Get sections with filters and sort by location name
  const sections = await this.prisma.section.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
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
          status: true,
        },
      },
    },
  });

  // Transform the response to include location_name at the top level
  return sections.map((s) => ({
    ...s,
    location_name: s.location?.name ?? null,
    location_status: s.location?.status ?? null, // Include location status for debugging
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
