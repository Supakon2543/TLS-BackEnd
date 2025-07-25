import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import { CreateChemicalParameterDto } from './dto/create-chemical_parameter.dto';
import { UpdateChemicalParameterDto } from './dto/update-chemical_parameter.dto';

@Injectable()
export class ChemicalParameterService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateChemicalParameterDto) {
    const {
      id,
      created_on,
      updated_on,
      chemical_sample_description,
      ...parameterData
    } = data;

    let chemicalSampleDescriptions: Array<any> = [];
    if (
      chemical_sample_description &&
      Array.isArray(chemical_sample_description)
    ) {
      chemicalSampleDescriptions = await Promise.all(
        chemical_sample_description.map(async (desc) => {
          const {
            id: descId,
            chemical_parameter_id,
            created_on,
            updated_on,
            ...descData
          } = desc;
          if (!descId || descId === 0) {
            return { ...descData };
          } else {
            await this.prisma.chemical_sample_description.update({
              where: { id: descId },
              data: { ...descData },
            });
            return { id: descId };
          }
        }),
      );
    }

    if (!id) {
      // Clean parameterData for creation as well
      const cleanCreateData: any = { ...parameterData };
      
      // Validate unit_id - remove if null, undefined, or 0 to avoid foreign key constraint
      if (!cleanCreateData.unit_id || cleanCreateData.unit_id === 0) {
        delete cleanCreateData.unit_id;
      }
      
      // Validate other optional foreign key fields
      if (!cleanCreateData.sample_type_id || cleanCreateData.sample_type_id === '') {
        delete cleanCreateData.sample_type_id;
      }
      
      if (!cleanCreateData.spec_type_id || cleanCreateData.spec_type_id === '') {
        delete cleanCreateData.spec_type_id;
      }

      // Create chemical_parameter first
      const createdParam = await this.prisma.chemical_parameter.create({
        data: { ...cleanCreateData },
      });

      // Now create chemical_sample_description with the new chemical_parameter_id
      if (chemicalSampleDescriptions.length) {
        await Promise.all(
          chemicalSampleDescriptions
            .filter((desc: any) => !desc.id)
            .map((desc: any) =>
              this.prisma.chemical_sample_description.create({
                data: {
                  ...desc,
                  chemical_parameter_id: createdParam.id,
                },
              }),
            ),
        );
      }

      // Return the created parameter with its sample descriptions
      return this.prisma.chemical_parameter.findUnique({
        where: { id: createdParam.id },
        include: { chemical_sample_description: true },
      });
    }

    // For update: update parameter and handle nested chemical_sample_description
    // Clean parameterData to handle foreign key constraints
    const cleanParameterData: any = { ...parameterData };
    
    // Validate unit_id - remove if null, undefined, or 0 to avoid foreign key constraint
    if (!cleanParameterData.unit_id || cleanParameterData.unit_id === 0) {
      delete cleanParameterData.unit_id;
    }
    
    // Validate other optional foreign key fields
    if (!cleanParameterData.sample_type_id || cleanParameterData.sample_type_id === '') {
      delete cleanParameterData.sample_type_id;
    }
    
    if (!cleanParameterData.spec_type_id || cleanParameterData.spec_type_id === '') {
      delete cleanParameterData.spec_type_id;
    }

    return this.prisma.chemical_parameter.update({
      where: { id },
      data: {
        ...cleanParameterData,
        chemical_sample_description: chemicalSampleDescriptions.length
          ? {
              create: chemicalSampleDescriptions.filter(
                (desc: any) => !desc.id,
              ),
              connect: chemicalSampleDescriptions
                .filter((desc: any) => desc.id)
                .map((desc: any) => ({ id: desc.id })),
            }
          : undefined,
      },
      include: { chemical_sample_description: true },
    });
  }
  async getChemicalParameters(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
    material_id?: string;
  }) {
    let { id, keyword, status, material_id } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    // Build where clause
    const whereClause: any = {};

    // Add id filter
    if (typeof id === 'number' && !isNaN(id) && id !== 0) {
      whereClause.id = id;
    }

    // Add status filter
    if (typeof status === 'number' && !isNaN(status) && status !== 0) {
      whereClause.status = status === 1;
    }

    // ✅ Add keyword filter for both name AND spec
    if (keyword && keyword.trim() !== '') {
      whereClause.OR = [
        {
          name: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
        },
        {
          spec: {
            contains: keyword.trim(),
            mode: 'insensitive',
          },
        },
      ];
    }

    // ✅ Add material_id filter through material_chemical mapping
    if (material_id && material_id.trim() !== '') {
      whereClause.material_chemical = {
        some: {
          material_id: material_id.trim(),
        },
      };
    }

    // Get chemical parameters with filters
    const results = await this.prisma.chemical_parameter.findMany({
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    // Ensure numeric fields are returned as numbers (not strings)
    return results.map((item) => ({
      ...item,
      request_min:
        item.request_min !== null && item.request_min !== undefined
          ? Number(item.request_min)
          : null,
      spec_min:
        item.spec_min !== null && item.spec_min !== undefined
          ? Number(item.spec_min)
          : null,
      spec_max:
        item.spec_max !== null && item.spec_max !== undefined
          ? Number(item.spec_max)
          : null,
      warning_max:
        item.warning_max !== null && item.warning_max !== undefined
          ? Number(item.warning_max)
          : null,
      warning_min:
        item.warning_min !== null && item.warning_min !== undefined
          ? Number(item.warning_min)
          : null,
    }));
  }

  // ...existing code...
  async getChemicalParametersWithSampleDescriptions(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Build where clause for chemical_parameter
    const where: any = {};
    if (id !== undefined && id !== null) where.id = +id;
    if (keyword) where.name = { contains: keyword, mode: 'insensitive' };
    if (status !== undefined && status !== null && status !== 0) {
      where.status = status === 1 || status === '1';
    }

    // Get all chemical_parameters
    const parameters = await this.prisma.chemical_parameter.findMany({
      where,
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });

    // For each chemical_parameter, get all sample_description and left join chemical_sample_description
    const sampleDescriptions = await this.prisma.sample_description.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }], // <-- order by sample_description.order
      include: {
        chemical_sample_description: true,
      },
    });

    // ...existing code...

    // For each parameter, collect all sample_descriptions, even if no chemical_sample_description exists
    return parameters.map((param) => {
      // Find all sample_descriptions, and for each, find the chemical_sample_description for this parameter (if any)
      // Sort sampleDescriptions by order (already sorted above)
      const chemical_sample_description = sampleDescriptions.map((sample) => {
        const desc = sample.chemical_sample_description.find(
          (d) => d.chemical_parameter_id === param.id,
        );
        if (desc) {
          return {
            id: desc.id,
            sample_description_id: sample.id,
            sample_description_name: sample.name,
            lod_value: desc.lod_value,
            loq_value: desc.loq_value,
            created_on: desc.created_on,
            created_by: desc.created_by,
            updated_on: desc.updated_on,
            updated_by: desc.updated_by,
          };
        } else {
          // No chemical_sample_description for this parameter and sample_description
          return {
            id: null,
            sample_description_id: sample.id,
            sample_description_name: sample.name,
            lod_value: null,
            loq_value: null,
            created_on: null,
            created_by: null,
            updated_on: null,
            updated_by: null,
          };
        }
      });

      // chemical_sample_description is already ordered by sample_description.order
      return {
        id: param.id,
        order: param.order,
        name: param.name,
        name_abb: param.name_abb,
        request_min:
          param.request_min !== null && param.request_min !== undefined
            ? Number(param.request_min)
            : null,
        unit_id: param.unit_id,
        sample_type_id: param.sample_type_id,
        spec_type_id: param.spec_type_id,
        spec: param.spec,
        spec_min:
          param.spec_min !== null && param.spec_min !== undefined
            ? Number(param.spec_min)
            : null,
        spec_max:
          param.spec_max !== null && param.spec_max !== undefined
            ? Number(param.spec_max)
            : null,
        warning_min:
          param.warning_min !== null && param.warning_min !== undefined
            ? Number(param.warning_min)
            : null,
        warning_max:
          param.warning_max !== null && param.warning_max !== undefined
            ? Number(param.warning_max)
            : null,
        final_result: param.final_result,
        decimal: param.decimal,
        is_enter_spec_min: param.is_enter_spec_min,
        is_enter_spec_max: param.is_enter_spec_max,
        is_enter_warning_min: param.is_enter_warning_min,
        is_enter_warning_max: param.is_enter_warning_max,
        is_enter_decimal: param.is_enter_decimal,
        method: param.method,
        status: param.status,
        created_on: param.created_on,
        created_by: param.created_by,
        updated_on: param.updated_on,
        updated_by: param.updated_by,
        chemical_sample_description,
      };
    });
  }
  // ...existing code...

  // Get all records
  async findAll() {
    return this.prisma.chemical_parameter.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  // Get one record by ID
  async findOne(id: number) {
    const item = await this.prisma.chemical_parameter.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Chemical Parameter with ID ${id} not found`);
    }

    return item;
  }

  // Update a record
  async update(id: number, dto: UpdateChemicalParameterDto) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.chemical_parameter.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a record
  async remove(id: number) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.chemical_parameter.delete({
      where: { id },
    });
  }
}
