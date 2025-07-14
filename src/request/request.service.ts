import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveRequestDto } from './dto/save-request.dto';
import e from 'express';
import { DuplicateRequestDto } from './dto/duplicate-request.dto';
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CancelRequestDto } from './dto/cancel-request.dto';
import path from 'path';

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

    async get_info(params: { id?: number | string }) {
      let { id } = params;
      id = id !== undefined ? +id : undefined;
      if (!id || isNaN(id)) {
        return {};
      }

      // Fetch request with all necessary relations
      const request = await this.prisma.request.findUnique({
        where: { id },
        include: {
          requester: {
            select: {
              id: true,
              fullname: true,
              email: true,
              company: true,
              dept_name: true,
            },
          },
          request_email: {
            select: {
              id: true,
              request_id: true,
              user_id: true,
              email: true,
              created_on: true,
              created_by: true,
            },
          },
          request_detail: {
            select: {
              id: true,
              request_id: true,
              test_report_format_id: true,
              accredited_id: true,
              report_heading_id: true,
              objective_id: true,
              sample_stage_id: true,
              lab_process_id: true,
              sample_retaining_id: true,
              note: true,
              lab_receiver_id: true,
              received_date: true,
              lab_note: true,
              created_on: true,
              created_by: true,
              updated_on: true,
              updated_by: true,
            },
            take: 1,
          },
          request_detail_attachment: {
            select: {
              id: true,
              request_id: true,
              filename: true,
              path: true,
              created_on: true,
              created_by: true,
            },
          },
          request_sample: {
            select: {
              id: true,
              request_id: true,
              sample_description_id: true,
              material_id: true,
              material: { select: { name: true } },
              sample_code: true,
              sample_name: true,
              line_id: true,
              sampling_date: true,
              expiry_date: true,
              batch_no: true,
              is_display_special: true,
              special_test_time: true,
              due_date: true,
              status_sample_id: true,
              note: true,
              category_edit_id: true,
              certificate_name: true,
              path: true,
              revision: true,
              is_parameter_completed: true,
              created_on: true,
              created_by: true,
              updated_on: true,
              updated_by: true,
              request_sample_chemical: {
                select: {
                  chemical_parameter: {
                    select: {
                      id: true,
                      name: true,
                      name_abb: true,
                      request_min: true,
                      unit_id: true,
                      unit: { select: { name: true } },
                      sample_type_id: true,
                      spec_type_id: true,
                      spec: true,
                      spec_min: true,
                      spec_max: true,
                      warning_min: true,
                      warning_max: true,
                      final_result: true,
                      decimal: true,
                      is_enter_spec_min: true,
                      is_enter_spec_max: true,
                      is_enter_warning_min: true,
                      is_enter_warning_max: true,
                      is_enter_decimal: true,
                    }
                  },
                  id: true,
                  request_sample_id: true,
                  chemical_parameter_id: true,
                  lab_result: true,
                  test_by: true,
                  test_date: true,
                  created_on: true,
                  created_by: true,
                },
              },
              request_sample_microbiology: {
                select: {
                  microbiology_parameter: {
                    select: {
                      id: true,
                      name: true,
                      name_abb: true,
                      request_min: true,
                      unit_id: true,
                      unit: { select: { name: true } },
                      sample_type_id: true,
                      spec_type_id: true,
                      spec: true,
                      spec_min: true,
                      spec_max: true,
                      warning_min: true,
                      warning_max: true,
                      final_result: true,
                      decimal: true,
                      is_enter_spec_min: true,
                      is_enter_spec_max: true,
                      is_enter_warning_min: true,
                      is_enter_warning_max: true,
                      is_enter_decimal: true,
                    }
                  },
                  id: true,
                  request_sample_id: true,
                  microbiology_parameter_id: true,
                  lab_result: true,
                  test_by: true,
                  test_date: true,
                  created_on: true,
                  created_by: true,
                },
              },
              request_sample_item: {
                select: {
                  id: true,
                  request_sample_id: true,
                  seq: true,
                  quantity: true,
                  unit_id: true,
                  time: true,
                  sample_condition_id: true,
                  lab_test_id: true,
                  remark: true,
                  remark_lab: true,
                  created_on: true,
                  created_by: true,
                  updated_on: true,
                  updated_by: true,
                },
              },
            },
          },
          request_log: {
            select: {
              id: true,
              request_id: true,
              sample_code: true,
              status_request_id: true,
              status_request: {
                select: {
                  name: true,
                  state: { select: { id: true, order: true, name: true } },
                },
              },
              activity_request_id: true,
              activity_request: { select: { name: true } },
              user_id: true,
              user: { select: { fullname: true } },
              timestamp: true,
              remark: true,
            },
          },
        },
      });

      if (!request) return {};

      // Map requester info
      const requester = request.requester;
      // Map request_detail (take first if array)
      const request_detail = Array.isArray(request.request_detail)
        ? (request.request_detail[0] ?? null)
        : request.request_detail;

      // Build the response
      return {
        request: {
          id: request.id ?? 0,
          request_number: request.request_number ?? "",
          lab_site_id: request.lab_site_id ?? "",
          request_type_id: request.request_type_id ?? "",
          requester_id: request.requester_id ?? 0,
          requester_name: requester?.fullname ?? "",
          requester_email: requester?.email ?? "",
          company_name: requester?.company ?? "",
          dept_name: requester?.dept_name ?? "",
          request_date: request.request_date ?? "",
          due_date: request.due_date ?? "",
          telephone: request.telephone ?? "",
          status_request_id: request.status_request_id ?? "",
          status_sample_id: request.status_sample_id ?? "",
          review_role_id: request.review_role_id ?? "",
          original_id: request.original_id ?? 0,
          created_on: request.created_on ?? "",
          created_by: request.created_by ?? 0,
          updated_on: request.updated_on ?? "",
          updated_by: request.updated_by ?? 0,
        },
        request_email: (request.request_email ?? []).map(email => ({
          id: email.id ?? 0,
          request_id: email.request_id ?? 0,
          user_id: email.user_id ?? 0,
          email: email.email ?? "",
          created_on: email.created_on ?? "",
          created_by: email.created_by ?? 0,
        })),
        request_detail: {
          id: request_detail?.id ?? 0,
          request_id: request_detail?.request_id ?? 0,
          test_report_format_id: request_detail?.test_report_format_id ?? "",
          accredited_id: request_detail?.accredited_id ?? 0,
          report_heading_id: request_detail?.report_heading_id ?? 0,
          objective_id: request_detail?.objective_id ?? 0,
          sample_stage_id: request_detail?.sample_stage_id ?? 0,
          lab_process_id: request_detail?.lab_process_id ?? 0,
          sample_retaining_id: request_detail?.sample_retaining_id ?? 0,
          note: request_detail?.note ?? "",
          lab_receiver_id: request_detail?.lab_receiver_id ?? 0,
          received_date: request_detail?.received_date ?? "",
          lab_note: request_detail?.lab_note ?? "",
          created_on: request_detail?.created_on ?? "",
          created_by: request_detail?.created_by ?? 0,
          updated_on: request_detail?.updated_on ?? "",
          updated_by: request_detail?.updated_by ?? 0,
        },
        request_detail_attachment: (request.request_detail_attachment ?? []).map(attachment => ({
          id: attachment.id ?? 0,
          request_id: attachment.request_id ?? 0,
          filename: attachment.filename ?? "",
          path: attachment.path ?? "",
          created_on: attachment.created_on ?? "",
          created_by: attachment.created_by ?? 0,
        })),
        request_sample: (request.request_sample ?? []).map(sample => ({
          id: sample.id ?? 0,
          request_id: sample.request_id ?? 0,
          sample_description_id: sample.sample_description_id ?? "",
          material_id: sample.material_id ?? "",
          material_name: sample.material?.name ?? "",
          sample_code: sample.sample_code ?? "",
          sample_name: sample.sample_name ?? "",
          line_id: sample.line_id ?? 0,
          sampling_date: sample.sampling_date ?? "",
          expiry_date: sample.expiry_date ?? "",
          batch_no: sample.batch_no ?? "",
          is_display_special: sample.is_display_special ?? false,
          special_test_time: sample.special_test_time ?? "",
          due_date: sample.due_date ?? "",
          status_sample_id: sample.status_sample_id ?? "",
          note: sample.note ?? "",
          category_edit_id: sample.category_edit_id ?? 0,
          certificate_name: sample.certificate_name ?? "",
          path: sample.path ?? "",
          revision: sample.revision ?? 0,
          is_parameter_completed: sample.is_parameter_completed ?? false,
          created_on: sample.created_on ?? "",
          created_by: sample.created_by ?? 0,
          updated_on: sample.updated_on ?? "",
          updated_by: sample.updated_by ?? 0,
          request_sample_chemical: (sample.request_sample_chemical ?? []).map(sample_chemical => ({
            parameter_id: sample_chemical.chemical_parameter?.id ?? 0,
            name: sample_chemical.chemical_parameter?.name ?? "",
            request_min: sample_chemical.chemical_parameter?.request_min ?? 0,
            unit_id: sample_chemical.chemical_parameter?.unit_id ?? 0,
            unit_name: sample_chemical.chemical_parameter?.unit?.name ?? "",
            sample_type_id: sample_chemical.chemical_parameter?.sample_type_id ?? "",
            spec_type_id: sample_chemical.chemical_parameter?.spec_type_id ?? "",
            spec: sample_chemical.chemical_parameter?.spec ?? "",
            spec_min: sample_chemical.chemical_parameter?.spec_min ?? 0,
            spec_max: sample_chemical.chemical_parameter?.spec_max ?? 0,
            warning_min: sample_chemical.chemical_parameter?.warning_min ?? 0,
            warning_max: sample_chemical.chemical_parameter?.warning_max ?? 0,
            final_result: sample_chemical.chemical_parameter?.final_result ?? "",
            decimal: sample_chemical.chemical_parameter?.decimal ?? 0,
            is_enter_spec_min: sample_chemical.chemical_parameter?.is_enter_spec_min ?? false,
            is_enter_spec_max: sample_chemical.chemical_parameter?.is_enter_spec_max ?? false,
            is_enter_warning_min: sample_chemical.chemical_parameter?.is_enter_warning_min ?? false,
            is_enter_warning_max: sample_chemical.chemical_parameter?.is_enter_warning_max ?? false,
            is_enter_decimal: sample_chemical.chemical_parameter?.is_enter_decimal ?? false,
            // Include the sample_chemical fields
            id: sample_chemical.id ?? 0,
            request_sample_id: sample_chemical.request_sample_id ?? 0,
            chemical_parameter_id: sample_chemical.chemical_parameter_id ?? 0,
            lab_result: sample_chemical.lab_result ?? "",
            test_by: sample_chemical.test_by ?? 0,
            test_date: sample_chemical.test_date ?? "",
            created_on: sample_chemical.created_on ?? "",
            created_by: sample_chemical.created_by ?? 0,
          })),
          request_sample_microbiology: (sample.request_sample_microbiology ?? []).map(sample_microbiology => ({
            parameter_id: sample_microbiology.microbiology_parameter?.id ?? 0,
            name: sample_microbiology.microbiology_parameter?.name ?? "",
            request_min: sample_microbiology.microbiology_parameter?.request_min ?? 0,
            unit_id: sample_microbiology.microbiology_parameter?.unit_id ?? 0,
            unit_name: sample_microbiology.microbiology_parameter?.unit?.name ?? "",
            sample_type_id: sample_microbiology.microbiology_parameter?.sample_type_id ?? "",
            spec_type_id: sample_microbiology.microbiology_parameter?.spec_type_id ?? "",
            spec: sample_microbiology.microbiology_parameter?.spec ?? "",
            spec_min: sample_microbiology.microbiology_parameter?.spec_min ?? 0,
            spec_max: sample_microbiology.microbiology_parameter?.spec_max ?? 0,
            warning_min: sample_microbiology.microbiology_parameter?.warning_min ?? 0,
            warning_max: sample_microbiology.microbiology_parameter?.warning_max ?? 0,
            final_result: sample_microbiology.microbiology_parameter?.final_result ?? "",
            decimal: sample_microbiology.microbiology_parameter?.decimal ?? 0,
            is_enter_spec_min: sample_microbiology.microbiology_parameter?.is_enter_spec_min ?? false,
            is_enter_spec_max: sample_microbiology.microbiology_parameter?.is_enter_spec_max ?? false,
            is_enter_warning_min: sample_microbiology.microbiology_parameter?.is_enter_warning_min ?? false,
            is_enter_warning_max: sample_microbiology.microbiology_parameter?.is_enter_warning_max ?? false,
            is_enter_decimal: sample_microbiology.microbiology_parameter?.is_enter_decimal ?? false,
            // Include the sample_microbiology fields
            id: sample_microbiology.id ?? 0,
            request_sample_id: sample_microbiology.request_sample_id ?? 0,
            microbiology_parameter_id: sample_microbiology.microbiology_parameter_id ?? 0,
            lab_result: sample_microbiology.lab_result ?? "",
            test_by: sample_microbiology.test_by ?? 0,
            test_date: sample_microbiology.test_date ?? "",
            created_on: sample_microbiology.created_on ?? "",
            created_by: sample_microbiology.created_by ?? 0,
          })),
          request_sample_item: (sample.request_sample_item ?? []).map(item => ({
            id: item.id ?? 0,
            request_sample_id: item.request_sample_id ?? 0,
            seq: item.seq ?? 0,
            quantity: item.quantity ?? 0,
            unit_id: item.unit_id ?? 0,
            time: item.time ?? "",
            sample_condition_id: item.sample_condition_id ?? 0,
            lab_test_id: item.lab_test_id ?? 0,
            remark: item.remark ?? "",
            remark_lab: item.remark_lab ?? "",
            created_on: item.created_on ?? "",
            created_by: item.created_by ?? 0,
            updated_on: item.updated_on ?? "",
            updated_by: item.updated_by ?? 0,
          })),
        })),
        request_log: (request.request_log ?? []).map(log => ({
          id: log.id ?? 0,
          request_id: log.request_id ?? "",
          sample_code: log.sample_code ?? "",
          status_request_id: log.status_request_id ?? "",
          state_id: log.status_request?.state?.id ?? "",
          state_order: log.status_request?.state?.order,
          state_name: log.status_request?.state?.name ?? "",
          status_request_name: log.status_request?.name ?? "",
          activity_request_id: log.activity_request_id ?? "",
          activity_request_name: log.activity_request?.name ?? "",
          user_id: log.user_id ?? 0,
          user_name: log.user?.fullname ?? "",
          timestamp: log.timestamp ?? "",
          remark: log.remark ?? "",
        })),
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

        console.log("Request: ", request);

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
            request_number: request.request_number ?? "",
            request_date: request.request_date,
            due_date: request.due_date,
            telephone: request.telephone,
            created_on: request.created_on ?? now,
            created_by: request.created_by,
            updated_on: request.updated_on ?? now,
            updated_by: request.updated_by,
            // Connect relations
            original_request: request.original_id ? { connect: { id: request.original_id } } : undefined,
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
            request_number: request.request_number ?? "",
            request_date: request.request_date,
            due_date: request.due_date,
            telephone: request.telephone,
            created_on: request.created_on ?? now,
            created_by: request.created_by,
            updated_on: request.updated_on ?? now,
            updated_by: request.updated_by,
            // Connect relations
            original_request: request.original_id ? { connect: { id: request.original_id } } : undefined,
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
        
        // Before deleting request_sample, delete all nested records for each sample
        const samplesToDelete = await tx.request_sample.findMany({
          where: { request_id: requestId },
        });
        for (const sample of samplesToDelete) {
          await tx.request_sample_chemical.deleteMany({ where: { request_sample_id: sample.id } });
          await tx.request_sample_microbiology.deleteMany({ where: { request_sample_id: sample.id } });
          await tx.request_sample_item.deleteMany({ where: { request_sample_id: sample.id } });
        }
        await tx.request_sample.deleteMany({ where: { request_id: requestId } });
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
          activity_request_id: 'DELETE',
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
