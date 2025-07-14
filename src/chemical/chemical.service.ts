import { Injectable } from '@nestjs/common';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChemicalService {
  constructor(private readonly prisma: PrismaService) {}

  createOrUpdate(data: CreateChemicalDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.chemical.create({ data: createData });
    }
    return this.prisma.chemical.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async getChemicals(params: {
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
  if (typeof status === 'number' && !isNaN(status) && status !== 0) {
    whereClause.status = status === 1;
  }

  // ✅ Add keyword filter for multiple fields
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
      {
        storage_condition: {
          contains: keyword.trim(),
          mode: 'insensitive',
        },
      },
      {
        manufacturer: {
          name: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
        },
      },
      {
        category_chemical: {
          name: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  // Get chemicals with filterssad
  const chemicals = await this.prisma.chemical.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    orderBy: { code: 'asc' },
    include: {
      manufacturer: {
        select: { name: true },
      },
      category_chemical: {
        select: { name: true },
      },
    },
  });

  // Map to add flattened names at the top level
  return chemicals.map((c) => ({
    ...c,
    manufacturer_name: c.manufacturer?.name ?? null,
    category_chemical_name: c.category_chemical?.name ?? null,
    manufacturer: undefined, // Remove the nested object
    category_chemical: undefined, // Remove the nested object
  }));
}

  create(data: CreateChemicalDto) {
    return this.prisma.chemical.create({ data });
  }

  findAll() {
    return this.prisma.chemical.findMany();
  }

  findOne(id: number) {
    return this.prisma.chemical.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateChemicalDto) {
    return this.prisma.chemical.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.chemical.delete({ where: { id } });
  }
}
