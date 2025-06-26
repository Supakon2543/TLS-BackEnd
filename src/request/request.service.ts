import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveRequestDto } from './dto/save-request.dto';
import e from 'express';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateRequestDto/*, @Response() res: Response*/) {
      return await this.prisma.request.create({
        data: payload,
        // select: {
        //   id: true,
        //   order: true,
        //   name: true,
        //   status :true
        // },
      });
  
      
    }
  
    findAll(/*@Request() req: Request, @Response() res: Response*/) {
      return this.prisma.request.findMany({
        // orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: number/*, @Response() res: Response*/) {
      const request = await this.prisma.request.findUnique({
        where: { id },
      });
  
      if (!request) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }
  
      return request;
    }
  
    async update(/*@Request() req: Request, */@Param() id: number, @Body() payload: UpdateRequestDto/*, @Response() res: Response*/) {
  
      const existingRequest = await this.prisma.request.findUnique({ where: { id } });
  
      if (!existingRequest) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }
  
      return await this.prisma.request.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: number/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const request = await this.prisma.request.findUnique({
        where: { id },
      });
  
      if (!request) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.request.delete({
        where: { id },
      });
    }

    async get_info(params: { id?: number | string; }) {
      let { id } = params;

      // Convert id to number and check validity
      id = id !== undefined ? +id : undefined;
      if (!id || isNaN(id)) {
        throw new NotFoundException('Request ID is required and must be a valid number');
      }

      const request = await this.prisma.request.findUnique({
        where: { id },
        include: {
          request_email: true,
          request_detail: true,
          request_detail_attachment: true,
          request_sample: {
            include: {
              request_sample_chemical: true,
              request_sample_microbiology: true,
              request_sample_item: true,
            },
          },
          request_log: true,
        },
      });

      if (!request) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }

      // Transform to match your desired structure
      return {
        request: {
          ...request,
          // Remove nested arrays/objects from root
          request_email: undefined,
          request_detail: undefined,
          request_detail_attachment: undefined,
          request_sample: undefined,
          request_log: undefined,
        },
        request_email: request.request_email ?? [],
        request_detail: request.request_detail ?? {},
        request_detail_attachment: request.request_detail_attachment ?? [],
        request_sample: (request.request_sample ?? []).map(sample => ({
          ...sample,
          request_sample_chemical: sample.request_sample_chemical ?? [],
          request_sample_microbiology: sample.request_sample_microbiology ?? [],
          request_sample_item: sample.request_sample_item ?? [],
        })),
        request_log: request.request_log ?? []
      };
    }

    async save(@Body() payload: any) {
      // Recursively clear every id if id === 0 in the payload and ensure date values are Date objects or null
      function clearZeroIdsAndDatesAndBy(obj: any) {
        if (Array.isArray(obj)) {
          obj.forEach(clearZeroIdsAndDatesAndBy);
        } else if (obj && typeof obj === 'object') {
          if ('id' in obj && obj.id === 0) obj.id = undefined;
          for (const key in obj) {
            // Set all foreign key fields to null if input as "" or 0 or undefined
            if (
              key.endsWith('_id') &&
              (obj[key] === "" || obj[key] === 0 || obj[key] === undefined)
            ) {
              obj[key] = null;
            }
            // Set all date fields to null if input as ""
            if (
              (key.endsWith('_date') || key.endsWith('_on') || key.endsWith('_time')) &&
              obj[key] === ""
            ) {
              obj[key] = null;
            }
            // Ensure all date fields are Date objects if not null
            if (
              (key.endsWith('_date') || key.endsWith('_on') || key.endsWith('_time')) &&
              obj[key] !== null &&
              obj[key] !== undefined &&
              obj[key] !== ""
            ) {
              // Convert to Date if not already a Date object
              if (!(obj[key] instanceof Date)) {
                obj[key] = new Date(obj[key]);
              }
            }
            // Set all *_by fields to null if input as 0
            if (
              key.endsWith('_by') &&
              obj[key] === 0
            ) {
              obj[key] = null;
            }
          }
          Object.values(obj).forEach(clearZeroIdsAndDatesAndBy);
        }
      }

      clearZeroIdsAndDatesAndBy(payload);

      payload.request.original_id = null; // Ensure original_id is set to 0 for new requests
      // Ensure all nested objects are properly initialized
      const {
        request,
        request_email,
        request_detail,
        request_detail_attachment,
        request_sample,
        request_log,
      } = payload;

      const now = new Date();

      // Only set created_on if this is a new request (id is 0 or undefined)
      if (!request.id || request.id === 0) {
        request.created_on = now;
      }
      request.updated_on = now;

      if (request_detail) {
        if (!request_detail.id || request_detail.id === 0) {
          request_detail.created_on = now;
        }
        request_detail.updated_on = now;
      }

      (request_email ?? []).forEach(e => {
        if (!e.id || e.id === 0) e.created_on = now;
      });
      (request_detail_attachment ?? []).forEach(a => {
        if (!a.id || a.id === 0) a.created_on = now;
      });
      (request_sample ?? []).forEach(s => {
        if (!s.id || s.id === 0) s.created_on = now;
        s.updated_on = now;
        (s.request_sample_chemical ?? []).forEach(c => {
          if (!c.id || c.id === 0) c.created_on = now;
        });
        (s.request_sample_microbiology ?? []).forEach(m => {
          if (!m.id || m.id === 0) m.created_on = now;
        });
        (s.request_sample_item ?? []).forEach(i => {
          if (!i.id || i.id === 0) i.created_on = now;
          i.updated_on = now;
        });
      });

      if (request_log && (!request_log.id || request_log.id === 0)) {
        request_log.created_on = now;
      }

      // ...rest of your save logic remains unchanged...
      if (request_log.activity_request_id == "DRAFT") {
        request.status_request_id = "DRAFT";
      }
      else if (request_log.activity_request_id == "SEND") {
        request.status_request_id = "REVIEW";
        request.review_role_id = "REQ_HEAD";
        if (request.request_type_id == "REQUEST") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'REQUEST' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          request.request_number = "RQ" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
        else if (request.request_type_id == "ROUTINE") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'ROUTINE' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          request.request_number = "RT" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
        else if (request.request_type_id == "QIP") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'QIP' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          request.request_number = "RE" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
      }
  
      // 1. Upsert main request and get the id
      const mainRequest = await this.prisma.request.upsert({
        where: { id: request.id ?? -1 },
        update: { ...request },
        create: { ...request },
      });
  
      const requestId = mainRequest.id;
  
      // 2. Prepare nested DTOs with correct request_id
      const emails = (request_email ?? []).map(e => ({ ...e, request_id: requestId }));
      const detail = request_detail ? { ...request_detail, request_id: requestId } : undefined;
      const attachments = (request_detail_attachment ?? []).map(a => ({ ...a, request_id: requestId }));
      const samples = (request_sample ?? []).map(s => ({
        ...s,
        request_id: requestId,
        material_name: undefined, // Clear material_name to avoid duplication
        request_sample_item: s.request_sample_item?.map(i => ({ ...i })) ?? [],
        request_sample_chemical: s.request_sample_chemical?.map(c => ({ ...c })) ?? [],
        request_sample_microbiology: s.request_sample_microbiology?.map(m => ({ ...m })) ?? [],
      }));
      // Ensure request_log is always a record (single object)
      const record = request_log
        ? { ...request_log, request_id: requestId }
        : undefined;

      // 3. Upsert or replace nested entities
      await this.prisma.request_email.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_detail_attachment.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_sample.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_log.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_detail.deleteMany({ where: { request_id: requestId } });

      await this.prisma.request_email.createMany({ data: emails });
      if (detail) await this.prisma.request_detail.create({ data: detail });
      await this.prisma.request_detail_attachment.createMany({ data: attachments });

      for (const sample of samples) {
        const { request_sample_item, request_sample_chemical, request_sample_microbiology, ...sampleData } = sample;
        const createdSample = await this.prisma.request_sample.create({
          data: sampleData,
        });

        const sampleId = createdSample.id;

        const items = (request_sample_item ?? []).map(i => ({ ...i, request_sample_id: sampleId }));
        const chemicals = (request_sample_chemical ?? []).map(c => ({ ...c, request_sample_id: sampleId }));
        const micro = (request_sample_microbiology ?? []).map(m => ({ ...m, request_sample_id: sampleId }));

        if (items.length > 0) {
          await this.prisma.request_sample_item.createMany({ data: items });
        }
        if (chemicals.length > 0) {
          await this.prisma.request_sample_chemical.createMany({ data: chemicals });
        }
        if (micro.length > 0) {
          await this.prisma.request_sample_microbiology.createMany({ data: micro });
        }
      }

      if (record) {
        await this.prisma.request_log.create({ data: record });
      }

      // 4. Return the full request info
      return this.get_info({ id: requestId });
    }

    async duplicate(@Query() payload: { id: number }) {
      const { id } = payload;

      // 1. Get the original request with all nested data
      const original = await this.prisma.request.findUnique({
        where: { id },
        include: {
          request_detail: true,
          request_sample: {
            include: {
              request_sample_item: true,
            },
          },
        },
      });

      if (!original) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }

      let temp = {
        request: {
          ...original,
          request_detail: undefined,
          request_sample: undefined,
        },
        // Ensure request_detail is a record/object, not an array
        request_detail: Array.isArray(original.request_detail)
          ? (original.request_detail[0] ?? {})
          : (original.request_detail ?? {}),
        request_sample: (original.request_sample ?? []).map(sample => ({
          ...sample,
          id: 0, // Clear ID for duplication
          category_edit_id: 0, // Clear category_edit_id for duplication
          certificate_name: '', // Clear certificate_name for duplication
          path: '', // Clear path for duplication
          revision: 0, // Clear revision for duplication
          is_parameter_completed: false, // Clear is_parameter_completed for duplication
          status_sample_id: '', // Clear status_sample_id for duplication
          note: '', // Clear note for duplication
          request_sample_item: (sample.request_sample_item ?? []).map(item => ({
            ...item,
            id: 0, // Clear ID for duplication
          })),
        })),
      };

      if (temp.request.request_type_id == "REQUEST") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'REQUEST' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          temp.request.request_number = "RQ" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
        else if (temp.request.request_type_id == "ROUTINE") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'ROUTINE' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          temp.request.request_number = "RT" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
        else if (temp.request.request_type_id == "QIP") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'QIP' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          temp.request.request_number = "RE" + year + (lastNumber + 1).toString().padStart(4, "0");
        }

      temp.request.original_id = payload.id; // Set original_id to the ID of the request being duplicated
      temp.request.id = 0; // Clear the ID to create a new request
      temp.request.created_by = 0; // Clear created_by for duplication
      temp.request.updated_by = 0;
      temp.request.created_on = new Date(); // Set created_on to now
      temp.request.updated_on = new Date(); // Set updated_on to now
      temp.request.request_date = new Date(); // Clear request_number for duplication
      temp.request.requester_id = 0; // Clear requester_id for duplication
      temp.request.status_request_id = 'DRAFT'; // Set status to DRAFT for duplication
      temp.request.review_role_id = ''; // Set review role to REQ_HEAD for duplication
      temp.request.telephone = ''; // Clear telephone for duplication

      // Optionally, generate a new request_number here if needed

      // 3. Create the duplicated request
      const newRequest = await this.prisma.request.create({
        data: temp.request });

      // 4. Duplicate request_detail (handled above in nested create)
      temp.request_detail.id = 0; // Set the new request ID
      await this.prisma.request_detail.create({
        data: {
          ...temp.request_detail,
          request_id: newRequest.id,
          // set created_by, created_on as needed
        },
      });

      // 5. Duplicate request_sample and request_sample_item
      for (const sample of temp.request_sample) {
        const {
          id: _sampleId,
          request_id: _sampleReqId,
          created_by: _sampleCreatedBy,
          updated_by: _sampleUpdatedBy,
          created_on: _sampleCreatedOn,
          updated_on: _sampleUpdatedOn,
          request_sample_item,
          ...sampleData
        } = sample;

        // Create new sample
        const newSample = await this.prisma.request_sample.create({
          data: {
            ...sampleData,
            request_id: newRequest.id,
            // set created_by, created_on as needed
          },
        });

        // Duplicate sample items
        for (const item of request_sample_item) {
          const {
            id: _itemId,
            request_sample_id: _itemSampleId,
            created_by: _itemCreatedBy,
            updated_by: _itemUpdatedBy,
            created_on: _itemCreatedOn,
            updated_on: _itemUpdatedOn,
            ...itemData
          } = item;

          await this.prisma.request_sample_item.create({
            data: {
              ...itemData,
              request_sample_id: newSample.id,
              // set created_by, created_on as needed
            },
          });
        }
      }

      // 6. Return the new duplicated request info
      return this.get_info({ id: newRequest.id });
    }
}
