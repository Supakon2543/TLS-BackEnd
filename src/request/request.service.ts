import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveRequestDto } from './dto/save-request.dto';
import e from 'express';
import { DuplicateRequestDto } from './dto/duplicate-request.dto';
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CancelRequestDto } from './dto/cancel-request.dto';

@Injectable()
export class RequestService {
  private readonly s3 = new S3Client({
      region: process.env.AWS_REGION,
      // credentials: {
      //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      // },
  });
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateRequestDto/*, @Response() res: Response*/) {
      return await this.prisma.request.create({
        data: payload,
        // select: {
        //   id: true,
        //   order: 'asc' },
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
        return {} // throw new NotFoundException('Request ID is required and must be a valid number');
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
        return {} // throw new NotFoundException(`Request with ID ${id} not found`);
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
      const request_id = await this.prisma.$transaction(async (tx) => {
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
          request_log.timestamp = now;
        }

        // ...rest of your save logic remains unchanged...
        if (request_log.activity_request_id == "DRAFT") {
          request.status_request_id = "DRAFT";
          request_log.status_request_id = "DRAFT";
        }
        else if (request_log.activity_request_id == "SEND") {
          request.status_request_id = "REVIEW";
          request.review_role_id = "REQ_HEAD";
          request_log.status_request_id = "REVIEW";
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
        const mainRequest = await tx.request.upsert({
          where: { id: request.id ?? -1 },
          update: {
            // ...other fields...
            lab_site: request.lab_site_id ? { connect: { id: request.lab_site_id } } : undefined,
            request_type: request.request_type_id ? { connect: { id: request.request_type_id } } : undefined,
            requester: request.requester_id ? { connect: { id: request.requester_id } } : undefined,
            status_request: request.status_request_id ? { connect: { id: request.status_request_id } } : undefined,
            status_sample: request.status_sample_id ? { connect: { id: request.status_sample_id } } : undefined,
            review_role: request.review_role_id ? { connect: { id: request.review_role_id } } : undefined,
            // ...other fields...
          },
          create: {
            // ...other fields...
            lab_site: request.lab_site_id ? { connect: { id: request.lab_site_id } } : undefined,
            request_type: request.request_type_id ? { connect: { id: request.request_type_id } } : undefined,
            requester: request.requester_id ? { connect: { id: request.requester_id } } : undefined,
            status_request: request.status_request_id ? { connect: { id: request.status_request_id } } : undefined,
            status_sample: request.status_sample_id ? { connect: { id: request.status_sample_id } } : undefined,
            review_role: request.review_role_id ? { connect: { id: request.review_role_id } } : undefined,
            // ...other fields...
          },
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
        let s3Path = `tls/${process.env.ENVNAME}/request-detail-attachment/${requestId}/${attachments.filename}`;
        let filename = attachments.filename;

        // 1. Fetch all attachments for the request
        const attachmentsToDelete = await this.prisma.request_detail_attachment.findMany({
          where: { request_id: requestId }
        });
  
        // 2. Loop and delete each file from S3
        for (const attachment of attachmentsToDelete) {
          if (attachment.path && typeof attachment.path === 'string' && attachment.path.trim() !== '') {
            // Remove leading slash if present
            const s3Key = attachment.path.startsWith('/') ? attachment.path.slice(1) : attachment.path;
            try {
              await this.s3.send(
                new (await import('@aws-sdk/client-s3')).DeleteObjectCommand({
                  Bucket: process.env.AWS_S3_BUCKET!,
                  Key: s3Key,
                }),
              );
            } catch (err) {
              // Log but don't throw, so the process continues
              console.warn('Failed to delete S3 file:', s3Key, err?.message || err);
            }
          }
        }
        await tx.request_email.deleteMany({ where: { request_id: requestId } });
        await tx.request_detail_attachment.deleteMany({ where: { request_id: requestId } });
        await tx.request_sample.deleteMany({ where: { request_id: requestId } });
        await tx.request_log.deleteMany({ where: { request_id: requestId } });
        await tx.request_detail.deleteMany({ where: { request_id: requestId } });

        await tx.request_email.createMany({ data: emails });
        if (detail) await tx.request_detail.create({ data: detail });
        // If base64 is provided (raw, not data URL), upload to S3
        for (const attachment of attachments) {
          if (attachment.base64 && attachment.base64 !== '') {
            let buffer: Buffer;
            let mimeType = 'application/octet-stream';
            let filename = attachment.filename || `file_${Date.now()}`;
            let s3Key = `tls/${process.env.ENVNAME}/request-detail-attachment/${requestId}/${filename}`;

            if (attachment.base64.startsWith('data:')) {
              const matches = attachment.base64.match(/^data:(.+);base64,(.+)$/);
              if (!matches) throw new Error('Invalid base64 format');
              mimeType = matches[1];
              buffer = Buffer.from(matches[2], 'base64');
            } else {
              buffer = Buffer.from(attachment.base64, 'base64');
              // Optionally, set mimeType based on file extension
              if (filename.endsWith('.pdf')) {
                mimeType = 'application/pdf';
              } else if (filename.endsWith('.png')) {
                mimeType = 'image/png';
              } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
                mimeType = 'image/jpeg';
              } else if (filename.endsWith('.txt')) {
                mimeType = 'text/plain';
              } else if (filename.endsWith('.docx')) {
                mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
              } else if (filename.endsWith('.xlsx')) {
                mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
              }
            }

            await this.s3.send(
              new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET!,
                Key: s3Key,
                Body: buffer,
                ContentType: mimeType,
              }),
            );
            // Set the S3 path for later DB insert
            attachment.path = `/${s3Key}`;
            // Optionally, remove base64 to avoid storing it in DB
            delete attachment.base64;
          }
        }
        await tx.request_detail_attachment.createMany({ data: attachments });

        for (const sample of samples) {
          const { request_sample_item, request_sample_chemical, request_sample_microbiology, ...sampleData } = sample;
          const createdSample = await tx.request_sample.create({
            data: sampleData,
          });

          const sampleId = createdSample.id;

          const items = (request_sample_item ?? []).map(i => {
            // Remove undefined fields
            const clean = Object.fromEntries(
              Object.entries(i).filter(([_, v]) => v !== undefined)
            );
            return { ...clean, request_sample_id: sampleId };
          });
          console.log('items:', items);
          const chemicals = (request_sample_chemical ?? []).map(c => ({ ...c, request_id: undefined, request_sample_id: sampleId }));
          const micro = (request_sample_microbiology ?? []).map(m => ({ ...m, request_id: undefined, request_sample_id: sampleId }));

          if (items.length > 0) {
            const BATCH_SIZE = 10; // Try a smaller batch size
            for (let i = 0; i < items.length; i += BATCH_SIZE) {
              const batch = items.slice(i, i + BATCH_SIZE);

              // Validate and log the batch
              for (const [idx, item] of batch.entries()) {
                if (!item || typeof item !== 'object') {
                  console.error('Invalid item at batch index', idx, item);
                  throw new Error('Invalid item in request_sample_item batch');
                }
                // Add more field checks as needed, e.g.:
                // if (!item.requiredField) { ... }
              }

              await tx.request_sample_item.createMany({ data: batch });
            }
          }
          console.log('chemicals:', chemicals);
          if (chemicals.length > 0) {
            await tx.request_sample_chemical.createMany({ data: chemicals });
          }
          console.log('micro:', micro);
          if (micro.length > 0) {
            await tx.request_sample_microbiology.createMany({ data: micro });
          }
        }
        // record.request = { connect: { id: requestId } };
        console.log('record:', record);
        if (record) {
          await tx.request_log.create({ data: record });
        }
        return requestId;
      });
      console.log('request_id:', request_id);
      console.log('get_info:', await this.get_info({ id: request_id }));
      // 4. Return the full request info
      // return await this.get_info({ id: request_id });
      return {
        message: 'Success', //`Request with ID ${request_id} saved successfully.`,
        id: request_id,
      };
    }

    async duplicate(@Query() payload: DuplicateRequestDto) {
      const { id, user_id } = payload;

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

      // Remove all IDs recursively for duplication
      function removeIds(obj: any) {
        if (Array.isArray(obj)) {
          obj.forEach(removeIds);
        } else if (obj && typeof obj === 'object') {
          if ('id' in obj) delete obj.id;
          for (const key in obj) {
            removeIds(obj[key]);
          }
        }
      }

      // Deep clone and clean
      const temp = {
        request: {
          ...original,
          request_detail: undefined,
          request_sample: undefined,
        },
        request_detail: Array.isArray(original.request_detail)
          ? (original.request_detail[0] ?? {})
          : (original.request_detail ?? {}),
        request_sample: (original.request_sample ?? []).map(sample => ({
          ...sample,
          request_sample_item: (sample.request_sample_item ?? []).map(item => ({ ...item })),
        })),
      };

      // Remove IDs from all nested objects
      removeIds(temp.request);
      removeIds(temp.request_detail);
      temp.request_sample.forEach(sample => {
        removeIds(sample);
        (sample.request_sample_item ?? []).forEach(removeIds);
      });

      // Set/override fields for the new duplicated request
      temp.request.original_id = payload.id;
      temp.request.created_by = user_id;
      temp.request.updated_by = user_id;
      temp.request.created_on = new Date();
      temp.request.updated_on = new Date();
      temp.request.request_date = new Date();
      temp.request.requester_id = user_id;
      temp.request.status_request_id = 'DRAFT';
      temp.request.status_sample_id = null;
      temp.request.review_role_id = null;
      temp.request.telephone = '';
      temp.request.request_number = null;

      // 3. Create the duplicated request
      const newRequest = await this.prisma.request.create({
        data: temp.request,
      });

      // 4. Duplicate request_detail
      temp.request_detail.request_id = newRequest.id;
      temp.request_detail.created_by = user_id;
      temp.request_detail.updated_by = user_id;
      temp.request_detail.created_on = new Date();
      temp.request_detail.updated_on = new Date();
      await this.prisma.request_detail.create({
        data: temp.request_detail,
      });

      // 5. Duplicate request_sample and request_sample_item
      for (const sample of temp.request_sample) {
        sample.request_id = newRequest.id;
        sample.created_by = user_id;
        sample.updated_by = user_id;
        sample.created_on = new Date();
        sample.updated_on = new Date();
        const { request_sample_item, ...sampleData } = sample;
        const newSample = await this.prisma.request_sample.create({
          data: sampleData,
        });

        for (const item of request_sample_item ?? []) {
          item.request_sample_id = newSample.id;
          item.created_by = user_id;
          item.updated_by = user_id;
          item.created_on = new Date();
          item.updated_on = new Date();
          await this.prisma.request_sample_item.create({
            data: item,
          });
        }
      }

      // 6. Return the new duplicated request info
      // return await this.get_info({ id: newRequest.id });
      return {
        message: 'Success', //`Request with ID ${id} has been duplicated successfully.`,
        // id: newRequest.id,
      };
    }

    async cancel(@Body() payload: CancelRequestDto) {
      const { request_id, user_id, remark } = payload;

      // Find the request to cancel
      const request = await this.prisma.request.findUnique({
        where: { id: request_id },
      });

      if (!request) {
        throw new NotFoundException(`Request with ID ${request_id} not found`);
      }

      // Update the request status to 'CANCELLED'
      await this.prisma.request.update({
        where: { id: request_id },
        data: {
          status_request_id: 'CANCEL',
          status_sample_id: 'CANCEL',
          updated_by: user_id,
          updated_on: new Date(),
        },
      });

      // Create a cancellation log entry
      await this.prisma.request_log.create({
        data: {
          request_id: request_id,
          activity_request_id: 'CANCEL',
          status_request_id: 'CANCEL',
          remark: remark || '',
          user_id: user_id,
          timestamp: new Date(),
        },
      });
      return {
        message: `Request with ID ${request_id} has been cancelled successfully.`,
    }
  }
}
