import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a material
  async createOrUpdate(data: CreateMaterialDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Destructure to exclude id
      return this.prisma.material.create({ data: createData }); // Create a new record
    }
    return this.prisma.material.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // Create a new material
  async create(createDto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: createDto,
    });
  }

  // Get materials with filters
  async getMaterials(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    const materials = await this.prisma.material.findMany({
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
        material_chemical: {
          include: {
            chemical_parameter: {
              select: { name: true }
            }
          }
        },
        material_microbiology: {
          include: {
            microbiology_parameter: {
              select: { name: true }
            }
          }
        }
      }
    });

    return materials.map(material => ({
      id: material.id,
      name: material.name,
      test_report_name: material.test_report_name,
      status: material.status,
      created_on: material.created_on,
      created_by: material.created_by,
      updated_on: material.updated_on,
      updated_by: material.updated_by,
      material_chemical: material.material_chemical.map(mc => ({
        id: mc.id,
        material_id: mc.material_id,
        chemical_parameter_id: mc.chemical_parameter_id,
        chemical_parameter_name: mc.chemical_parameter?.name ?? null,
        created_on: mc.created_on,
        created_by: mc.created_by,
      })),
      material_microbiology: material.material_microbiology.map(mm => ({
        id: mm.id,
        material_id: mm.material_id,
        microbiology_parameter_id: mm.microbiology_parameter_id,
        microbiology_parameter_name: mm.microbiology_parameter?.name ?? null,
        created_on: mm.created_on,
        created_by: mm.created_by,
      })),
    }));
  }

  // Get all materials
  async findAll() {
    return this.prisma.material.findMany({
      orderBy: { name: 'asc' }, // Sorting by name or any field as needed
    });
  }

  // Get a material by ID
  async findOne(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    return material;
  }

  // Update a material by ID
  async update(id: number, updateDto: UpdateMaterialDto) {
    await this.findOne(id); // Ensure the material exists before updating

    return this.prisma.material.update({
      where: { id },
      data: updateDto,
    });
  }

  // Delete a material by ID
  async remove(id: number) {
    await this.findOne(id); // Ensure the material exists before deletion

    return this.prisma.material.delete({
      where: { id },
    });
  }

  async insert_material(@Body() payload: { id: number, name: string, test_report_name: string, status: boolean }) {
    
    return await this.prisma.$executeRaw`
      CALL insert_material(${payload.id}, ${payload.name}, ${payload.test_report_name}, ${payload.status})
    ;`
  }

  async get_material(@Body() payload: { id: number, keyword: string, status: number }) {
    return await this.prisma.$queryRaw`
      SELECT * FROM get_material(${payload.id})
    ;`
  }
}
