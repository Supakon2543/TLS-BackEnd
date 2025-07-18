/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { create } from 'domain';
import axios from 'axios';
import { UnauthorizedException } from '@nestjs/common';
import { UserData } from '../src/user_data/user_data.service';
import { UserRoleService } from '../src/user_role/user_role.service';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaClient();
const prismaService: PrismaService = new PrismaService();
const userRoleService: UserRoleService = new UserRoleService(prismaService);
const userService: UsersService = new UsersService(prismaService);
const userDataService = new UserData(prismaService, userService, userRoleService);

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
        where: { id: r.id ?? -1},
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
          // id: r.id,
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
  const user_list: any[] = []; //
  const header_token = await axios.post(`${process.env.SECURITYCONTROLBASEURL}/oauth2/token`, {
    client_id: process.env.OAUTH2_CLIENT_ID,
    client_secret: process.env.OAUTH2_CLIENT_SECRET,
    grant_type: process.env.OAUTH2_GRANT_TYPE
  });
  const header_token_workday = await axios.post(`${process.env.WORKDAYBASEURL}`, {
    client_id: process.env.OAUTH2_CLIENT_ID_WORKDAY,
    client_secret: process.env.OAUTH2_CLIENT_SECRET_WORKDAY,
    grant_type: process.env.OAUTH2_GRANT_TYPE_WORKDAY
  });
  console.log('header_token', header_token.data.access_token);
  console.log('header_token_workday', header_token_workday.data.access_token);

  // Fetch all users by role (API calls, not DB, so outside transaction)
  for (const role of role_list) { //
    const user = await axios.post(`${process.env.SECURITYCONTROLBASEURL}/api/userlist_by_role`, {
      roles: role,
    }, {
      headers: {
        Authorization: `Bearer ${header_token.data.access_token}`,
      },
    });
    console.log('user: ', user.data.data);
    for (const userData of user.data.data) {
      user_list.push(userData);
    }
  }
  console.log('user_list: ', user_list);

  // All DB operations inside a transaction for rollback safety
  // await prisma.$transaction(async (tx) => {
  for (const user_data of user_list) {
    console.log('user_data: ', user_data);
    await userDataService.generateUserData(user_data, header_token, header_token_workday);
  }
  // });
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

// Add this function with the other seed functions
// Add this function with the other seed functions
async function seedRequestSampleLabel() {
  console.log('🌱 Seeding request sample label data...');

  try {
    // Get existing units from database
    const existingUnits = await prisma.unit.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    // Get existing chemical parameters from database
    const existingChemicalParams = await prisma.chemical_parameter.findMany({
      where: { status: true },
      select: { id: true, name: true, name_abb: true, unit_id: true },
      orderBy: { order: 'asc' },
      take: 5, // Take first 5 for testing
    });

    // Get existing microbiology parameters from database
    const existingMicrobiologyParams = await prisma.microbiology_parameter.findMany({
      where: { status: true },
      select: { id: true, name: true, name_abb: true, unit_id: true },
      orderBy: { order: 'asc' },
      take: 3, // Take first 3 for testing
    });

    // Get existing lab_test from database
    const existingLabTest = await prisma.lab_test.findFirst({
      where: { status: true },
      select: { id: true, name: true },
    });

    // Get existing request_type from database
    const existingRequestTypes = await prisma.request_type.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    // ✅ Get existing status_request from database
    const existingStatusRequest = await prisma.status_request.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    // ✅ Get existing status_sample from database
    const existingStatusSample = await prisma.status_sample.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    // ✅ Get existing role from database
    const existingRoles = await prisma.role.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    // ✅ Get existing lab_site from database
    const existingLabSites = await prisma.lab_site.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    // ✅ Get existing activity_request from database
    const existingActivityRequest = await prisma.activity_request.findMany({
      where: { status: true },
      select: { id: true, name: true },
    });

    if (existingChemicalParams.length === 0 || existingMicrobiologyParams.length === 0) {
      console.log('⚠️ No existing parameters found. Please seed chemical_parameter and microbiology_parameter first.');
      return;
    }

    if (!existingLabTest) {
      console.log('⚠️ No existing lab_test found. Please seed lab_test first.');
      return;
    }

    if (existingStatusRequest.length === 0) {
      console.log('⚠️ No existing status_request found. Please seed status_request first.');
      return;
    }

    // Create requests with different types using existing data
    const requests = [
      { 
        id: 1, 
        request_number: 'REQ-001', 
        request_type_id: existingRequestTypes.find(rt => rt.id === 'REQUEST')?.id || existingRequestTypes[0]?.id || 'REQUEST',
        lab_site_id: existingLabSites.find(ls => ls.id === 'AY')?.id || existingLabSites[0]?.id || 'AY',
        status_request_id: existingStatusRequest.find(sr => sr.id === 'APPROVED')?.id || existingStatusRequest[0]?.id
      },
      { 
        id: 2, 
        request_number: 'REQ-002', 
        request_type_id: existingRequestTypes.find(rt => rt.id === 'STANDARD')?.id || existingRequestTypes[0]?.id || 'STANDARD',
        lab_site_id: existingLabSites.find(ls => ls.id === 'HM')?.id || existingLabSites[0]?.id || 'HM',
        status_request_id: existingStatusRequest.find(sr => sr.id === 'APPROVED')?.id || existingStatusRequest[0]?.id
      },
      { 
        id: 3, 
        request_number: 'REQ-003', 
        request_type_id: existingRequestTypes.find(rt => rt.id === 'URGENT')?.id || existingRequestTypes[0]?.id || 'URGENT',
        lab_site_id: existingLabSites.find(ls => ls.id === 'AY')?.id || existingLabSites[0]?.id || 'AY',
        status_request_id: existingStatusRequest.find(sr => sr.id === 'APPROVED')?.id || existingStatusRequest[0]?.id
      },
    ];

    for (const req of requests) {
      await prisma.request.upsert({
        where: { id: req.id },
        update: {
          request_number: req.request_number,
          request_type_id: req.request_type_id,
          lab_site_id: req.lab_site_id,
          status_request_id: req.status_request_id,
          requester_id: 1,
          request_date: new Date('2025-01-17'),
          due_date: new Date('2025-01-24'),
          telephone: '081234567890',
          status_sample_id: existingStatusSample.find(ss => ss.id === 'TESTING')?.id || existingStatusSample[0]?.id || 'TESTING',
          review_role_id: existingRoles.find(r => r.id === 'LAB_LEAD')?.id || existingRoles[0]?.id || 'LAB_LEAD',
          updated_by: 1,
        },
        create: {
          id: req.id,
          request_number: req.request_number,
          request_type_id: req.request_type_id,
          lab_site_id: req.lab_site_id,
          status_request_id: req.status_request_id,
          requester_id: 1,
          request_date: new Date('2025-01-17'),
          due_date: new Date('2025-01-24'),
          telephone: '081234567890',
          status_sample_id: existingStatusSample.find(ss => ss.id === 'TESTING')?.id || existingStatusSample[0]?.id || 'TESTING',
          review_role_id: existingRoles.find(r => r.id === 'LAB_LEAD')?.id || existingRoles[0]?.id || 'LAB_LEAD',
          created_by: 1,
          updated_by: 1,
        },
      });
    }

    // Create request_log entries
    const requestLogs = [
      { id: 1, request_id: 1, timestamp: new Date('2025-01-17T10:30:00Z'), user_id: 1 },
      { id: 2, request_id: 2, timestamp: new Date('2025-01-17T14:00:00Z'), user_id: 1 },
      { id: 3, request_id: 3, timestamp: new Date('2025-01-17T16:30:00Z'), user_id: 1 },
    ];

    for (const log of requestLogs) {
      await prisma.request_log.upsert({
        where: { id: log.id },
        update: {
          request_id: log.request_id,
          timestamp: log.timestamp,
          status_request_id: existingStatusRequest[0]?.id || 'PENDING',
          activity_request_id: existingActivityRequest[0]?.id || 'REQUEST_CREATED',
          user_id: log.user_id,
        },
        create: {
          request_id: log.request_id,
          timestamp: log.timestamp,
          status_request_id: existingStatusRequest[0]?.id || 'PENDING',
          activity_request_id: existingActivityRequest[0]?.id || 'REQUEST_CREATED',
          user_id: log.user_id,
        },
      });
    }

    // Create request_sample entries
    const requestSamples = [
      { id: 1, sample_code: 'SAMPLE001', sample_name: 'Water Sample A', material_code: 'MAT001', batch_no: 'BATCH001', request_id: 1 },
      { id: 2, sample_code: 'SAMPLE002', sample_name: 'Water Sample B', material_code: 'MAT002', batch_no: 'BATCH002', request_id: 2 },
      { id: 3, sample_code: 'SAMPLE003', sample_name: 'Water Sample C', material_code: 'MAT003', batch_no: 'BATCH003', request_id: 3 },
    ];

    for (const sample of requestSamples) {
      await prisma.request_sample.upsert({
        where: { id: sample.id },
        update: {
          sample_code: sample.sample_code,
          sample_name: sample.sample_name,
          material_code: sample.material_code,
          batch_no: sample.batch_no,
          request_id: sample.request_id,
          updated_by: 1,
        },
        create: {
          id: sample.id,
          sample_code: sample.sample_code,
          sample_name: sample.sample_name,
          material_code: sample.material_code,
          batch_no: sample.batch_no,
          request_id: sample.request_id,
          created_by: 1,
          updated_by: 1,
        },
      });
    }

    // Create request_sample_item entries using existing lab_test
    const requestSampleItems = [
      { id: 1, request_sample_id: 1, lab_test_id: existingLabTest.id, time: '10:30:00', seq: 1 },
      { id: 2, request_sample_id: 1, lab_test_id: existingLabTest.id, time: '11:00:00', seq: 2 },
      { id: 3, request_sample_id: 1, lab_test_id: existingLabTest.id, time: '11:30:00', seq: 3 },
      { id: 4, request_sample_id: 2, lab_test_id: existingLabTest.id, time: '14:00:00', seq: 1 },
      { id: 5, request_sample_id: 3, lab_test_id: existingLabTest.id, time: '16:30:00', seq: 1 },
    ];

    for (const item of requestSampleItems) {
      await prisma.request_sample_item.upsert({
        where: { id: item.id },
        update: {
          request_sample_id: item.request_sample_id,
          lab_test_id: item.lab_test_id,
          time: item.time,
          seq: item.seq,
          updated_by: 1,
        },
        create: {
          id: item.id,
          request_sample_id: item.request_sample_id,
          lab_test_id: item.lab_test_id,
          time: item.time,
          seq: item.seq,
          created_by: 1,
          updated_by: 1,
        },
      });
    }

    // Create request_sample_chemical using existing chemical parameters
    // Only for sample_id 1 (request_type = 'REQUEST' to test the 'request' condition)
    const requestSampleChemical = existingChemicalParams.slice(0, 3).map((param, index) => ({
      id: index + 1,
      request_sample_id: 1,
      chemical_parameter_id: param.id,
      status: true,
    }));

    for (const chemical of requestSampleChemical) {
      await prisma.request_sample_chemical.upsert({
        where: { id: chemical.id },
        update: {
          request_sample_id: chemical.request_sample_id,
          chemical_parameter_id: chemical.chemical_parameter_id,
          created_by: 1,
        },
        create: {
          id: chemical.id,
          request_sample_id: chemical.request_sample_id,
          chemical_parameter_id: chemical.chemical_parameter_id,
          created_by: 1,
        },
      });
    }

    // Create request_sample_microbiology using existing microbiology parameters
    // Only for sample_id 1 (request_type = 'REQUEST' to test the 'request' condition)
    const requestSampleMicrobiology = existingMicrobiologyParams.slice(0, 2).map((param, index) => ({
      id: index + 1,
      request_sample_id: 1,
      microbiology_parameter_id: param.id,
      status: true,
    }));

    for (const microbiology of requestSampleMicrobiology) {
      await prisma.request_sample_microbiology.upsert({
        where: { id: microbiology.id },
        update: {
          request_sample_id: microbiology.request_sample_id,
          microbiology_parameter_id: microbiology.microbiology_parameter_id,
          created_by: 1,
        },
        create: {
          id: microbiology.id,
          request_sample_id: microbiology.request_sample_id,
          microbiology_parameter_id: microbiology.microbiology_parameter_id,
          created_by: 1,
        },
      });
    }

    console.log('✅ request_sample_label seeded using existing data');
    console.log(`   - Used ${existingChemicalParams.length} existing chemical parameters`);
    console.log(`   - Used ${existingMicrobiologyParams.length} existing microbiology parameters`);
    console.log(`   - Used existing lab_test: ${existingLabTest.name}`);
    console.log(`   - Used existing status_request: ${existingStatusRequest.length} found`);
    console.log(`   - Created 3 test samples with different request types`);

  } catch (error) {
    console.error('❌ Error seeding request_sample_label:', error);
  }
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
  // await seedRequestSampleLabel();
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
