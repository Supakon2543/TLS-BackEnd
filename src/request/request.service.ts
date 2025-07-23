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
import { ListRequestDto } from './dto/list-request.dto';
import { sendMail, testEmail } from '../email/email';
import { stat } from 'fs';
import { time } from 'console';
import { request } from 'http';

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
    clearZeroIdsAndDatesAndBy(obj: any) {
      if (Array.isArray(obj)) {
        obj.forEach((item) => this.clearZeroIdsAndDatesAndBy(item));
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
            (key.endsWith('_date') || key.endsWith('_on') /*|| key.endsWith('_time')*/) &&
            obj[key] === ""
          ) {
            obj[key] = null;
          }
          // Ensure all date fields are Date objects if not null
          if (
            (key.endsWith('_date') || key.endsWith('_on') /*|| key.endsWith('_time')*/) &&
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
        Object.values(obj).forEach((item) => this.clearZeroIdsAndDatesAndBy(item));
      }
    }
    
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
                  // chemical_parameter: {
                  //   select: {
                  //     id: true,
                  //     name: true,
                  //     name_abb: true,
                  //     request_min: true,
                  //     unit_id: true,
                  //     unit: { select: { name: true } },
                  //     sample_type_id: true,
                  //     spec_type_id: true,
                  //     spec: true,
                  //     spec_min: true,
                  //     spec_max: true,
                  //     warning_min: true,
                  //     warning_max: true,
                  //     final_result: true,
                  //     decimal: true,
                  //     is_enter_spec_min: true,
                  //     is_enter_spec_max: true,
                  //     is_enter_warning_min: true,
                  //     is_enter_warning_max: true,
                  //     is_enter_decimal: true,
                  //     method: true,
                  //   }
                  // },
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
                  // microbiology_parameter: {
                  //   select: {
                  //     id: true,
                  //     name: true,
                  //     name_abb: true,
                  //     request_min: true,
                  //     unit_id: true,
                  //     unit: { select: { name: true } },
                  //     sample_type_id: true,
                  //     spec_type_id: true,
                  //     spec: true,
                  //     spec_min: true,
                  //     spec_max: true,
                  //     warning_min: true,
                  //     warning_max: true,
                  //     final_result: true,
                  //     decimal: true,
                  //     is_enter_spec_min: true,
                  //     is_enter_spec_max: true,
                  //     is_enter_warning_min: true,
                  //     is_enter_warning_max: true,
                  //     is_enter_decimal: true,
                  //     method: true,
                  //   }
                  // },
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
                orderBy: { seq: 'asc' },
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
            orderBy: { timestamp: 'desc' },
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

      // console.log("Request Sample Chemical:", request.request_sample.map(sample => sample.request_sample_chemical.length));
      // if (request.id !== 0) {
      //   // Always fetch all chemical parameters
      //   // console.log("test");
      //   const allChemicalParameters = await this.prisma.chemical_parameter.findMany({
      //     include: {
      //       unit: true,
      //     },
      //   });
      //   const allMicrobiologyParameters = await this.prisma.microbiology_parameter.findMany({
      //     include: {
      //       unit: true,
      //     },
      //   });

      //   if (request.request_sample && Array.isArray(request.request_sample)) {
      //     request.request_sample.forEach(sample => {
      //     // Build a map of existing sample_chemical by chemical_parameter_id for quick lookup
      //     const existingChemicals = {};
      //     const existingMicrobiologies = {};
      //     (sample.request_sample_chemical ?? []).forEach(sc => {
      //       if (sc.chemical_parameter_id != null) {
      //         existingChemicals[sc.chemical_parameter_id] = sc;
      //       }
      //     });
      //     (sample.request_sample_microbiology ?? []).forEach(sm => {
      //       if (sm.microbiology_parameter_id != null) {
      //         existingMicrobiologies[sm.microbiology_parameter_id] = sm;
      //       }
      //     });

      //     // Always build the full array for all parameters
      //     sample.request_sample_chemical = allChemicalParameters.map(param => {
      //       const sc = existingChemicals[param.id] || {};
      //       return {
      //         // Sample-chemical fields (empty/default if not present)
      //         id: sc.id ?? 0,
      //         created_on: sc.created_on ?? null,
      //         created_by: sc.created_by ?? null,
      //         request_sample_id: (sc.id ?? 0) === 0 ? 0 : sample.id || 0,
      //         chemical_parameter_id: param.id ?? null,
      //         lab_result: sc.lab_result ?? "",
      //         test_by: sc.test_by ?? null,
      //         test_date: sc.test_date ?? null,
      //         // Add the required chemical_parameter property
      //         chemical_parameter: {
      //           id: param.id ?? 0,
      //           name: param.name ?? "",
      //           name_abb: param.name_abb ?? "",
      //           request_min: param.request_min ?? null,
      //           unit_id: param.unit_id ?? null,
      //           unit: param.unit ? { name: param.unit.name ?? "" } : null,
      //           sample_type_id: param.sample_type_id ?? null,
      //           spec_type_id: param.spec_type_id ?? null,
      //           spec: param.spec ?? "",
      //           spec_min: param.spec_min ?? null,
      //           spec_max: param.spec_max ?? null,
      //           warning_min: param.warning_min ?? null,
      //           warning_max: param.warning_max ?? null,
      //           final_result: param.final_result ?? "",
      //           decimal: param.decimal ?? null,
      //           is_enter_spec_min: !!param.is_enter_spec_min,
      //           is_enter_spec_max: !!param.is_enter_spec_max,
      //           is_enter_warning_min: !!param.is_enter_warning_min,
      //           is_enter_warning_max: !!param.is_enter_warning_max,
      //           is_enter_decimal: !!param.is_enter_decimal,
      //           method: param.method ?? "", // Include method if available
      //         }
      //       };
      //     });
      //     sample.request_sample_microbiology = allMicrobiologyParameters.map(param => {
      //       const sm = existingMicrobiologies[param.id] || {};
      //       return {
      //         // Sample-microbiology fields (empty/default if not present)
      //         id: sm.id ?? 0,
      //         created_on: sm.created_on ?? null,
      //         created_by: sm.created_by ?? null,
      //         request_sample_id: (sm.id ?? 0) === 0 ? 0 : sample.id || 0,
      //         microbiology_parameter_id: param.id ?? null,
      //         lab_result: sm.lab_result ?? "",
      //         test_by: sm.test_by ?? null,
      //         test_date: sm.test_date ?? null,
      //         // Add the required microbiology_parameter property
      //         microbiology_parameter: {
      //           id: param.id ?? 0,
      //           name: param.name ?? "",
      //           name_abb: param.name_abb ?? "",
      //           request_min: param.request_min ?? null,
      //           unit_id: param.unit_id ?? null,
      //           unit: param.unit ? { name: param.unit.name ?? "" } : null,
      //           sample_type_id: param.sample_type_id ?? null,
      //           spec_type_id: param.spec_type_id ?? null,
      //           spec: param.spec ?? "",
      //           spec_min: param.spec_min ?? null,
      //           spec_max: param.spec_max ?? null,
      //           warning_min: param.warning_min ?? null,
      //           warning_max: param.warning_max ?? null,
      //           final_result: param.final_result ?? "",
      //           decimal: param.decimal ?? null,
      //           is_enter_spec_min: !!param.is_enter_spec_min,
      //           is_enter_spec_max: !!param.is_enter_spec_max,
      //           is_enter_warning_min: !!param.is_enter_warning_min,
      //           is_enter_warning_max: !!param.is_enter_warning_max,
      //           is_enter_decimal: !!param.is_enter_decimal,
      //           method: param.method ?? "", // Include method if available
      //         }
      //       };
      //     });
      //   });
      //   }
      // }
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
            // parameter_id: sample_chemical.chemical_parameter?.id ?? 0,
            // name: sample_chemical.chemical_parameter?.name ?? "",
            // request_min: sample_chemical.chemical_parameter?.request_min ?? 0,
            // unit_id: sample_chemical.chemical_parameter?.unit_id ?? 0,
            // unit_name: sample_chemical.chemical_parameter?.unit?.name ?? "",
            // sample_type_id: sample_chemical.chemical_parameter?.sample_type_id ?? "",
            // spec_type_id: sample_chemical.chemical_parameter?.spec_type_id ?? "",
            // spec: sample_chemical.chemical_parameter?.spec ?? "",
            // spec_min: sample_chemical.chemical_parameter?.spec_min ?? 0,
            // spec_max: sample_chemical.chemical_parameter?.spec_max ?? 0,
            // warning_min: sample_chemical.chemical_parameter?.warning_min ?? 0,
            // warning_max: sample_chemical.chemical_parameter?.warning_max ?? 0,
            // final_result: sample_chemical.chemical_parameter?.final_result ?? "",
            // decimal: sample_chemical.chemical_parameter?.decimal ?? 0,
            // is_enter_spec_min: sample_chemical.chemical_parameter?.is_enter_spec_min ?? false,
            // is_enter_spec_max: sample_chemical.chemical_parameter?.is_enter_spec_max ?? false,
            // is_enter_warning_min: sample_chemical.chemical_parameter?.is_enter_warning_min ?? false,
            // is_enter_warning_max: sample_chemical.chemical_parameter?.is_enter_warning_max ?? false,
            // is_enter_decimal: sample_chemical.chemical_parameter?.is_enter_decimal ?? false,
            // method: sample_chemical.chemical_parameter?.method ?? "",
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
            // parameter_id: sample_microbiology.microbiology_parameter?.id ?? 0,
            // name: sample_microbiology.microbiology_parameter?.name ?? "",
            // request_min: sample_microbiology.microbiology_parameter?.request_min ?? 0,
            // unit_id: sample_microbiology.microbiology_parameter?.unit_id ?? 0,
            // unit_name: sample_microbiology.microbiology_parameter?.unit?.name ?? "",
            // sample_type_id: sample_microbiology.microbiology_parameter?.sample_type_id ?? "",
            // spec_type_id: sample_microbiology.microbiology_parameter?.spec_type_id ?? "",
            // spec: sample_microbiology.microbiology_parameter?.spec ?? "",
            // spec_min: sample_microbiology.microbiology_parameter?.spec_min ?? 0,
            // spec_max: sample_microbiology.microbiology_parameter?.spec_max ?? 0,
            // warning_min: sample_microbiology.microbiology_parameter?.warning_min ?? 0,
            // warning_max: sample_microbiology.microbiology_parameter?.warning_max ?? 0,
            // final_result: sample_microbiology.microbiology_parameter?.final_result ?? "",
            // decimal: sample_microbiology.microbiology_parameter?.decimal ?? 0,
            // is_enter_spec_min: sample_microbiology.microbiology_parameter?.is_enter_spec_min ?? false,
            // is_enter_spec_max: sample_microbiology.microbiology_parameter?.is_enter_spec_max ?? false,
            // is_enter_warning_min: sample_microbiology.microbiology_parameter?.is_enter_warning_min ?? false,
            // is_enter_warning_max: sample_microbiology.microbiology_parameter?.is_enter_warning_max ?? false,
            // is_enter_decimal: sample_microbiology.microbiology_parameter?.is_enter_decimal ?? false,
            // method: sample_microbiology.microbiology_parameter?.method ?? "",
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
            sample_condition_id: item.sample_condition_id ?? "",
            lab_test_id: item.lab_test_id ?? "",
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
        
        console.log("Payload before clearing:", payload);
        console.log("request_sample_item:", payload.request_sample?.[0]?.request_sample_item);
        this.clearZeroIdsAndDatesAndBy(payload);
        console.log("Payload after clearing:", payload);
        console.log("request_sample_item after clearing:", payload.request_sample?.[0]?.request_sample_item);

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
          // request_log.user_id = payload.user_id || null; // Ensure user_id is set from payload
        }

        // ...rest of your save logic remains unchanged...
        if (request_log.activity_request_id === "DRAFT" && (request.status_request_id === "" || request.status_request_id === null || request.status_request_id === "DRAFT")) {
          request.status_request_id = "DRAFT";
          request_log.status_request_id = "DRAFT";
        }
        // else if (request_log.activity_request_id === "DRAFT" && request.status_request_id !== "DRAFT" && request.status_request_id !== "") {
        //   request.status_request_id = request.status_request_id;
        // }
        else if (request_log.activity_request_id === "SEND" && request.request_number === "") {
          request.status_request_id = "REVIEW";
          request.review_role_id = "REQ_HEAD";
          request_log.status_request_id = "REVIEW";
          if (request.request_type_id === "REQUEST") {
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
          else if (request.request_type_id === "ROUTINE") {
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
          else if (request.request_type_id === "QIP") {
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
        console.log('Upserted request with ID:', requestId);
  
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
          ? { ...request_log, request_id: requestId, user_id: payload.user_id, timestamp: now, status_request_id: request.status_request_id }
          : undefined;
        // 1. Fetch all request_email for the request
        const emailsInDb = await tx.request_email.findMany({
          where: { request_id: requestId }
        });

        // 2. Prepare a set of email IDs from the payload
        const emailIdsInPayload = new Set(emails.filter(e => e.id).map(e => e.id));

        // 3. Delete emails in DB that are not in the payload
        for (const dbEmail of emailsInDb) {
          if (!emailIdsInPayload.has(dbEmail.id)) {
            await tx.request_email.delete({ where: { id: dbEmail.id } });
          }
        }

        // 4. Upsert or create/update emails
        for (const email of emails) {
          const { id, ...emailData } = email;
          if (email.id) {
            await tx.request_email.upsert({
              where: { id: email.id ?? -1 },
              update: {
                ...email,
                request_id: requestId,
              },
              create: {
                ...emailData,
                request_id: requestId,
                created_on: email.created_on ?? now,
                created_by: email.created_by,
              },
            });
          } else {
            await tx.request_email.create({
              data: {
                ...emailData,
                request_id: requestId,
                created_on: email.created_on ?? now,
                created_by: email.created_by,
              },
            });
          }
        }
        // 3. Upsert or replace nested entities
        await tx.request_detail.upsert({
          where: { id: detail.id ?? -1 },
          update: {
            ...detail,
            request_id: requestId,
            updated_on: now,
            updated_by: detail?.updated_by,
          },
          create: {
            ...detail,
            request_id: requestId,
            created_on: detail?.created_on ?? now,
            created_by: detail?.created_by,
            updated_on: now,
            updated_by: detail?.updated_by,
          },
        });
        let s3Path = `tls/${process.env.ENVNAME}/request/${requestId}/attachment/${attachments.filename}`;
        let filename = attachments.filename;

        // 1. Fetch all attachments for the request
        const attachmentsInDb = await this.prisma.request_detail_attachment.findMany({
          where: { request_id: requestId }
        });

        // 2. Prepare a map for quick lookup
        const payloadAttachmentIds = new Set((attachments ?? []).map(a => a.id).filter(id => id));

        // 3. Delete attachments in DB that are not in the payload
        for (const dbAttachment of attachmentsInDb) {
          if (!payloadAttachmentIds.has(dbAttachment.id)) {
            // Remove from S3 if path exists
            if (dbAttachment.path && typeof dbAttachment.path === 'string' && dbAttachment.path.trim() !== '') {
              const s3Key = dbAttachment.path.startsWith('/') ? dbAttachment.path.slice(1) : dbAttachment.path;
              try {
                await this.s3.send(
                  new (await import('@aws-sdk/client-s3')).DeleteObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET!,
                    Key: s3Key,
                  }),
                );
              } catch (err) {
                console.warn('Failed to delete S3 file:', s3Key, err?.message || err);
              }
            }
            // Remove from DB
            await tx.request_detail_attachment.delete({ where: { id: dbAttachment.id } });
          }
        }

        // 4. Upsert or create/update attachments
        for (const attachment of attachments) {
          if (attachment.base64 && attachment.base64 !== '') {
            // Upload to S3
            let buffer: Buffer;
            let mimeType = 'application/octet-stream';
            let filename = attachment.filename || `file_${Date.now()}`;
            let s3Key = `tls/${process.env.ENVNAME}/request/${requestId}/attachment/${filename}`;

            if (attachment.base64.startsWith('data:')) {
              const matches = attachment.base64.match(/^data:(.+);base64,(.+)$/);
              if (!matches) throw new Error('Invalid base64 format');
              mimeType = matches[1];
              buffer = Buffer.from(matches[2], 'base64');
            } else {
              buffer = Buffer.from(attachment.base64, 'base64');
              if (filename.endsWith('.pdf')) mimeType = 'application/pdf';
              else if (filename.endsWith('.png')) mimeType = 'image/png';
              else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) mimeType = 'image/jpeg';
              else if (filename.endsWith('.txt')) mimeType = 'text/plain';
              else if (filename.endsWith('.docx')) mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
              else if (filename.endsWith('.xlsx')) mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            }

            await this.s3.send(
              new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET!,
                Key: s3Key,
                Body: buffer,
                ContentType: mimeType,
              }),
            );
            attachment.path = `/${s3Key}`;
            delete attachment.base64;

            // Upsert (create or update) in DB
            if (attachment.id) {
              await tx.request_detail_attachment.update({
                where: { id: attachment.id },
                data: { ...attachment, path: `/${s3Key}` },
              });
            } else {
              await tx.request_detail_attachment.create({
                data: attachment,
              });
            }
          } else if (attachment.id) {
            // base64 is empty, but attachment exists in DB: update other fields, don't upload
            const { base64, ...rest } = attachment;
            await tx.request_detail_attachment.update({
              where: { id: attachment.id },
              data: rest,
            });
          } else {
            // New attachment with no base64: skip (or handle as needed)
          }
        }

        // ...existing code...
        console.log('samples:', samples);

        // 2. Prepare a set of sample IDs from the payload
        const sampleIdsInPayload = new Set(samples.filter(s => s.id).map(s => s.id));

        // 3. Get all existing samples in DB for this request
        const samplesInDb = await tx.request_sample.findMany({
          where: { request_id: requestId },
        });

        // 4. Delete samples (and their children) not in the payload
        for (const dbSample of samplesInDb) {
          if (!sampleIdsInPayload.has(dbSample.id)) {
            // Delete children first to avoid FK constraint errors
            await tx.request_sample_item.deleteMany({ where: { request_sample_id: dbSample.id } });
            await tx.request_sample_chemical.deleteMany({ where: { request_sample_id: dbSample.id } });
            await tx.request_sample_microbiology.deleteMany({ where: { request_sample_id: dbSample.id } });
            await tx.request_sample.delete({ where: { id: dbSample.id } });
          }
        }

        // 5. Upsert samples and their children
        for (const sample of samples) {
          const { request_sample_item, request_sample_chemical, request_sample_microbiology, ...sampleData } = sample;

          // Upsert sample
          const createdSample = await tx.request_sample.upsert({
            where: { id: sample.id ?? -1 },
            update: {
              ...sampleData,
              request_id: requestId,
              updated_on: now,
              updated_by: sample.updated_by,
            },
            create: {
              ...sampleData,
              request_id: requestId,
              created_on: sample.created_on ?? now,
              created_by: sample.created_by,
              updated_on: now,
              updated_by: sample.updated_by,
            },
          });

          const sampleId = createdSample.id;

          // --- Upsert and delete for request_sample_item ---
          const items = (request_sample_item ?? []).map(i => ({
            ...i,
            request_sample_id: sampleId,
          }));
          const itemsInDb = await tx.request_sample_item.findMany({
            where: { request_sample_id: sampleId },
          });
          const itemIdsInPayload = new Set(items.filter(i => i.id).map(i => i.id));
          for (const dbItem of itemsInDb) {
            if (!itemIdsInPayload.has(dbItem.id)) {
              await tx.request_sample_item.delete({ where: { id: dbItem.id } });
            }
          }
          for (const item of items) {
            const { id, ...itemData } = item;
            if (item.id) {
              await tx.request_sample_item.upsert({
                where: { id: item.id ?? -1 },
                update: {
                  ...item,
                  request_sample_id: sampleId,
                  updated_on: now,
                  updated_by: item.updated_by,
                },
                create: {
                  ...itemData,
                  request_sample_id: sampleId,
                  created_on: item.created_on ?? now,
                  created_by: item.created_by,
                  updated_on: now,
                  updated_by: item.updated_by,
                },
              });
            }  else {
              await tx.request_sample_item.create({
                data: {
                  ...itemData,
                  request_sample_id: sampleId,
                  created_on: item.created_on ?? now,
                  created_by: item.created_by,
                  updated_on: now,
                  updated_by: item.updated_by,
                },
              });
            }
          }

          // --- Upsert and delete for request_sample_chemical ---
          const chemicals = (request_sample_chemical ?? []).map(c => ({
            ...c,
            request_id: undefined,
            request_sample_id: sampleId,
          }));
          const chemicalsInDb = await tx.request_sample_chemical.findMany({
            where: { request_sample_id: sampleId },
          });
          const chemicalIdsInPayload = new Set(chemicals.filter(c => c.id).map(c => c.id));
          for (const dbChemical of chemicalsInDb) {
            if (!chemicalIdsInPayload.has(dbChemical.id)) {
              await tx.request_sample_chemical.delete({ where: { id: dbChemical.id } });
            }
          }
          for (const chemical of chemicals) {
            const { id, ...chemicalData } = chemical;
            if (chemical.id) {
              await tx.request_sample_chemical.upsert({
                where: { id: chemical.id ?? -1 },
                update: {
                  ...chemical,
                  request_sample_id: sampleId,
                },
                create: {
                  ...chemicalData,
                  request_sample_id: sampleId,
                  created_on: chemical.created_on ?? now,
                  created_by: chemical.created_by,
                },
              });
            } else {
              await tx.request_sample_chemical.create({
                data: {
                  ...chemicalData,
                  request_sample_id: sampleId,
                  created_on: chemical.created_on ?? now,
                  created_by: chemical.created_by,
                },
              });
            }
          }

          // --- Upsert and delete for request_sample_microbiology ---
          const micro = (request_sample_microbiology ?? []).map(m => ({
            ...m,
            request_id: undefined,
            request_sample_id: sampleId,
          }));
          const microInDb = await tx.request_sample_microbiology.findMany({
            where: { request_sample_id: sampleId },
          });
          const microIdsInPayload = new Set(micro.filter(m => m.id).map(m => m.id));
          for (const dbMicro of microInDb) {
            if (!microIdsInPayload.has(dbMicro.id)) {
              await tx.request_sample_microbiology.delete({ where: { id: dbMicro.id } });
            }
          }
          for (const m of micro) {
            const { id, ...microData } = m;
            if (m.id) {
              await tx.request_sample_microbiology.upsert({
                where: { id: m.id ?? -1 },
                update: {
                  ...m,
                  request_sample_id: sampleId,
                },
                create: {
                  ...microData,
                  request_sample_id: sampleId,
                  created_on: m.created_on ?? now,
                  created_by: m.created_by,
                },
              });
            } else {
              await tx.request_sample_microbiology.create({
                data: {
                  ...microData,
                  request_sample_id: sampleId,
                  created_on: m.created_on ?? now,
                  created_by: m.created_by,
                },
              });
            }
          }
        }
        // record.request = { connect: { id: requestId } };
        record.user_id = request_log.user_id;
        console.log('record:', record);
        if (record) {
          await tx.request_log.create({ data: record });
        }
        const requester = await tx.user.findUnique({
          where: { id: request.requester_id },
          // include: {
          //   supervisor: { select: { fullname: true, email: true } },
          // }
        });
        console.log('requester:', requester);
        const supervisor = await tx.user.findUnique({
          where: { id: requester?.supervisor_id ?? 0 },
          select: { fullname: true, email: true },
        });
        console.log('supervisor:', supervisor);

        if (request_log.activity_request_id === "SEND") {
          await sendMail(
            supervisor?.email ?? '',
            supervisor?.fullname ?? '',
            'ขออนุมัติใบส่งตัวอย่าง',
            request_log.activity_request_id,
            `${process.env.FRONTEND_URL}/request/${requestId}/detail`,
          );
        }
        return requestId;
        
        
      });
      console.log('request_id:', request_id);
      // console.log('get_info:', await this.get_info({ id: request_id }));
      // 4. Return the full request info
      // return await this.get_info({ id: request_id });
      return {
        message: 'Success', //`Request with ID ${request_id} saved successfully.`,
        id: request_id,
      };
    }

    async accept(@Body() payload: any) {
      // Log function call time
      const callTime = new Date();
      console.log('=== ACCEPT FUNCTION CALLED ===');
      console.log('UTC Time:', callTime.toISOString());
      console.log('Thailand Time:', callTime.toLocaleString('th-TH', { 
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      console.log('Timestamp:', callTime.getTime());
      
      // Check if time is within 00:00 - 15:00 range
      const thailandTime = new Date(callTime.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }));
      const currentHour = thailandTime.getHours();
      const isWithinRange = currentHour >= 0 && currentHour <= 15;
      
      // More precise time range check (e.g., 00:00:00 - 15:00:00)
      const timeString = thailandTime.toTimeString().slice(0, 8); // HH:MM:SS format
      const isWithinPreciseRange = timeString >= '00:00:00' && timeString <= '15:00:00';

      console.log('Current Hour (Thailand):', currentHour);
      console.log('Is within 00:00-15:00 range:', isWithinRange);
      console.log('=====================================');

      const { request_id, request_sample, activity_request_id, review_role_id, user_id, remark } = payload;
      this.clearZeroIdsAndDatesAndBy(request_sample);
      const request = await this.prisma.request.findUnique({
        where: { id: request_id },
        include: {
          lab_site: true,
          requester: true,
        },
      });
      console.log('activity_request_id:', activity_request_id);
      let status_id = '';
      let status_sample_id = request?.status_sample_id ?? '';
      let new_review_role_id = review_role_id;
      if (activity_request_id === 'RETURN') {
        status_id = 'REJECTED';
      } else if (activity_request_id === 'CONFIRM') {
        status_id = 'REVIEW';
      } else if (activity_request_id === 'REJECT') {
        status_id = 'CANCEL';
        status_sample_id = 'CANCEL';
      } else if (activity_request_id === 'ACCEPT') {
        status_id = 'TESTING';
        status_sample_id = 'TESTING';
      }
      if (activity_request_id === 'CONFIRM' || activity_request_id === 'ACCEPT') {
        if (review_role_id === 'REQ_HEAD') {
          if (isWithinRange && isWithinPreciseRange) {
            new_review_role_id = 'LAB_OFF';
          } else {
            new_review_role_id = 'LAB_HEAD';
          }
        } else if (review_role_id === 'LAB_HEAD') {
          new_review_role_id = 'LAB_OFF';
        } else if (review_role_id === 'LAB_OFF') {
          new_review_role_id = 'LAB_LEAD';
        }
      }
      // const request = await this.prisma.request.findUnique({
      //   where: { id: request_id },
      // });
      console.log('status_id:', status_id);
      const requestUpdate = {
        status_request_id: status_id,
        status_sample_id: (status_sample_id ?? request?.status_sample_id) === '' ? undefined : (status_sample_id ?? 0),
        review_role_id: new_review_role_id,
        updated_by: user_id,
        updated_on: new Date(),
      };
      console.log('requestUpdate:', requestUpdate);
      const request_detail = await this.prisma.request_detail.findFirst({
        where: { request_id: request_id },
      });

      await this.prisma.$transaction(async (tx) => {
        await tx.request.update({
          where: { id: request_id },
          data: requestUpdate,
        });
        await tx.request_detail.update({
          where: { id: request_detail?.id },
          data: {
            updated_by: user_id,
            updated_on: new Date(),
          },
        });
        await tx.request_log.create({
          data: {
            request_id: request_id,
            status_request_id: status_id,
            activity_request_id: activity_request_id,
            user_id: user_id,
            timestamp: new Date(),
            remark: remark,
          },
        });

        // Upsert request_sample and request_sample_item if provided
        if (request_sample && Array.isArray(request_sample)) {
          const now = new Date();
          
          // Prepare samples with correct request_id
          const samples = request_sample.map(s => ({
            ...s,
            request_id: request_id,
            request_sample_item: s.request_sample_item?.map(i => ({ ...i })) ?? [],
          }));

          // Get sample IDs from payload (only valid IDs)
          const sampleIdsInPayload = new Set(samples.filter(s => s.id && s.id !== 0).map(s => s.id));

          // Get all existing samples in DB for this request
          const samplesInDb = await tx.request_sample.findMany({
            where: { request_id: request_id },
          });

          // Delete samples (and their children) not in the payload
          for (const dbSample of samplesInDb) {
            if (!sampleIdsInPayload.has(dbSample.id)) {
              // Delete children first to avoid FK constraint errors
              await tx.request_sample_item.deleteMany({ where: { request_sample_id: dbSample.id } });
              await tx.request_sample_chemical.deleteMany({ where: { request_sample_id: dbSample.id } });
              await tx.request_sample_microbiology.deleteMany({ where: { request_sample_id: dbSample.id } });
              await tx.request_sample.delete({ where: { id: dbSample.id } });
            }
          }

          // Upsert samples and their children
          for (const sample of samples) {
            if (activity_request_id === "ACCEPT") {
              sample.status_sample_id = "TESTING";
            }
            const { request_sample_item, ...sampleData } = sample;

            // Upsert sample
            const createdSample = await tx.request_sample.upsert({
              where: { id: sample.id && sample.id !== 0 ? sample.id : -1 },
              update: {
                ...sampleData,
                request_id: request_id,
                updated_on: now,
                updated_by: user_id,
              },
              create: {
                ...sampleData,
                request_id: request_id,
                created_on: now,
                created_by: user_id,
                updated_on: now,
                updated_by: user_id,
              },
            });

            const sampleId = createdSample.id;

            // Upsert and delete for request_sample_item
            const items = (request_sample_item ?? []).map(i => ({
              ...i,
              request_sample_id: sampleId,
            }));
            
            const itemsInDb = await tx.request_sample_item.findMany({
              where: { request_sample_id: sampleId },
            });
            
            const itemIdsInPayload = new Set(items.filter(i => i.id && i.id !== 0).map(i => i.id));
            
            for (const dbItem of itemsInDb) {
              if (!itemIdsInPayload.has(dbItem.id)) {
                await tx.request_sample_item.delete({ where: { id: dbItem.id } });
              }
            }
            
            for (const item of items) {
              const { id, ...itemData } = item;
              if (item.id && item.id !== 0) {
                await tx.request_sample_item.upsert({
                  where: { id: item.id },
                  update: {
                    ...item,
                    request_sample_id: sampleId,
                    updated_on: now,
                    updated_by: user_id,
                  },
                  create: {
                    ...itemData,
                    request_sample_id: sampleId,
                    created_on: now,
                    created_by: user_id,
                    updated_on: now,
                    updated_by: user_id,
                  },
                });
              } else {
                await tx.request_sample_item.create({
                  data: {
                    ...itemData,
                    request_sample_id: sampleId,
                    created_on: now,
                    created_by: user_id,
                    updated_on: now,
                    updated_by: user_id,
                  },
                });
              }
            }
          }
        }
      });
      if (activity_request_id === "CONFIRM") {
        const role = await this.prisma.user_role.findMany({
          where: { user_id: user_id, role_id: 'LAB_HEAD' },
        });
        if (role.length > 0) {
          // Log the confirmation time
          console.log('Request confirmed by LAB_HEAD');
          const user_location = await this.prisma.user_location.findUnique({
            where: { id: request?.lab_site?.id ?? '' },
          });
          if (user_location) {
            const lab_officer = await this.prisma.user.findFirst({
              where: { user_location_id: user_location.id, user_role: { some: { role_id: 'LAB_OFF' } } },
              select: { user_role: { select: { role_id: true } }, email: true, fullname: true },
            });
            if (lab_officer) {
              await sendMail(
                lab_officer.email,
                lab_officer.fullname,
                'ขออนุมัติใบส่งตัวอย่าง',
                activity_request_id,
                `${process.env.FRONTEND_URL}/request/${request_id}/detail`,
              );
            }
          }
        } else {
          if (isWithinPreciseRange) {
          // Log the acceptance time
            console.log('Request accepted within 00:00 - 15:00 range');
            const user_location = await this.prisma.user_location.findUnique({
              where: { id: request?.lab_site?.id ?? '' },
            });
            if (user_location) {
              const lab_officer = await this.prisma.user.findFirst({
                where: { user_location_id: user_location.id, user_role: { some: { role_id: 'LAB_OFF' } } },
                select: { user_role: { select: { role_id: true } }, email: true, fullname: true },
              });
              if (lab_officer) {
                await sendMail(
                  lab_officer.email,
                  lab_officer.fullname,
                  'ขออนุมัติใบส่งตัวอย่าง',
                  activity_request_id,
                  `${process.env.FRONTEND_URL}/request/${request_id}/detail`,
                );
              }
            }
          } else {
            // Log the acceptance time outside the range
            console.log('Request accepted outside 00:00 - 15:00 range');
            const user_location = await this.prisma.user_location.findUnique({
              where: { id: request?.lab_site?.id ?? '' },
            });
            if (user_location) {
              const lab_head = await this.prisma.user.findFirst({
                where: { user_location_id: user_location.id, user_role: { some: { role_id: 'LAB_HEAD' } } },
                select: { user_role: { select: { role_id: true } }, email: true, fullname: true },
              });
              if (lab_head) {
                await sendMail(
                  lab_head.email,
                  lab_head.fullname,
                  'ขออนุมัติทำการทดสอบนอกเวลาทำการ',
                  activity_request_id,
                  `${process.env.FRONTEND_URL}/request/${request_id}/detail`,
                );
              }
            }
          }
        }
      } else if (activity_request_id === "ACCEPT") {
        const requestSample_duedate = await this.prisma.request_sample.findFirst({
          where: { request_id: request_id },
          orderBy: { due_date: 'desc' },
        });
        await sendMail(
          request?.requester?.email ?? '',
          request?.requester?.fullname ?? '',
          'ขออนุมัติทำการทดสอบนอกเวลาทำการ',
          activity_request_id,
          `${process.env.FRONTEND_URL}/request/${request_id}/detail`,
          request,
          requestSample_duedate?.due_date?.toISOString() ?? '',
        );
      }
      return { message: 'Success' };
      console.log('request_id:', request_id);
      console.log('activity_request_id:', activity_request_id);
      console.log('review_role_id:', review_role_id);
      console.log('user_id:', user_id);
      console.log('remark:', remark);
      console.log('request_sample:', request_sample);
      console.log('request_sample_item:', request_sample?.map(s => s.request_sample_item).flat());
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

      // 6. Duplicate request_log as a new one
      const request_log = {
        request_id: newRequest.id, // Keep the original request ID for reference
        status_request_id: 'DRAFT', // Set to DRAFT or as needed
        activity_request_id: 'DRAFT', // Set to DRAFT or as needed
        user_id: user_id,
        timestamp: new Date(),
        remark: '',
      };
      await this.prisma.request_log.create({
        data: request_log,
      });

      // 7. Return the new duplicated request info
      return {
        message: 'Success', //`Request with ID ${id} has been duplicated successfully.`,
        id: newRequest.id,
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

      // Update status_sample_id in every request_sample for this request
      await this.prisma.request_sample.updateMany({
        where: { request_id: request_id },
        data: {
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

    async list(@Body() payload: ListRequestDto) {
      const request = await this.prisma.request.findMany({
        select: {
          id: true,
          request_number: true,
          request_date: true,
          due_date: true,
          requester: {
            select: {
              id: true,
              fullname: true,
              email: true,
            }
          },
          status_request: {
            select: {
              id: true,
              name: true,
            }
          },
          status_sample: {
            select: {
              id: true,
              name: true,
            }
          },
          request_type: {
            select: {
              id: true,
              name: true,
            }
          },
          lab_site: {
            select: {
              id: true,
              name: true,
            }
          },
        },

        orderBy: { created_on: 'desc' },
      });
      return request.map(req => ({
        id: req.id,
        request_number: req.request_number ?? "",
        requester_id: req.requester?.id ?? 0,
        requester_name: req.requester?.fullname ?? "",
        lab_site_id: req.lab_site?.id ?? "",
        lab_site_name: req.lab_site?.name ?? "",
        request_type_id: req.request_type?.id ?? "",
        request_type_name: req.request_type?.name ?? "",
        request_date: req.request_date ?? "",
        due_date: req.due_date ?? "",
        status_request_id: req.status_request?.id ?? "",
        status_request_name: req.status_request?.name ?? "",
        status_sample_id: req.status_sample?.id ?? "",
        status_sample_name: req.status_sample?.name ?? "",
      }));
    }

    async test(@Body() payload: { sender: string, subject: string, receivers: string, message: string }) {
      const { sender, subject, receivers, message } = payload;
      console.log('Testing email with payload:', payload);
      const link = 'https://www.google.com';
      const response = await sendMail(
        receivers,
        'Title',
        'ขออนุมัติใบส่งตัวอย่าง',
        'SEND',
        link
      );
      return response?.data
    }
}
