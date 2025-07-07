import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { map } from 'rxjs';

@Injectable()
export class BoxService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(data: CreateBoxDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.box.create({ data: createData });
    }
    return this.prisma.box.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: { ...data }, // Update the existing record with the provided data
    });
  }

  async create(createBoxDto: CreateBoxDto) {
    return this.prisma.box.create({
      data: createBoxDto,
    });
  }

  async getBoxes(params: {
  id?: number | string;
  keyword?: string;
  status?: number | string; // This parameter will be ignored
}) {
  let { id, keyword } = params; // Remove status from destructuring

  // Convert id to number if it's a string
  id = id !== undefined ? +id : undefined;

  // Build where clause
  const whereClause: any = {};

  // ✅ Always filter for active boxes only (cannot be overridden)
  whereClause.status = true;

  // Add id filter
  if (typeof id === 'number' && !isNaN(id) && id !== 0) {
    whereClause.id = id;
  }

  // ✅ Add keyword filter for box name, section name, AND location name
  if (keyword && keyword.trim() !== '') {
    whereClause.OR = [
      {
        name: {
          contains: keyword.trim(),
          mode: 'insensitive',
        },
      },
      {
        section: {
          name: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
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

  // Get boxes with filters and multi-level sorting
  const boxes = await this.prisma.box.findMany({
    where: whereClause,
    orderBy: [
      {
        location: {
          name: 'asc', // ✅ Sort by location name first
        },
      },
      {
        section: {
          name: 'asc', // ✅ Then sort by section name for duplicate locations
        },
      },
      {
        name: 'asc', // ✅ Finally sort by box name for duplicate sections
      },
    ],
    include: {
      location: {
        select: { name: true },
      },
      section: {
        select: { name: true },
      },
    },
  });

  // Transform the response to include flattened location_name and section_name
  return boxes.map((box) => ({
    ...box,
    location_name: box.location?.name ?? null,
    section_name: box.section?.name ?? null,
    location: undefined,
    section: undefined,
  }));
}

  async findAll() {
    return this.prisma.box.findMany();
  }

  async findOne(id: number) {
    return this.prisma.box.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBoxDto: CreateBoxDto) {
    return this.prisma.box.update({
      where: { id },
      data: updateBoxDto,
    });
  }

  async remove(id: number) {
    return this.prisma.box.delete({
      where: { id },
    });
  }
}
