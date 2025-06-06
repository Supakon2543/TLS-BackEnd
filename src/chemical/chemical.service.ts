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

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        const chemicals = await this.prisma.chemical.findMany({
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
          include: {
            manufacturer: {
              select: { name: true },
            },
            category_chemical: {
              select: { name: true },
            },
          },
        });
        return chemicals.map((c) => ({
      ...c,
      manufacturer_name: c.manufacturer?.name ?? null,
      category_chemical_name: c.category_chemical?.name ?? null,
      manufacturer: undefined, // Optionally remove the nested object
      category_chemical: undefined, // Optionally remove the nested object
    }));
      }
      return [];
    }

    const chemicals = await this.prisma.chemical.findMany({
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
      include: {
        manufacturer: {
          select: { name: true },
        },
        category_chemical: {
          select: { name: true },
        },
      },
    });

    // Map to add manufacturer_name at the top level
    return chemicals.map((c) => ({
      ...c,
      manufacturer_name: c.manufacturer?.name ?? null,
      category_chemical_name: c.category_chemical?.name ?? null,
      manufacturer: undefined, // Optionally remove the nested object
      category_chemical: undefined, // Optionally remove the nested object
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
