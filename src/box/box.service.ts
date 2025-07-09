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
  status?: number | string;
}) {
  let { id, keyword, status } = params;

  // Convert id and status to numbers if they are strings
  id = id !== undefined ? +id : undefined;
  status = status !== undefined ? +status : undefined;

  // ✅ Return null if id is explicitly 0
  if (id === 0) {
    return null;
  }

  // Build where clause
  const whereClause: any = {};

  // ✅ Add status filter (can be overridden by parameter)
  if (typeof status === 'number' && !isNaN(status)) {
    whereClause.status = status === 1; // 1 = true, 0 or other = false
  } else {
    // Default to showing only active boxes if no status specified
    whereClause.status = true;
  }

  // ✅ Always filter for active locations and sections
  whereClause.location = {
    status: true, // Only include boxes from active locations
  };

  whereClause.section = {
    status: true, // Only include boxes from active sections
  };

  // Add id filter (only if id is a valid positive number)
  if (typeof id === 'number' && !isNaN(id) && id > 0) {
    whereClause.id = id;
  }

  // ✅ Add keyword filter for box name, section name, AND location name
  if (keyword && keyword.trim() !== '') {
    // When using keyword search, we need to merge the status filters with OR conditions
    whereClause.AND = [
      // Ensure location and section are active, and apply status filter
      {
        location: { status: true },
        section: { status: true },
        status: whereClause.status, // Apply the status filter here too
      },
      // Apply keyword search
      {
        OR: [
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
              status: true, // Ensure section is active in keyword search
            },
          },
          {
            location: {
              name: {
                contains: keyword.trim(),
                mode: 'insensitive',
              },
              status: true, // Ensure location is active in keyword search
            },
          },
        ],
      },
    ];

    // Remove the individual filters since they're now in AND
    delete whereClause.location;
    delete whereClause.section;
    delete whereClause.status;
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
        select: {
          name: true,
          status: true, // Include status for debugging if needed
        },
      },
      section: {
        select: {
          name: true,
          status: true, // Include status for debugging if needed
        },
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
