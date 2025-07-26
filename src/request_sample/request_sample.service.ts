import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestSampleDto } from './dto/create-request_sample.dto';
import { UpdateRequestSampleDto } from './dto/update-request_sample.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestSampleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRequestSampleDto: CreateRequestSampleDto) {
    return 'This action adds a new requestSample';
  }

  findAll() {
    return `This action returns all requestSample`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestSample`;
  }

  update(id: number, updateRequestSampleDto: UpdateRequestSampleDto) {
    return `This action updates a #${id} requestSample`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestSample`;
  }

  async GET_SampleLabel(sample_id: number) {
    try {
      // Step 1: Get basic sample information with joins
      const result = await this.prisma.request_sample.findUnique({
        where: { id: sample_id },
        select: {
          id: true,
          sample_code: true,
          sample_name: true,
          material_id: true,
          material_code: true, // Assuming this is the correct field
          batch_no: true,
          request_id: true,
          // Join with request to get request type
          request: {
            select: {
              request_type_id: true,
              request_log: {
                select: {
                  timestamp: true,
                },
              },
            },
          },
          // Get ALL request_sample_item data
          request_sample_item: {
            select: {
              lab_test_id: true,
              time: true,
              seq: true,
              // Join with lab_test to get lab_test_name
              lab_test: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              seq: 'asc', // Order by sequence
            },
          },
        },
      });

      if (!result) {
        throw new NotFoundException(`Sample with ID ${sample_id} not found`);
      }

      // Step 2: Get max seq (total) from request_sample_item
      const maxSeqResult = await this.prisma.request_sample_item.aggregate({
        where: {
          request_sample_id: sample_id,
        },
        _max: {
          seq: true,
        },
      });

      const total = maxSeqResult._max.seq || 0;

      // Step 3: Get log_date from request_log
      const log_date = result.request?.request_log?.[0]?.timestamp || null;

      // Step 4: Get parameters based on request type
      let parameterText = '';
      const requestType = result.request?.request_type_id;

      if (requestType === 'REQUEST') {
        // Changed to uppercase to match your seed data
        // Get parameters from request_sample_chemical and request_sample_microbiology
        const [chemicalParams, microbiologyParams] = await Promise.all([
          this.prisma.request_sample_chemical.findMany({
            where: { request_sample_id: sample_id },
            select: {
              chemical_parameter: {
                select: {
                  name: true,
                  name_abb: true,
                },
              },
            },
          }),
          this.prisma.request_sample_microbiology.findMany({
            where: { request_sample_id: sample_id },
            select: {
              microbiology_parameter: {
                select: {
                  name: true,
                  name_abb: true,
                },
              },
            },
          }),
        ]);

        // Build parameter text list
        const parameterList = [
          ...chemicalParams
            .filter((item) => item.chemical_parameter)
            .map((item) => item.chemical_parameter?.name),
          ...microbiologyParams
            .filter((item) => item.microbiology_parameter)
            .map((item) => item.microbiology_parameter?.name),
        ];

        parameterText = parameterList.join(',');
      } else {
        const materialId = result.material_id ?? '';
        console.log('Material ID:', materialId);
        const [chemicalParams, microbiologyParams] = await Promise.all([
          this.prisma.material_chemical.findMany({
            where: { material_id: materialId }, // Assuming material_id is the material_id
            select: {
              chemical_parameter: {
                select: {
                  name: true,
                  name_abb: true,
                },
              },
            },
          }),
          this.prisma.material_microbiology.findMany({
            where: { material_id: materialId }, // Assuming material_id is the material_id
            select: {
              microbiology_parameter: {
                select: {
                  name: true,
                  name_abb: true,
                },
              },
            },
          }),
        ]);

        // Build parameter text list using name_abb if available, otherwise name
        const parameterList = [
          ...chemicalParams.map((param) => param.chemical_parameter.name),
          ...microbiologyParams.map(
            (param) => param.microbiology_parameter.name,
          ),
        ];

        parameterText = parameterList.join(',');
      }

      // Step 5: Build response array based on request_sample_item count
      const request_sample_item = result.request_sample_item.map((item) => ({
        sample_code: result.sample_code,
        sample_name: result.sample_name,
        material_id: result.material_id,
        batch_no: result.batch_no,
        log_date: log_date,
        lab_test_name: item.lab_test?.name || null,
        time: item.time || null,
        seq: item.seq || null,
        total: total,
        parameter: parameterText,
      }));

      // Step 6: Return the formatted response with multiple items
      return {
        request_sample_item,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to get sample label: ${error.message}`);
    }
  }
}
