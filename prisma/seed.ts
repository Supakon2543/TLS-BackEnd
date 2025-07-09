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
  // Keep the clear function as is for initial cleanup
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
  await prisma.manufacturer.deleteMany();
  await prisma.equipment_type.deleteMany();
  await prisma.location_email.deleteMany();
  await prisma.request.deleteMany();
  await prisma.request_detail.deleteMany();
  await prisma.request_sample.deleteMany();
  await prisma.stock_retain.deleteMany();
  await prisma.stock_retain_item.deleteMany();
  await prisma.request_sample_item.deleteMany();

  console.log('🧹 Old data deleted');
}

/* ---------- createOrUpdate functions ---------- */

async function seedLabProcess() {
  const rows = readExcel<CommonRow>('lab_process.xlsx');

  for (const r of rows) {
    await prisma.lab_process.upsert({
      where: { id: r.order },
      update: {
        order: Number(r.order),
        text_input: toBool(r.text_input),
        status: toBool(r.status),
        updated_by: Number(r.updated_by),
      },
      create: {
        id: r.order,
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
    await prisma.sample_stage.upsert({
      where: { id: r.order },
      update: {
        order: Number(r.order),
        text_input: toBool(r.text_input),
        status: toBool(r.status),
        updated_by: Number(r.updated_by),
      },
      create: {
        id: r.order,
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
    await prisma.sample_retaining.upsert({
      where: { id: r.order },
      update: {
        order: Number(r.order),
        text_input: toBool(r.text_input),
        status: toBool(r.status),
        updated_by: r.updated_by ? Number(r.updated_by) : null,
      },
      create: {
        id: r.order,
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
    await prisma.lab_site.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.request_type.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.state.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.status_request.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        state_id: r.state_id,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.status_sample.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.status_retain.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.status_equipment.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.sample_type.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.lab_test.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.category_chemical.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.sample_condition.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.test_report_format.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.accredited.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.spec_type.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.activity_request.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.activity_equipment.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.role.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.user_location.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        lab_site_id: r.lab_site_id,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.sample_description.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
    await prisma.report_heading.upsert({
      where: { id: r.id },
      update: {
        order: Number(r.order),
        name: r.name,
        status: toBool(r.status),
      },
      create: {
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
      // ✅ Skip rows without required data
      if (!r.order || r.order === null) {
        console.warn('⚠️ Skipping row with missing order:', r);
        continue;
      }

      // Find existing objective by name
      const existingObjective = await prisma.objective.findFirst({
        where: { name: r.name },
      });

      if (existingObjective) {
        // Update existing record
        await prisma.objective.update({
          where: { id: existingObjective.id },
          data: {
            order: Number(r.order),
            name: r.name,
            text_input: toBool(r.text_input),
            status: toBool(r.status),
            updated_by: r.updated_by ? Number(r.updated_by) : 0,
          },
        });
        console.log(`✅ Updated objective: ${r.name}`);
      } else {
        // Create new record
        await prisma.objective.create({
          data: {
            order: Number(r.order),
            name: r.name,
            text_input: toBool(r.text_input),
            status: toBool(r.status),
            created_by: r.created_by ? Number(r.created_by) : 0,
            updated_by: r.updated_by ? Number(r.updated_by) : 0,
          },
        });
        console.log(`✅ Created objective: ${r.name}`);
      }
    } catch (e) {
      console.error('❌ Failed to process objective:', r, e.message);
    }
  }
  console.log('✅ Objective (from 001 - Objective.xlsx) seeded');
}

async function createOrUpdateStockRetain() {
  for (let i = 1; i <= 20; i++) {
    await prisma.stock_retain.upsert({
      where: { id: i },
      update: {
        request_sample_id: i,
        location_id: 1,
        section_id: 1,
        box_id: 1,
        status_retain_id: 'SR01',
        updated_on: new Date(),
        updated_by: 1,
      },
      create: {
        request_sample_id: i,
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
  console.log('✅ stock_retain seeded');
}

async function createOrUpdateStockRetainItem() {
  for (let i = 1; i <= 20; i++) {
    await prisma.stock_retain_item.upsert({
      where: { id: i },
      update: {
        stock_retain_id: i,
        sample_item_id: i,
        status_retain_id: 'SR01',
        approve_role_id: 'ROLE01',
        plan_return_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        return_date: null,
        updated_on: new Date(),
        updated_by: 1,
      },
      create: {
        stock_retain_id: i,
        sample_item_id: i,
        status_retain_id: 'SR01',
        approve_role_id: 'ROLE01',
        plan_return_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        return_date: null,
        created_on: new Date(),
        created_by: 1,
        updated_on: new Date(),
        updated_by: 1,
      },
    });
  }
  console.log('✅ stock_retain_item seeded');
}

async function seedLineFromNew() {
  const fileName = 'line.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const r of rows) {
    try {
      // ✅ Skip rows without required data
      if (!r.code || !r.name) {
        console.warn('⚠️ Skipping row with missing code or name:', r);
        skipped++;
        continue;
      }

      // Find existing line by code
      const existingLine = await prisma.line.findFirst({
        where: { code: r.code },
      });

      if (existingLine) {
        // Update existing record
        await prisma.line.update({
          where: { id: existingLine.id },
          data: {
            name: r.name,
            status: toBool(r.status),
            updated_by: r.updated_by ? Number(r.updated_by) : 0,
          },
        });
        updated++;
      } else {
        // Create new record
        await prisma.line.create({
          data: {
            code: r.code,
            name: r.name,
            status: toBool(r.status),
            created_by: r.created_by ? Number(r.created_by) : 0,
            updated_by: r.updated_by ? Number(r.updated_by) : 0,
          },
        });
        created++;
      }
    } catch (e) {
      console.error('❌ Failed to process line:', r, e.message);
      skipped++;
    }
  }

  console.log(`✅ Lines seeded: ${created} created, ${updated} updated, ${skipped} skipped`);
}

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
      await prisma.unit.upsert({
        where: { id: r.id },
        update: {
          order: Number(r.order),
          status: toBool(r.status),
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          is_sample: toBool(r.is_sample),
          is_chemical: toBool(r.is_chemical),
          is_microbiology: toBool(r.is_microbiology),
          is_chemical_stock: toBool(r.is_chemical_stock),
        },
        create: {
          order: Number(r.order),
          name: r.name,
          status: toBool(r.status),
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
          is_sample: toBool(r.is_sample),
          is_chemical: toBool(r.is_chemical),
          is_microbiology: toBool(r.is_microbiology),
          is_chemical_stock: toBool(r.is_chemical_stock),
        },
      });
    } catch (e) {
      console.error('❌ Failed to upsert unit:', r, e.message);
    }
  }
  console.log('✅ unit (from unit.xlsx) seeded');
}

// Continue with the rest of the functions following the same pattern...
// I'll provide a few more examples and then you can apply the same pattern to all remaining functions:

async function seedChemicalParameterFromNew() {
  const fileName = 'chemical_parameter.xlsx';
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json<any>(wb.Sheets[sheet], {
    defval: null,
  });

  for (const r of rows) {
    // Resolve foreign keys
    let unitId: number | undefined;
    if (r.unit_id != null && r.unit_id !== '') {
      const unit = await prisma.unit.findFirst({
        where: { name: r.unit_id },
        select: { id: true },
      });
      unitId = unit ? unit.id : undefined;
    }

    let sampleTypeId: string | undefined;
    if (r.sample_type_id != null && r.sample_type_id !== '') {
      const sampleType = await prisma.sample_type.findFirst({
        where: { name: r.sample_type_id },
        select: { id: true },
      });
      sampleTypeId = sampleType ? sampleType.id : undefined;
    }

    let specTypeId: string | undefined;
    if (r.spec_type_id != null && r.spec_type_id !== '') {
      const specType = await prisma.spec_type.findFirst({
        where: { name: r.spec_type_id },
        select: { id: true },
      });
      specTypeId = specType ? specType.id : undefined;
    }

    try {
      await prisma.chemical_parameter.upsert({
        where: { id: r.id },
        update: {
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
          is_enter_spec_min: toBool(r.is_enter_spec_min),
          is_enter_spec_max: toBool(r.is_enter_spec_max),
          is_enter_warning_min: toBool(r.is_enter_warning_min),
          is_enter_warning_max: toBool(r.is_enter_warning_max),
          status: toBool(r.status),
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
        create: {
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
          is_enter_spec_min: toBool(r.is_enter_spec_min),
          is_enter_spec_max: toBool(r.is_enter_spec_max),
          is_enter_warning_min: toBool(r.is_enter_warning_min),
          is_enter_warning_max: toBool(r.is_enter_warning_max),
          status: toBool(r.status),
          created_by: r.created_by ? Number(r.created_by) : 0,
          updated_by: r.updated_by ? Number(r.updated_by) : 0,
        },
      });
    } catch (e) {
      console.error('❌ Failed to upsert chemical_parameter:', r, e.message);
    }
  }
  console.log('✅ chemical_parameter (from chemical parameter.xlsx) seeded');
}

// Helper functions for mock data generation
function randomString(length: number) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
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

async function createOrUpdateUser() {
  for (let i = 1; i <= 20; i++) {
    const username = `user${i}`;
    const employeeId = `EMP${i.toString().padStart(4, '0')}`;

    await prisma.user.upsert({
      where: { username },
      update: {
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
      create: {
        employee_id: employeeId,
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
  console.log('✅ User seeded');
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

async function createOrUpdateRequest() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  if (users.length === 0) {
    console.error('No users found. Please seed users first.');
    return;
  }

  for (let i = 1; i <= 20; i++) {
    const randomUser = users[randomInt(0, users.length - 1)];
    const requestNumber = `REQ-${i.toString().padStart(4, '0')}`;

    await prisma.request.upsert({
      where: { id: i },
      update: {
        lab_site_id: 'AY',
        request_type_id: 'REQUEST',
        requester_id: randomUser.id,
        request_date: randomDate(new Date(2023, 0, 1), new Date()),
        due_date: randomDate(new Date(), new Date(2026, 0, 1)),
        telephone: `08${randomInt(10000000, 99999999)}`,
        status_request_id: 'REVIEW',
        status_sample_id: 'TESTING',
        review_role_id: 'LAB_LEAD',
        updated_by: randomInt(1, 10),
      },
      create: {
        request_number: requestNumber,
        lab_site_id: 'AY',
        request_type_id: 'REQUEST',
        requester_id: randomUser.id,
        request_date: randomDate(new Date(2023, 0, 1), new Date()),
        due_date: randomDate(new Date(), new Date(2026, 0, 1)),
        telephone: `08${randomInt(10000000, 99999999)}`,
        status_request_id: 'REVIEW',
        status_sample_id: 'TESTING',
        review_role_id: 'LAB_LEAD',
        created_by: randomInt(1, 10),
        updated_by: randomInt(1, 10),
      },
    });
  }
  console.log('✅ Request seeded');
}

/* ---------- main runner ---------- */

async function main() {
  // Comment out clearOldData if you want to preserve existing data
  // await clearOldData();

  await seedLabProcess();
  await seedSampleStage();
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
  await seedLineFromNew();
  await upsert_user_api();
  // await seedUnitFromNew();
  // await seedChemicalParameterFromNew();
  // await createOrUpdateUser();
  // await createOrUpdateRequest();
  // await createOrUpdateStockRetain();
  // await createOrUpdateStockRetainItem();

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
