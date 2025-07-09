/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { create } from 'domain';
import axios from 'axios';
import { UnauthorizedException } from '@nestjs/common';

const prisma = new PrismaClient();

/* ---------- typed helpers ---------- */

interface CommonRow {
  order: number;
  name: string;
  text_input: boolean | 'TRUE' | 'FALSE' | 'true' | 'false';
  status: boolean | 'TRUE' | 'FALSE' | 'true' | 'false';
  created_by: number;
  updated_by: number;
}

interface RetainingRow extends Omit<CommonRow, 'created_by' | 'updated_by'> {
  created_by?: number;
  updated_by?: number;
}

interface StaticRow {
  id: string;
  order: number;
  name: string;
  status: boolean | 'TRUE' | 'FALSE' | 'true' | 'false';
}

interface StatusRequestRow extends StaticRow {
  state_id?: string;
}

interface UserLocationRow extends StaticRow {
  lab_site_id?: string;
}

/** Convert TRUE/FALSE strings to boolean and numbers to number */
const toBool = (v: unknown): boolean =>
  v === true || v === 'TRUE' || v === 'true' || v === 1 || v === '1';

/** Read an excel file under prisma/staticfile/ and return typed JSON rows */
function readExcel<T>(fileName: string): T[] {
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  return xlsx.utils.sheet_to_json<T>(wb.Sheets[sheet], { defval: null });
}

/* ---------- delete existing data ---------- */

async function clearOldData() {
  await prisma.chemical_sample_description.deleteMany();
  await prisma.chemical_parameter.deleteMany();
  await prisma.sample_description.deleteMany();
  await prisma.report_heading.deleteMany();
  await prisma.sample_retaining.deleteMany();
  await prisma.sample_stage.deleteMany();
  await prisma.lab_process.deleteMany();
  await prisma.lab_site.deleteMany();
  await prisma.request_type.deleteMany();
  await prisma.state.deleteMany();
  await prisma.status_request.deleteMany();
  await prisma.status_sample.deleteMany();
  await prisma.status_retain.deleteMany();
  await prisma.status_equipment.deleteMany();
  await prisma.sample_type.deleteMany();
  await prisma.lab_test.deleteMany();
  await prisma.category_chemical.deleteMany();
  await prisma.sample_condition.deleteMany();
  await prisma.test_report_format.deleteMany();
  await prisma.accredited.deleteMany();
  await prisma.spec_type.deleteMany();
  await prisma.activity_request.deleteMany();
  await prisma.activity_equipment.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user_location.deleteMany();
  await prisma.objective.deleteMany();
  await prisma.line.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.chemical_parameter.deleteMany();
  await prisma.chemical.deleteMany();
  await prisma.microbiology_parameter.deleteMany();
  await prisma.material.deleteMany();
  await prisma.material_chemical.deleteMany();
  await prisma.material_microbiology.deleteMany();
  await prisma.category_edit.deleteMany();
  await prisma.location.deleteMany();
  await prisma.section.deleteMany();
  await prisma.box.deleteMany();
  await prisma.manufacturer.deleteMany(); //   5/27/2025
  await prisma.equipment_type.deleteMany();
  await prisma.location_email.deleteMany();
  await prisma.request.deleteMany();
  await prisma.request_detail.deleteMany();
  await prisma.request_sample.deleteMany();
  await prisma.stock_retain.deleteMany();
  await prisma.stock_retain_item.deleteMany();
  await prisma.request_sample_item.deleteMany();

  // Add any other models you want to clear here
  console.log('🧹 Old data deleted');
}

/* ---------- seed functions ---------- */

async function seedLabProcess() {
  const rows = readExcel<CommonRow>('lab_process.xlsx');

  for (const r of rows) {
    await prisma.lab_process.create({
      data: {
        order: Number(r.order),
        name: r.name,
        text_input: toBool(r.text_input),
        status: toBool(r.status),
        created_by: Number(r.created_by),
        updated_by: Number(r.updated_by),
      },
    });
  }
  console.log('✅ lab_process seeded');
}

async function seedSampleStage() {
  const rows = readExcel<CommonRow>('sample_stage.xlsx');

  for (const r of rows) {
    await prisma.sample_stage.create({
      data: {
        order: Number(r.order),
        name: r.name,
        text_input: toBool(r.text_input),
        status: toBool(r.status),
        created_by: Number(r.created_by),
        updated_by: Number(r.updated_by),
      },
    });
  }
  console.log('✅ sample_stage seeded');
}

async function seedSampleRetaining() {
  const rows = readExcel<RetainingRow>('sample_retaining.xlsx');

  for (const r of rows) {
    await prisma.sample_retaining.create({
      data: {
        order: Number(r.order),
        name: r.name,
        text_input: toBool(r.text_input),
        status: toBool(r.status),
        created_by: r.created_by ? Number(r.created_by) : null,
        updated_by: r.updated_by ? Number(r.updated_by) : null,
      },
    });
  }
  console.log('✅ sample_retaining seeded');
}

async function seedLabSite() {
  const rows = readExcel<StaticRow>('lab_site.xlsx');

  for (const r of rows) {
    await prisma.lab_site.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ lab_site seeded');
}

async function seedRequestType() {
  const rows = readExcel<StaticRow>('request_type.xlsx');

  for (const r of rows) {
    await prisma.request_type.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  console.log('✅ request_type seeded');
  }
}

async function seedState() {
  const rows = readExcel<StaticRow>('state.xlsx');

  for (const r of rows) {
    await prisma.state.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ state seeded');
}

async function seedStatusRequest() {
  const rows = readExcel<StatusRequestRow>('status_request.xlsx');

  for (const r of rows) {
    await prisma.status_request.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        state_id: r.state_id,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ status_request seeded');
}

async function seedStatusSample() {
  const rows = readExcel<StaticRow>('status_sample.xlsx');

  for (const r of rows) {
    await prisma.status_sample.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ status_sample seeded');
}

async function seedStatusRetain() {
  const rows = readExcel<StaticRow>('status_retain.xlsx');

  for (const r of rows) {
    await prisma.status_retain.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  console.log('✅ status_retain seeded');
  }
}

async function seedStatusEquipment() {
  const rows = readExcel<StaticRow>('status_equipment.xlsx');

  for (const r of rows) {
    await prisma.status_equipment.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ status_equipment seeded');
}

async function seedSampleType() {
  const rows = readExcel<StaticRow>('sample_type.xlsx');

  for (const r of rows) {
    await prisma.sample_type.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ sample_type seeded');
}

async function seedLabTest() {
  const rows = readExcel<StaticRow>('lab_test.xlsx');

  for (const r of rows) {
    await prisma.lab_test.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  console.log('✅ lab_test seeded');
  }
}

async function seedCategoryChemical() {
  const rows = readExcel<StaticRow>('category_chemical.xlsx');

  for (const r of rows) {
    await prisma.category_chemical.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ category_chemical seeded');
}

async function seedSampleCondition() {
  const rows = readExcel<StaticRow>('sample_condition.xlsx');

  for (const r of rows) {
    await prisma.sample_condition.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ sample_condition seeded');
}

async function seedTestReportFormat() {
  const rows = readExcel<StaticRow>('test_report_format.xlsx');

  for (const r of rows) {
    await prisma.test_report_format.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ test_report_format seeded');
}

async function seedAccredited() {
  const rows = readExcel<StaticRow>('accredited.xlsx');

  for (const r of rows) {
    await prisma.accredited.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ accredited seeded');
}

async function seedSpecType() {
  const rows = readExcel<StaticRow>('spec_type.xlsx');

  for (const r of rows) {
    await prisma.spec_type.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ spec_type seeded');
}

async function seedActivityRequest() {
  const rows = readExcel<StaticRow>('activity_request.xlsx');

  for (const r of rows) {
    await prisma.activity_request.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ activity_request seeded');
}

async function seedActivityEquipment() {
  const rows = readExcel<StaticRow>('activity_equipment.xlsx');

  for (const r of rows) {
    await prisma.activity_equipment.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ activity_equipment seeded');
}

async function seedRole() {
  const rows = readExcel<StaticRow>('role.xlsx');

  for (const r of rows) {
    await prisma.role.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ role seeded');
}

async function seedUserLocation() {
  const rows = readExcel<UserLocationRow>('user_location.xlsx');

  for (const r of rows) {
    await prisma.user_location.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        lab_site_id: r.lab_site_id,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ user_location seeded');
}

async function seedSampleDescription() {
  const rows = readExcel<StaticRow>('sample_description.xlsx');

  for (const r of rows) {
    await prisma.sample_description.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ sample_description seeded');
}

async function seedReportHeading() {
  const rows = readExcel<StaticRow>('report_heading.xlsx');

  for (const r of rows) {
    await prisma.report_heading.create({
      data: {
        id: r.id,
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
    });
  }
  console.log('✅ report_heading seeded');
}

async function seedObjectiveFromNew() {
  const fileName = 'Objective.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.objective.create({
        data: {
          id: r.id,
          order: Number(r.order),
          name: r.name,
          text_input:
            r.text_input === true ||
            r.text_input === 'TRUE' ||
            r.text_input === 'true' ||
            r.text_input === 1 ||
            r.text_input === '1',
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert objective:', r, e.message);
    }
  }
  console.log('✅ Objective (from 001 - Objective.xlsx) seeded');
}

async function create_stock_retain() {
  // --- Seed stock_retain ---
  for (let i = 1; i <= 20; i++) {
    await prisma.stock_retain.create({
      data: {
        request_sample_id: i, // Make sure these IDs exist in request_sample
        location_id: 1,
        section_id: 1,
        box_id: 1,
        status_retain_id: 'SR01',
        created_on: new Date(),
        created_by: 1,
        updated_on: new Date(),
        updated_by: 1,
      },
    });
  }
}

async function create_stock_retain_item() {
  // --- Seed stock_retain_item ---
  for (let i = 1; i <= 20; i++) {
    await prisma.stock_retain_item.create({
      data: {
        stock_retain_id: i, // Make sure these IDs exist in stock_retain
        sample_item_id: i,  // Make sure these IDs exist in sample_item (or adjust as needed)
        status_retain_id: 'SR01',
        approve_role_id: 'ROLE01',
        plan_return_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // +30 days
        return_date: null,
        created_on: new Date(),
        created_by: 1,
        updated_on: new Date(),
        updated_by: 1,
      },
    });
  }
}

// Sample State

async function seedSampleStateFromNew() {
  const fileName = 'Sample_State.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    if (!r.id) {
      try {
        await prisma.sample_stage.create({
          data: {
            id: r.id,
            order: Number(r.order),
            name: r.name,
            text_input:
              r.text_input === true ||
              r.text_input === 'TRUE' ||
              r.text_input === 'true' ||
              r.text_input === 1 ||
              r.text_input === '1',
            status:
              r.status === true ||
              r.status === 'TRUE' ||
              r.status === 1 ||
              r.status === '1',
            created_by: r.created_by ? Number(r.created_by) : 0,
            updated_by: r.updated_by ? Number(r.updated_by) : 0,
          },
        });
      } catch (e) {
        console.error('❌ Failed to insert sample_state:', r, e.message);
      }
    }
  }
  console.log('✅ sample_state (from Smaple State.xlsx) seeded');
}

//line

async function seedLineFromNew() {
  const fileName = 'line.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.line.create({
        data: {
          code: r.code, // Make sure your Excel file has a 'code' column
          name: r.name,
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          // Add other fields as needed
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert line:', r, e.message);
    }
  }
  console.log('✅ line (from line.xlsx) seeded');
}

//unit

async function seedUnitFromNew() {
  const fileName = 'Unit.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.unit.create({
        data: {
          // Ensure your Excel file has the required columns or set defaults
          order: Number(r.order),
          name: r.name,
          status: toBool(r.status),
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          is_sample:
            r.is_sample === true ||
            r.is_sample === 'TRUE' ||
            r.is_sample === 1 ||
            r.is_sample === '1',
          is_chemical:
            r.is_chemical === true ||
            r.is_chemical === 'TRUE' ||
            r.is_chemical === 1 ||
            r.is_chemical === '1',
          is_microbiology:
            r.is_microbiology === true ||
            r.is_microbiology === 'TRUE' ||
            r.is_microbiology === 1 ||
            r.is_microbiology === '1',
          is_chemical_stock:
            r.is_chemical_stock === true ||
            r.is_chemical_stock === 'TRUE' ||
            r.is_chemical_stock === 1 ||
            r.is_chemical_stock === '1',
          // Add other fields as needed
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert unit:', r, e.message);
    }
  }
  console.log('✅ unit (from unit.xlsx) seeded');
}

// chemical_parameter

async function seedChemicalParameterFromNew() {
  const fileName = 'chemical_parameter.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    // Resolve unit_id
    let unitId: number | null = null;
    if (r.unit_id != null && r.unit_id !== '') {
      const unit = await prisma.unit.findFirst({
        where: { name: r.unit_id },
        select: { id: true },
      });
      unitId = unit ? unit.id : null;
    }

    // Resolve sample_type_id
    let sampleTypeId: string | null = null;
    if (r.sample_type_id != null && r.sample_type_id !== '') {
      const sampleType = await prisma.sample_type.findFirst({
        where: { name: r.sample_type_id },
        select: { id: true },
      });
      sampleTypeId = sampleType ? sampleType.id : null;
    }

    // Resolve spec_type_id
    let specTypeId: string | null = null;
    if (r.spec_type_id != null && r.spec_type_id !== '') {
      const specType = await prisma.spec_type.findFirst({
        where: { name: r.spec_type_id },
        select: { id: true },
      });
      specTypeId = specType ? specType.id : null;
    }

    try {
      await prisma.chemical_parameter.create({
        data: {
          // Map your fields as needed
          id: r.id,
          order: Number(r.order),
          name: r.name,
          name_abb: r.name_abb,
          request_min: r.request_min !== null ? Number(r.request_min) : null,
          unit_id: unitId,
          sample_type_id: sampleTypeId,
          spec_type_id: specTypeId,
          spec: r.spec,
          spec_min: r.spec_min !== null ? Number(r.spec_min) : null,
          spec_max: r.spec_max !== null ? Number(r.spec_max) : null,
          warning_min: r.warning_min !== null ? Number(r.warning_min) : null,
          warning_max: r.warning_max !== null ? Number(r.warning_max) : null,
          is_enter_spec_min:
            r.is_enter_spec_min === true ||
            r.is_enter_spec_min === 'TRUE' ||
            r.is_enter_spec_min === 1 ||
            r.is_enter_spec_min === '1',
          is_enter_spec_max:
            r.is_enter_spec_max === true ||
            r.is_enter_spec_max === 'TRUE' ||
            r.is_enter_spec_max === 1 ||
            r.is_enter_spec_max === '1',
          is_enter_warning_min:
            r.is_enter_warning_min === true ||
            r.is_enter_warning_min === 'TRUE' ||
            r.is_enter_warning_min === 1 ||
            r.is_enter_warning_min === '1',
          is_enter_warning_max:
            r.is_enter_warning_max === true ||
            r.is_enter_warning_max === 'TRUE' ||
            r.is_enter_warning_max === 1 ||
            r.is_enter_warning_max === '1',
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert chemical_parameter:', r, e.message);
    }
  }
  console.log('✅ chemical_parameter (from chemical parameter.xlsx) seeded');
}

// Microbiology_Parameter
async function seedMicrobiologyParameterFromNew() {
  const fileName = 'Microbiology_Parameter.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    // Resolve unit_id
    let unitId: number | undefined;
    if (r.unit_id != null && r.unit_id !== '') {
      const unit = await prisma.unit.findFirst({
        where: { name: r.unit_id },
        select: { id: true },
      });
      unitId = unit ? unit.id : undefined;
    }

    // Resolve sample_type_id
    let sampleTypeId: string | undefined;
    if (r.sample_type_id != null && r.sample_type_id !== '') {
      const sampleType = await prisma.sample_type.findFirst({
        where: { name: r.sample_type_id },
        select: { id: true },
      });
      sampleTypeId = sampleType ? sampleType.id : undefined;
    }

    // Resolve spec_type_id
    let specTypeId: string | undefined;
    if (r.spec_type_id != null && r.spec_type_id !== '') {
      const specType = await prisma.spec_type.findFirst({
        where: { name: r.spec_type_id },
        select: { id: true },
      });
      specTypeId = specType ? specType.id : undefined;
    }

    try {
      await prisma.microbiology_parameter.create({
        data: {
          id: r.id,
          order: Number(r.order),
          name: r.name,
          name_abb: r.name_abb,
          request_min:
            r.request_min !== null ? Number(r.request_min) : undefined,
          ...(unitId !== undefined && { unit_id: unitId }),
          ...(sampleTypeId !== undefined && { sample_type_id: sampleTypeId }),
          ...(specTypeId !== undefined && { spec_type_id: specTypeId }),
          spec: r.spec,
          spec_min: r.spec_min !== null ? Number(r.spec_min) : undefined,
          spec_max: r.spec_max !== null ? Number(r.spec.max) : undefined,
          warning_min:
            r.warning_min !== null ? Number(r.warning_min) : undefined,
          warning_max:
            r.warning_max !== null ? Number(r.warning_max) : undefined,
          is_enter_spec_min:
            r.is_enter_spec_min === true ||
            r.is_enter_spec_min === 'TRUE' ||
            r.is_enter_spec_min === 1 ||
            r.is_enter_spec_min === '1',
          is_enter_spec_max:
            r.is_enter_spec_max === true ||
            r.is_enter_spec_max === 'TRUE' ||
            r.is_enter_spec_max === 1 ||
            r.is_enter_spec_max === '1',
          is_enter_warning_min:
            r.is_enter_warning_min === true ||
            r.is_enter_warning_min === 'TRUE' ||
            r.is_enter_warning_min === 1 ||
            r.is_enter_warning_min === '1',
          is_enter_warning_max:
            r.is_enter_warning_max === true ||
            r.is_enter_warning_max === 'TRUE' ||
            r.is_enter_warning_max === 1 ||
            r.is_enter_warning_max === '1',
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          final_result: r.final_result ?? '',
          decimal:
            r.decimal !== undefined && r.decimal !== null
              ? Number(r.decimal)
              : 0,
          is_enter_decimal:
            r.is_enter_decimal === true ||
            r.is_enter_decimal === 'TRUE' ||
            r.is_enter_decimal === 1 ||
            r.is_enter_decimal === '1',
        },
      });
    } catch (e) {
      console.error(
        '❌ Failed to insert microbiology_parameter:',
        r,
        e.message,
      );
    }
  }
  console.log(
    '✅ microbiology_parameter (from microbiology_parameter.xlsx) seeded',
  );
}

// material

async function seedMaterialFromNew() {
  const fileName = 'material.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.material.create({
        data: {
          id: r.id != null ? String(r.id) : '', // Ensure string, fallback to empty string
          name: r.name,
          test_report_name: r.test_report_name ?? '',
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert material:', r, e.message);
    }
  }
  console.log('✅ material (from material.xlsx) seeded');
}

async function seedMaterialChemicalParameterFromNew() {
  const fileName = 'Material_ChemicalParameter.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    let chemicalParameterId = r.chemical_parameter_id;
    if (chemicalParameterId && isNaN(Number(chemicalParameterId))) {
      const chemicalParameter = await prisma.chemical_parameter.findFirst({
        where: { name: chemicalParameterId },
        select: { id: true },
      });
      chemicalParameterId = chemicalParameter ? chemicalParameter.id : null;
    }

    try {
      await prisma.material_chemical.create({
        data: {
          id: r.id, // Ensure string
          material_id: r.material_id != null ? String(r.material_id) : '', // Ensure string
          chemical_parameter_id: chemicalParameterId,
          created_by: r.created_by ? Number(r.created_by) : 0,
        },
      });
    } catch (e) {
      console.error(
        '❌ Failed to insert material_chemicalParameter:',
        r,
        e.message,
      );
    }
  }
  console.log(
    '✅ material_chemicalParameter (from 010 - Material_ChemicalParameter.xlsx) seeded',
  );
}

async function seedMaterialMicrobiologyParameterFromNew() {
  const fileName = 'Material_MicrobiologyParameter.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    let microbiologyParameterId = r.microbiology_parameter_id;
    if (microbiologyParameterId && isNaN(Number(microbiologyParameterId))) {
      const microbiologyParameter =
        await prisma.microbiology_parameter.findFirst({
          where: { name: microbiologyParameterId },
          select: { id: true },
        });
      microbiologyParameterId = microbiologyParameter
        ? microbiologyParameter.id
        : null;
    }

    try {
      await prisma.material_microbiology.create({
        data: {
          id: r.id, // Ensure string
          material_id: r.material_id != null ? String(r.material_id) : '', // Ensure string
          microbiology_parameter_id: microbiologyParameterId,
          created_by: r.created_by ? Number(r.created_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert material_microbiology:', r, e.message);
    }
  }
  console.log(
    '✅ material_microbiology (from Material_MicrobiologyParameter.xlsx) seeded',
  );
}

async function seedEditCategoryFromNew() {
  const fileName = 'Edit_Category.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.category_edit.create({
        data: {
          id: r.id,
          order: Number(r.order),
          name: r.name,
          status: toBool(r.status),
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert edit_category:', r, e.message);
    }
  }
  console.log('✅ edit_category (from edit_category.xlsx) seeded');
}

async function seedLocationFromNew() {
  const fileName = 'Location.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.location.create({
        data: {
          id: r.id,
          name: r.name,
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          // Add any other required fields from your Prisma schema here
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert location:', r, e.message);
    }
  }
  console.log('✅ location (from location.xlsx) seeded');
}

async function seedSectionFromNew() {
  const fileName = 'Section.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    let locationId = r.location_id;

    const location = await prisma.location.findFirst({
      where: {
        OR: [{ name: locationId }],
      },
      select: { id: true },
    });
    locationId = location ? location.id : null;

    try {
      await prisma.section.create({
        data: {
          id: r.id,
          name: r.name,
          location_id: locationId,
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          number_of_box: r.number_of_box !== null ? Number(r.number_of_box) : 0,
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          // Add any other required fields from your Prisma schema here
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert section:', r, e.message);
    }
  }
  console.log('✅ section (from section.xlsx) seeded');
}

//
async function seedBoxFromNew() {
  const fileName = 'Box.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    // Resolve location_id by name or code if needed
    let locationId = r.location_id;
    if (locationId && isNaN(Number(locationId))) {
      const location = await prisma.location.findFirst({
        where: {
          OR: [{ name: locationId }],
        },
        select: { id: true },
      });
      locationId = location ? location.id : null;
    } else if (locationId) {
      locationId = Number(locationId);
    }

    // Resolve section_id by name or code if needed
    let sectionId = r.section_id;
    if (sectionId && isNaN(Number(sectionId))) {
      const section = await prisma.section.findFirst({
        where: {
          OR: [
            { name: sectionId },
            // Add { code: sectionId } if your section table has a code field
          ],
        },
        select: { id: true },
      });
      sectionId = section ? section.id : null;
    } else if (sectionId) {
      sectionId = Number(sectionId);
    }

    try {
      await prisma.box.create({
        data: {
          id: r.id,
          name: r.name,
          location_id: locationId,
          section_id: sectionId,
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          number_of_bottle:
            r.number_of_bottle !== null ? Number(r.number_of_bottle) : 0,
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          // Add any other required fields from your Prisma schema here
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert box:', r, e.message);
    }
  }
  console.log('✅ box (from box.xlsx) seeded');
}

async function seedManufacturerFromBrand() {
  const fileName = 'Brand.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.manufacturer.create({
        data: {
          id: r.id,
          name: r.name,
          is_chemical_stock:
            r.is_chemical_stock === true ||
            r.is_chemical_stock === 'TRUE' ||
            r.is_chemical_stock === 1 ||
            r.is_chemical_stock === '1',
          is_equipment_stock:
            r.is_equipment_stock === true ||
            r.is_equipment_stock === 'TRUE' ||
            r.is_equipment_stock === 1 ||
            r.is_equipment_stock === '1',
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',

          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert manufacturer:', r, e.message);
    }
  }
  console.log('✅ manufacturer (from brand.xlsx) seeded');
}

// EquipmentType

async function seedEquipmentTypeFromNew() {
  const fileName = 'Equipment_Type.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    try {
      await prisma.equipment_type.create({
        data: {
          id: r.id,
          name: r.name,
          order: Number(r.order),
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          // Add other fields as needed
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert equipment_type:', r, e.message);
    }
  }
  console.log('✅ equipment_type (from Equipment_Type.xlsx) seeded');
}

async function seedLocationEmailFromEquipmentDueDate() {
  const fileName = 'Equipment_Due_Date_Notification.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    // Resolve user_location_id by name or code if needed
    let userLocationId = r.user_location_id;
    if (userLocationId && isNaN(Number(userLocationId))) {
      const userLocation = await prisma.user_location.findFirst({
        where: {
          OR: [{ name: userLocationId }],
        },
        select: { id: true },
      });
      userLocationId = userLocation ? userLocation.id : null;
    } else if (userLocationId) {
      userLocationId = String(userLocationId);
    }

    try {
      await prisma.location_email.create({
        data: {
          user_location_id: userLocationId,
          email_notification: r.email_notification,
          status:
            r.status === true ||
            r.status === 'TRUE' ||
            r.status === 1 ||
            r.status === '1',
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          // Add other fields as needed
        },
      });
    } catch (e) {
      console.error('❌ Failed to insert location_email:', r, e.message);
    }
  }
  console.log(
    '✅ location_email (from 019 - Equipment Due Date Notification.xlsx) seeded',
  );
}


async function create_request_sample() {
  // You may want to ensure these IDs exist in your DB before running this seed!
  const requestId = 1;
  const materialId = 1;
  const lineId = 1;
  const statusSampleId = 'SS01';
  const categoryEditId = 1;

  for (let i = 1; i <= 20; i++) {
    await prisma.request_sample.create({
      data: {
        request_id: requestId,
        material_code: `MAT-${i}`,
        sample_code: `SMP-${i}`,
        sample_name: `Sample Name ${i}`,
        sampling_date: new Date(),
        expiry_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // +30 days
        batch_no: `BATCH${i}`,
        is_display_special: false,
        special_test_time: null,
        due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // +7 days
        note: `Seeded sample ${i}`,
        certificate_name: `Certificate ${i}`,
        path: `/uploads/sample_${i}.pdf`,
        revision: 1,
        is_parameter_completed: false,
        created_on: new Date(),
        created_by: 1,
        updated_on: new Date(),
        updated_by: 1,
      },
    });
  }
}


function randomString(length: number) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomEmail(name: string) {
  return `${name.toLowerCase()}@example.com`;
}

function randomPhone() {
  return `08${randomInt(10000000, 99999999)}`;
}

function randomLocation(): string {
  const locations = ['AY', 'HM', 'HCC', 'QAC AY', 'QAC HM', 'Incoming HM'];
  return locations[randomInt(0, locations.length - 1)];
}

async function create_user() {
  // Seed 20 Users
  for (let i = 1; i <= 20; i++) {
    const username = `user${i}`;
    await prisma.user.create({
      data: {
        employee_id: `EMP${i.toString().padStart(4, '0')}`,
        username,
        fullname: `User Fullname ${i}`,
        tel: randomPhone(),
        email: randomEmail(username),
        company: `Company ${randomInt(1, 5)}`,
        dept_code: `DPT${randomInt(1, 9)}`,
        dept_name: `Department ${randomInt(1, 10)}`,
        user_location_id: randomLocation(),
        supervisor_id: randomInt(1, 10),
        position_name: `Position ${randomInt(1, 5)}`,
      },
    });
  }

  console.log('User seeding complete!');
}

async function upsert_user_api() {
  const role_list = [
    'TLS-Requester', 'TLS-QC', 'TLS-Lab-Lead', 'TLS-Lab-Admin',
    'TLS-Lab', 'TLS-ITSupport', 'TLS-Head-Requester', 'TLS-Head-Lab'
  ];
  const user_list: any[] = [];
  const header_token = await axios.post('https://api-dev.osotspa.com/securitycontrol/oauth2/token', {
    client_id: process.env.OAUTH2_CLIENT_ID ?? "2ATwV3iAbpmdkzuazH4XPZaffMsQc94H",
    client_secret: process.env.OAUTH2_CLIENT_SECRET ?? "f8D1UqM9OGVcziQ1SfIoz6UTXL5qaDtp",
    grant_type: process.env.OAUTH2_GRANT_TYPE ?? "client_credentials"
  });
  const header_token_workday = await axios.post('https://api.osotspa.com/workday/oauth2/token', {
    client_id: process.env.OAUTH2_CLIENT_ID_WORKDAY ?? "hvvsgnpPyZFOcyMdcsBlMbzPsEqQkIPg",
    client_secret: process.env.OAUTH2_CLIENT_SECRET_WORKDAY ?? "1iz9yRFqK4DB7SCmjX1oDbfS1NHNMZac",
    grant_type: process.env.OAUTH2_GRANT_TYPE_WORKDAY ?? "client_credentials"
  });

  // Fetch all users by role (API calls, not DB, so outside transaction)
  for (const role of role_list) {
    const user = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/userlist_by_role', {
      roles: role,
    }, {
      headers: {
        Authorization: `Bearer ${header_token.data.access_token}`,
      },
    });
    user_list.push(user.data);
  }

  // All DB operations inside a transaction for rollback safety
  await prisma.$transaction(async (tx) => {
    for (const user_data of user_list) {
      try {
        if (!user_data.employee_id) {
          let plant_location: any;
          let filtered_plant: any;
          let filtered_location: any;
          if (!user_data.location) {
            plant_location = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
              user_id: user_data.id,
            }, {
              headers: {
                Authorization: `Bearer ${header_token.data.access_token}`,
              },
            });
            console.log('Plant Location:', plant_location.data.data);
            if (Array.isArray(plant_location.data.data)) {
              filtered_plant = plant_location.data.data.filter((role: any) => role.name == 'plant');
              filtered_location = plant_location.data.data.filter((role: any) => role.name == 'Location');
            } else {
              console.warn('plant_location.data is not an array:', plant_location.data.data);
            }
            console.log('Filtered Plant:', filtered_plant[0].data_value);
            console.log('Filtered Location:', filtered_location[0].data_value);
          }
          console.log('Filtered Location Length:', filtered_location.length);
          const user_location_data = await tx.user_location.findFirstOrThrow({
              where: {
                name: filtered_location[0].data_value //user_data.location,
              },
              select: {
                id: true,
                name: true,
                lab_site_id: true,
              }
          });
          console.log('User Location Data:', user_location_data.id);
          if (!user_location_data.lab_site_id) {
            throw new UnauthorizedException('User location does not have a valid lab_site_id');
          }
          const lab_site_data = await tx.lab_site.findFirstOrThrow({
            where: {
              id: user_location_data.lab_site_id,
            },
            select: {
              name: true,
            }
          });
          let user_location_data_id = user_location_data.id;
          let user_location_data_name = user_location_data.name;
          let user_location_data_lab_site_id = user_location_data.lab_site_id;
          if (filtered_location.length !== 1) {
            user_location_data_id = ""
            user_location_data_name = "";
            user_location_data_lab_site_id = "";
          }
          let lab_site_data_name = lab_site_data.name;
          if (filtered_location.length !== 1) {
            lab_site_data_name = "";
          }
          console.log('Changed User Location Data:', user_location_data);
          console.log('Lab Site Data:', lab_site_data);
          let supervisor_info: any
          let supervisor_data: any;
          if (user_data.supervisor_username && user_data.supervisor_name && user_data.supervisor_mail) {
            supervisor_info = await tx.user.findFirst({
              where: {
                username: user_data.supervisor_username,
              },
              select: {
                id: true,
                employee_id: true,
                username: true,
                fullname: true,
                tel: true,
                email: true,
                company: true,
                dept_code: true,
                dept_name: true,
                user_location_id: true,
                supervisor_id: true,
                position_name: true,
              }
            });
            supervisor_data = await this.usersService.createOrUpdate({
              employee_id: user_data.supervisor_code ?? "",
              username: user_data.supervisor_username,
              fullname: user_data.supervisor_name,
              tel: supervisor_info?.tel ?? "",
              email: user_data.supervisor_mail,
              company: supervisor_info?.company ?? "",
              dept_code: supervisor_info?.dept_code ?? "",
              dept_name: supervisor_info?.dept_name ?? "",
              user_location_id: supervisor_info?.user_location_id ?? "",
              supervisor_id: supervisor_info?.supervisor_id ?? 0,
              position_name: supervisor_info?.position_name ?? "",
              id: supervisor_info?.id ?? 0
            });
        }
          const employee_info: any = await tx.user.findFirst({
            where: {
              username: user_data.username,
            },
            select: {
              id: true,
              employee_id: true,
              username: true,
              fullname: true,
              tel: true,
              email: true,
              company: true,
              dept_code: true,
              dept_name: true,
              user_location_id: true,
              supervisor_id: true,
              position_name: true,
            }
          });
          let employeeID: any = 0;
          let supervisorID: any = 0;
          if (supervisor_data) {
            supervisorID = supervisor_data.id;
          }
          console.log('Supervisor Data:', supervisor_data);
          if (employee_info) {
            employeeID = employee_info.id;
          }
          console.log('Employee Info:', employee_info);
          console.log('Employee ID:', employeeID);
          const employee_data = await this.usersService.createOrUpdate({
            employee_id: user_data.employee_id,
            username: user_data.username,
            fullname: user_data.fullname,
            tel: user_data.telephone,
            email: user_data.email,
            company: user_data.company ?? "",
            dept_code: user_data.dept_code ?? "",
            dept_name: user_data.department,
            user_location_id: user_location_data_id, //user_location_data.id,
            supervisor_id: supervisorID ?? 0, //supervisor_data.id ?? 0,
            position_name: user_data.position_name,
            id: employeeID ?? 0 //employee_info?.id ?? 0
          });
          console.log('Employee Data:', employee_data);
          let employee_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
            user_id: user_data.id,
          }, {
            headers: {
              Authorization: `Bearer ${header_token.data.access_token}`,
            },
          });
          const filtered_roles = employee_role.data.data.filter((role: any) => role.name == 'TLSRole');
          const employee_role_info = await tx.role.findMany({
            where: {
              id: {
                in: filtered_roles.map((role: any) => role.data_value),
              },
            },
            select: {
              id: true,
              name: true,
            },
          });
          if (employee_role_info.length > 0) {
            // Get all current roles for the user
            const existingUserRoles = await tx.user_role.findMany({
              where: { user_id: employee_data.id },
              select: { role_id: true, user_id: true },
            });
            
            const employeeRoleIds = employee_role_info.map(role => role.id);
            const existingRoleIds = existingUserRoles.map(ur => ur.role_id);

            // Create roles that don't exist
            for (const roleId of employeeRoleIds) {
              if (!existingRoleIds.includes(roleId)) {
                await this.userRoleService.createOrUpdate({
                  id: 0,
                  user_id: employee_data.id,
                  role_id: roleId,
                });
              }
            }
            // Delete roles that exist but are not in employee_role_info
            for (const userRole of existingUserRoles) {
              if (!employeeRoleIds.includes(userRole.role_id)) {
                // Find the unique user_role record to get its id
                const userRoleRecord = await tx.user_role.findFirst({
                  where: { user_id: userRole.user_id, role_id: userRole.role_id },
                  select: { id: true },
                });
                if (userRoleRecord) {
                  await tx.user_role.delete({
                    where: { id: userRoleRecord.id },
                  });
                }
              }
            }
          }
          const newExistingUserRoles = await tx.user_role.findMany({
              where: { user_id: employee_data.id },
              select: { role_id: true, user_id: true },
          });
        }
        else {
          const response_employee = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.employee_id}`, {
            headers: {
              Authorization: `Bearer ${header_token_workday.data.access_token}`,
            },
          });
          console.log('Response Employee:', response_employee.data.data);
          const response_supervisor = await axios.get(`https://api.osotspa.com/workday/api/workday/employee_info?employee_id=${user_data.supervisor_id}`, {
            headers: {
              Authorization: `Bearer ${header_token_workday.data.access_token}`,
            },
          });
          console.log('Response Supervisor:', response_supervisor.data.data);
          let plant_location: any;
          let filtered_plant: any;
          let filtered_location: any;
          if (!user_data.location) {
            plant_location = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
              user_id: user_data.id,
            }, {
              headers: {
                Authorization: `Bearer ${header_token.data.access_token}`,
              },
            });
            console.log('Plant Location:', plant_location.data.data);
            if (Array.isArray(plant_location.data.data)) {
              filtered_plant = plant_location.data.data.filter((role: any) => role.name == 'plant');
              filtered_location = plant_location.data.data.filter((role: any) => role.name == 'Location');
            } else {
              console.warn('plant_location.data is not an array:', plant_location.data.data);
            }
            console.log('Filtered Plant:', filtered_plant[0].data_value);
            console.log('Filtered Location:', filtered_location[0].data_value);
          }
          console.log('Filtered Location Length:', filtered_location.length);
          const user_location_data = await tx.user_location.findFirstOrThrow({
            where: {
              name: filtered_location[0].data_value //user_data.location,
            },
            select: {
              id: true,
              name: true,
              lab_site_id: true,
            }
          });
          if (!user_location_data.lab_site_id) {
            throw new UnauthorizedException('User location does not have a valid lab_site_id');
          }
          const lab_site_data = await tx.lab_site.findFirstOrThrow({
            where: {
              id: user_location_data.lab_site_id,
            },
            select: {
              name: true,
            }
          });
          let user_location_data_id = user_location_data.id;
          let user_location_data_name = user_location_data.name;
          let user_location_data_lab_site_id = user_location_data.lab_site_id;
          if (filtered_location.length !== 1) {
            user_location_data_id = ""
            user_location_data_name = "";
            user_location_data_lab_site_id = "";
          }
          let lab_site_data_name = lab_site_data.name;
          if (filtered_location.length !== 1) {
            lab_site_data_name = "";
          }
          console.log('Changed User Location Data:', user_location_data);
          console.log('Lab Site Data:', lab_site_data);
          let supervisor_info: any;
          let supervisor_data: any;
          if (user_data.supervisor_id) {
            supervisor_info = await tx.user.findFirst({
              where: {
                employee_id: user_data.supervisor_id,
              },
              select: {
                id: true,
                employee_id: true,
                username: true,
                fullname: true,
                tel: true,
                email: true,
                company: true,
                dept_code: true,
                dept_name: true,
                user_location_id: true,
                supervisor_id: true,
                position_name: true,
              }
            });
            if (!supervisor_info) {
              supervisor_info = { id: 0, employee_id: "", username: "", fullname: "", tel: "", email: "", company: "", dept_code: "", dept_name: "", user_location_id: "", supervisor_id: 0, position_name: "" };
            }
            console.log('Supervisor Info:', supervisor_info);
            console.log('Supervisor Name:', response_supervisor.data.data[0].FirstNameEN)
            let supervisor_fullname = response_supervisor.data.data[0].FirstNameEN + ' ' + response_supervisor.data.data[0].LastNameEN;
            supervisor_data = await this.usersService.createOrUpdate({
              employee_id: response_supervisor.data.data[0].EmployeeID ?? user_data.supervisor_id ?? "",
              username: user_data.supervisor_username ?? response_supervisor.data.data[0].Email ?? "",
              fullname: user_data.supervisor_name ?? supervisor_fullname ?? "",
              tel: response_supervisor.data.data[0].MobileNo ?? supervisor_info?.tel ?? "",
              email: user_data.supervisor_mail ?? response_supervisor.data.data[0].Email ?? "",
              company: response_supervisor.data.data[0].CompanyNameEN ?? "",
              dept_code: response_supervisor.data.data[0].DepartmentCode ?? "",
              dept_name: response_supervisor.data.data[0].DepartmentNameEN ?? "",
              user_location_id: supervisor_info?.user_location_id ?? "",
              supervisor_id: supervisor_info?.supervisor_id ?? 0,
              position_name: response_supervisor.data.data[0].PositionNameEN ?? supervisor_info?.position_name ?? "",
              id: supervisor_info?.id ?? 0
            });
            console.log('Supervisor Data:', supervisor_data);
          }
          
          const employee_info = await tx.user.findFirst({
            where: {
              username: user_data.username,
            },
            select: {
              id: true,
              employee_id: true,
              username: true,
              fullname: true,
              tel: true,
              email: true,
              company: true,
              dept_code: true,
              dept_name: true,
              user_location_id: true,
              supervisor_id: true,
              position_name: true,
            }
          });
          let employeeID: any = 0;
          let supervisorID: any = 0;
          if (supervisor_data) {
            supervisorID = supervisor_data.id;
          }
          console.log('Supervisor Data:', supervisor_data);
          if (employee_info) {
            employeeID = employee_info.id;
          }
          console.log('Employee Info:', employee_info);
          console.log('Employee ID:', employeeID);
          const employee_data = await this.usersService.createOrUpdate({
            employee_id: user_data.employee_id,
            username: user_data.username,
            fullname: user_data.fullname,
            tel: user_data.telephone,
            email: user_data.email,
            company: response_employee.data.data[0].CompanyNameEN ?? "",
            dept_code: response_employee.data.data[0].DepartmentCode ?? "",
            dept_name: response_employee.data.data[0].DepartmentNameEN ?? "",
            user_location_id: user_location_data.id,
            supervisor_id: supervisorID ?? 0, //supervisor_data.id ?? 0,
            position_name: response_employee.data.data[0].PositionNameEN ?? "",
            id: employeeID ?? 0 //employee_info?.id ?? 0
          });
          let employee_role = await axios.post('https://api-dev.osotspa.com/securitycontrol/api/dataaccessbyuserid', {
            user_id: user_data.id,
          }, {
            headers: {
              Authorization: `Bearer ${header_token.data.access_token}`,
            },
          });
          const filtered_roles = employee_role.data.data.filter((role: any) => role.name == 'TLSRole');
          const employee_role_info = await tx.role.findMany({
            where: {
              id: {
                in: filtered_roles.map((role: any) => role.data_value),
              },
            },
            select: {
              id: true,
              name: true,
            },
          });
          if (employee_role_info.length > 0) {
            // Get all current roles for the user
            const existingUserRoles = await tx.user_role.findMany({
              where: { user_id: employee_data.id },
              select: { role_id: true, user_id: true },
            });

            const employeeRoleIds = employee_role_info.map(role => role.id);
            const existingRoleIds = existingUserRoles.map(ur => ur.role_id);

            // Create roles that don't exist
            for (const roleId of employeeRoleIds) {
              if (!existingRoleIds.includes(roleId)) {
                await this.userRoleService.createOrUpdate({
                  id: 0,
                  user_id: employee_data.id,
                  role_id: roleId,
                });
              }
            }
            // Delete roles that exist but are not in employee_role_info
            for (const userRole of existingUserRoles) {
              if (!employeeRoleIds.includes(userRole.role_id)) {
                // Find the unique user_role record to get its id
                const userRoleRecord = await tx.user_role.findFirst({
                  where: { user_id: userRole.user_id, role_id: userRole.role_id },
                  select: { id: true },
                });
                if (userRoleRecord) {
                  await tx.user_role.delete({
                    where: { id: userRoleRecord.id },
                  });
                }
              }
            }
          }
          const newExistingUserRoles = await tx.user_role.findMany({
            where: { user_id: employee_data.id },
            select: { role_id: true, user_id: true },
          });
          return {
            accessToken: user_data.accessToken,
            id: employee_data.id,
            employee_id: employee_data.employee_id,
            username: employee_data.username,
            fullname: employee_data.fullname,
            tel: employee_data.tel,
            email: employee_data.email,
            company: employee_data.company,
            dept_code: employee_data.dept_code,
            dept_name: employee_data.dept_name,
            user_location_id: employee_data.user_location_id,
            user_location_name: user_location_data_name,
            lab_site_id: user_location_data_lab_site_id,
            lab_site_name: lab_site_data_name,
            supervisor_id: employee_data.supervisor_id,
            position_name: employee_data.position_name,
            is_req: newExistingUserRoles.some((role: any) => role.role_id === "REQ"), // Assuming "REQ" is the role_id for 'req' role
            is_req_head: newExistingUserRoles.some((role: any) => role.role_id === "REQ_HEAD"), // Assuming "REQ_HEAD" is the role_id for 'req_head' role
            is_lab_off: newExistingUserRoles.some((role: any) => role.role_id === "LAB_OFF"), // Assuming "LAB_OFF" is the role_id for 'lab_off' role
            is_lab_lead: newExistingUserRoles.some((role: any) => role.role_id === "LAB_LEAD"), // Assuming "LAB_LEAD" is the role_id for 'lab_lead' role
            is_lab_head: newExistingUserRoles.some((role: any) => role.role_id === "LAB_HEAD"), // Assuming "LAB_HEAD" is the role_id for 'lab_head' role
            is_lab_admin: newExistingUserRoles.some((role: any) => role.role_id === "LAB_ADMIN"), // Assuming "LAB_ADMIN" is the role_id for 'lab_admin' role
            is_qc: newExistingUserRoles.some((role: any) => role.role_id === "QC"), // Assuming "QC" is the role_id for 'qc' role
            is_it: newExistingUserRoles.some((role: any) => role.role_id === "IT"), // Assuming "IT" is the role_id for 'it' role
          };
        }
      } catch (err) {
        console.error('❌ Error in upsert_user_api for user:', user_data, err);
        throw err;
      }
    }
  });
  console.log('✅ User API seeding complete!');
}

async function create_request() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  if (users.length === 0) {
    console.error('No users found. Please seed users first.');
    return;
  }
  const randomUser = users[randomInt(0, users.length - 1)];
  // Create 20 `request` records
  for (let i = 1; i <= 20; i++) {
    await prisma.request.create({
      data: {
        request_number: `REQ-${i.toString().padStart(4, '0')}`,
        lab_site_id: "AY",
        request_type_id: "REQUEST",
        requester_id: randomUser.id,
        request_date: randomDate(new Date(2023, 0, 1), new Date()),
        due_date: randomDate(new Date(), new Date(2026, 0, 1)),
        telephone: `08${randomInt(10000000, 99999999)}`,
        status_request_id: "REVIEW",
        status_sample_id: "TESTING",
        review_role_id: "LAB_LEAD",
        created_by: randomInt(1, 10),
        updated_by: randomInt(1, 10),
      },
    });
  }
}

async function create_request_detail() {

  const request = await prisma.request.findMany({
    select: { id: true },
  });

  const randomRequest = request[randomInt(0, request.length - 1)];
  // Create 20 `request_detail` records

  for (let i = 1; i <= 20; i++) {
    await prisma.request_detail.create({
      data: {
        request_id: randomRequest.id, // assumes request_id between 1–20 exists
        note: `Sample note ${i}`,
        received_date: randomDate(new Date(2023, 0, 1), new Date()),
        lab_note: `Lab note ${i}`,
        created_by: randomInt(1, 10),
        updated_by: randomInt(1, 10),
      },
    });
  }
}

async function create_request_sample_item() {
  // Get existing request_sample IDs and unit IDs to reference
  const requestSamples = await prisma.request_sample.findMany({
    select: { id: true },
  });

  const units = await prisma.unit.findMany({
    select: { id: true },
  });

  const statusSampleItems = await prisma.status_sample.findMany({
    select: { id: true },
  });

  if (requestSamples.length === 0) {
    console.error('No request_sample records found. Please seed request_sample first.');
    return;
  }

  if (units.length === 0) {
    console.error('No unit records found. Please seed units first.');
    return;
  }

  // Create 20 request_sample_item records
  for (let i = 1; i <= 20; i++) {
    const randomRequestSample = requestSamples[randomInt(0, requestSamples.length - 1)];
    const randomUnit = units[randomInt(0, units.length - 1)];
    const randomStatus = statusSampleItems.length > 0 
      ? statusSampleItems[randomInt(0, statusSampleItems.length - 1)] 
      : null;

    await prisma.request_sample_item.create({
      data: {
        request_sample_id: randomRequestSample.id,  
        seq: i, // Sequential number
        quantity: randomInt(1, 20), // Random quantity between 1-100
        unit_id: randomUnit.id,
        time:  randomInt(1, 24).toString(), // Random time between 1-24 hours
        created_on: new Date(),
        created_by: randomInt(1, 10),
        updated_on: new Date(),
        updated_by: randomInt(1, 10),
      },
    });
  }

  console.log('✅ request_sample_item seeding complete!');
}



/* ---------- main runner ---------- */

async function main() {
  await clearOldData();
  await seedLabProcess();
  // await seedSampleStage();
  await seedSampleRetaining();
  await seedLabSite();
  await seedRequestType();
  await seedState();
  await seedStatusRequest();
  await seedStatusSample();
  await seedStatusRetain();
  await seedStatusEquipment();
  await seedSampleType();
  await seedLabTest();
  await seedCategoryChemical();
  await seedSampleCondition();
  await seedTestReportFormat();
  await seedAccredited();
  await seedSpecType();
  await seedActivityRequest();
  await seedActivityEquipment();
  await seedRole();
  await seedUserLocation();
  await seedSampleDescription();
  await seedReportHeading();
  await seedObjectiveFromNew();
  await seedSampleStateFromNew();
  await seedLineFromNew();
  await seedUnitFromNew();
  await seedChemicalParameterFromNew();
  await seedMicrobiologyParameterFromNew();
  await seedMaterialFromNew();
  await seedMaterialChemicalParameterFromNew();
  await seedMaterialMicrobiologyParameterFromNew();
  await seedEditCategoryFromNew();
  await seedLocationFromNew();
  await seedSectionFromNew();
  await seedBoxFromNew();
  await seedManufacturerFromBrand();
  await seedEquipmentTypeFromNew();
  await seedLocationEmailFromEquipmentDueDate();
  await create_user();
  await create_request();
  await create_request_detail();
  await create_request_sample();
  await create_stock_retain();
  await create_stock_retain_item();
  await create_request_sample_item();
  await upsert_user_api();


  console.log('✅ All data seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
