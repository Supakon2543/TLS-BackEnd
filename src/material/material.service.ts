import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertMaterialDto } from './dto/upsert-material.dto';

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
  async upsertMaterialWithChildren(@Body() data: UpsertMaterialDto) {
    const material = data;

    // 1. Upsert the main material
    await this.prisma.material.upsert({
      where: { id: material.id },
      update: {
        name: material.name,
        test_report_name: material.test_report_name,
        conclusion: material.conclusion,
        reg_no: material.reg_no,
        is_special_parameter: material.is_special_parameter,
        special_parameter_name: material.special_parameter_name,
        special_parameter_type: material.special_parameter_type,
        remark_report: material.remark_report,
        status: material.status,
        updated_by: material.updated_by,
      },
      create: {
        id: material.id,
        name: material.name,
        test_report_name: material.test_report_name,
        conclusion: material.conclusion,
        reg_no: material.reg_no,
        is_special_parameter: material.is_special_parameter,
        special_parameter_name: material.special_parameter_name,
        special_parameter_type: material.special_parameter_type,
        remark_report: material.remark_report,
        status: material.status,
        created_by: material.created_by,
        updated_by: material.updated_by,
      },
    });

    // 2. Sync material_chemical
    const chemicalIds = material.material_chemical.map((chem: any) => chem.id);

    // Delete ones NOT in the new list
    await this.prisma.material_chemical.deleteMany({
      where: {
        material_id: material.id,
        id: {
          notIn: chemicalIds,
        },
      },
    });

    // Upsert the current ones
    for (const chem of material.material_chemical) {
      await this.prisma.material_chemical.upsert({
        where: { id: chem.id },
        update: {
          chemical_parameter_id: chem.chemical_parameter_id,
        },
        create: {
          material_id: chem.material_id,
          chemical_parameter_id: chem.chemical_parameter_id,
          created_by: chem.created_by,
        },
      });
    }

    // 3. Sync material_microbiology
    const microIds = material.material_microbiology.map(
      (micro: any) => micro.id,
    );

    await this.prisma.material_microbiology.deleteMany({
      where: {
        material_id: material.id,
        id: {
          notIn: microIds,
        },
      },
    });

    for (const micro of material.material_microbiology) {
      await this.prisma.material_microbiology.upsert({
        where: { id: micro.id },
        update: {
          microbiology_parameter_id: micro.microbiology_parameter_id,
        },
        create: {
          material_id: micro.material_id,
          microbiology_parameter_id: micro.microbiology_parameter_id,
          created_by: micro.created_by,
        },
      });
    }

    return { message: 'Upsert and cleanup successful' };
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

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
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
                  select: { name: true },
                },
              },
            },
            material_microbiology: {
              include: {
                microbiology_parameter: {
                  select: { name: true },
                },
              },
            },
          },
        });
        return materials.map((material) => ({
          id: material.id,
          name: material.name,
          test_report_name: material.test_report_name,
          conclusion: material.conclusion,
          reg_no: material.reg_no,
          is_special_parameter: material.is_special_parameter,
          special_parameter_name: material.special_parameter_name,
          special_parameter_type: material.special_parameter_type,
          remark_report: material.remark_report,
          status: material.status,
          created_on: material.created_on,
          created_by: material.created_by,
          updated_on: material.updated_on,
          updated_by: material.updated_by,
          material_chemical: material.material_chemical.map((mc) => ({
            id: mc.id,
            material_id: mc.material_id,
            chemical_parameter_id: mc.chemical_parameter_id,
            chemical_parameter_name: mc.chemical_parameter?.name ?? null,
            created_on: mc.created_on,
            created_by: mc.created_by,
          })),
          material_microbiology: material.material_microbiology.map((mm) => ({
            id: mm.id,
            material_id: mm.material_id,
            microbiology_parameter_id: mm.microbiology_parameter_id,
            microbiology_parameter_name:
              mm.microbiology_parameter?.name ?? null,
            created_on: mm.created_on,
            created_by: mm.created_by,
          })),
        }));
      }
      return [];
    }

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
              select: { name: true },
            },
          },
        },
        material_microbiology: {
          include: {
            microbiology_parameter: {
              select: { name: true },
            },
          },
        },
      },
    });

    return materials.map((material) => ({
      id: material.id,
      name: material.name,
      test_report_name: material.test_report_name,
      conclusion: material.conclusion,
      reg_no: material.reg_no,
      is_special_parameter: material.is_special_parameter,
      special_parameter_name: material.special_parameter_name,
      special_parameter_type: material.special_parameter_type,
      remark_report: material.remark_report,
      status: material.status,
      created_on: material.created_on,
      created_by: material.created_by,
      updated_on: material.updated_on,
      updated_by: material.updated_by,
      material_chemical: material.material_chemical.map((mc) => ({
        id: mc.id,
        material_id: mc.material_id,
        chemical_parameter_id: mc.chemical_parameter_id,
        chemical_parameter_name: mc.chemical_parameter?.name ?? null,
        created_on: mc.created_on,
        created_by: mc.created_by,
      })),
      material_microbiology: material.material_microbiology.map((mm) => ({
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

  async insert_material(
    @Body()
    payload: {
      id: number;
      name: string;
      test_report_name: string;
      status: boolean;
    },
  ) {
    return await this.prisma.$executeRaw`
      CALL insert_material(${payload.id}, ${payload.name}, ${payload.test_report_name}, ${payload.status})
    ;`;
  }

  async get_material(
    @Body() payload: { id: number; keyword: string; status: number },
  ) {
    return await this.prisma.$queryRaw`
      SELECT * FROM get_material(${payload.id})
    ;`;
  }
}
