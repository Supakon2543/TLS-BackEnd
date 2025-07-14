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

    // ✅ Status filter logic
    if (status === 1) {
      // Show only boxes with status = true AND section status = true AND location status = true
      whereClause.status = true;
      whereClause.section = {
        status: true,
      };
      whereClause.location = {
        status: true,
      };
      
    } else if (status === 2) {
      // Show boxes with status = false OR section status = false OR location status = false
      whereClause.OR = [
        {
          status: false,
        },
        {
          section: {
            status: false,
          },
        },
        {
          location: {
            status: false,
          },
        },
      ];
    }
    // If status is undefined or any other value, show all boxes (no status filter)

    // Add id filter (only if id is a valid positive number)
    if (typeof id === 'number' && !isNaN(id) && id > 0) {
      whereClause.id = id;
    }

    // ✅ Add keyword filter for box name, section name, AND location name
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
    }

    // Get boxes with filters and multi-level sorting
    const boxes = await this.prisma.box.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
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
      location_status: box.location?.status ?? null, // Include for debugging
      section_status: box.section?.status ?? null, // Include for debugging
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
