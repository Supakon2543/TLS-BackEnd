/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as path from 'path';
import axios from 'axios';
import { UserData } from '../src/user_data/user_data.service';
import { UserRoleService } from '../src/user_role/user_role.service';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaClient();
const prismaService: PrismaService = new PrismaService();
const userRoleService: UserRoleService = new UserRoleService(prismaService);
const userService: UsersService = new UsersService(prismaService);
const userDataService = new UserData(
  prismaService,
  userService,
  userRoleService,
);

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

  console.log(
    `✅ Lines seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedUnitFromNew() {
  const fileName = 'Unit.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // ✅ Find existing unit by name first
      let existingUnit = await prisma.unit.findFirst({
        where: { name: r.name },
      });

      // Common data object
      const unitData = {
        order: r.order ? Number(r.order) : 0,
        name: r.name,
        is_sample: toBool(r.is_sample),
        is_chemical: toBool(r.is_chemical),
        is_microbiology: toBool(r.is_microbiology),
        is_chemical_stock: toBool(r.is_chemical_stock),
        status: toBool(r.status),
        updated_by: r.updated_by ? Number(r.updated_by) : 0,
      };

      if (existingUnit) {
        // ✅ Update existing record
        await prisma.unit.update({
          where: { id: existingUnit.id },
          data: unitData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name}`);
      } else {
        // ✅ Create new record
        await prisma.unit.create({
          data: {
            ...unitData,
            created_by: r.created_by ? Number(r.created_by) : 0,
          },
        });
        created++;
        console.log(`✅ Created: ${r.name}`);
      }
    } catch (e) {
      console.error('❌ Failed to process unit:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ unit seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

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
        where: { id: r.id ?? -1 },
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
    'TLS-Requester',
    'TLS-QC',
    'TLS-Lab-Lead',
    'TLS-Lab-Admin',
    'TLS-Lab',
    'TLS-ITSupport',
    'TLS-Head-Requester',
    'TLS-Head-Lab',
  ];
  const user_list: any[] = []; //
  const header_token = await axios.post(
    `${process.env.SECURITYCONTROLBASEURL}/oauth2/token`,
    {
      client_id: process.env.OAUTH2_CLIENT_ID,
      client_secret: process.env.OAUTH2_CLIENT_SECRET,
      grant_type: process.env.OAUTH2_GRANT_TYPE,
    },
  );
  const header_token_workday = await axios.post(
    `${process.env.WORKDAYBASEURL}`,
    {
      client_id: process.env.OAUTH2_CLIENT_ID_WORKDAY,
      client_secret: process.env.OAUTH2_CLIENT_SECRET_WORKDAY,
      grant_type: process.env.OAUTH2_GRANT_TYPE_WORKDAY,
    },
  );
  console.log('header_token', header_token.data.access_token);
  console.log('header_token_workday', header_token_workday.data.access_token);

  // Fetch all users by role (API calls, not DB, so outside transaction)
  for (const role of role_list) {
    //
    const user = await axios.post(
      `${process.env.SECURITYCONTROLBASEURL}/api/userlist_by_role`,
      {
        roles: role,
      },
      {
        headers: {
          Authorization: `Bearer ${header_token.data.access_token}`,
        },
      },
    );
    console.log('user: ', user.data.data);
    for (const userData of user.data.data) {
      user_list.push(userData);
    }
  }
  console.log('user_list: ', user_list);

  // All DB operations inside a transaction for rollback safety
  // await prisma.$transaction(async (tx) => {
  // for (const user_data of user_list) {
  //   console.log('user_data: ', user_data);
  //   await userDataService.generateUserData(
  //     user_data,
  //     header_token,
  //     header_token_workday,
  //   );
  // }
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
    const existingMicrobiologyParams =
      await prisma.microbiology_parameter.findMany({
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

    if (
      existingChemicalParams.length === 0 ||
      existingMicrobiologyParams.length === 0
    ) {
      console.log(
        '⚠️ No existing parameters found. Please seed chemical_parameter and microbiology_parameter first.',
      );
      return;
    }

    if (!existingLabTest) {
      console.log('⚠️ No existing lab_test found. Please seed lab_test first.');
      return;
    }

    if (existingStatusRequest.length === 0) {
      console.log(
        '⚠️ No existing status_request found. Please seed status_request first.',
      );
      return;
    }

    // Create requests with different types using existing data
    const requests = [
      {
        id: 1,
        request_number: 'REQ-001',
        request_type_id:
          existingRequestTypes.find((rt) => rt.id === 'REQUEST')?.id ||
          existingRequestTypes[0]?.id ||
          'REQUEST',
        lab_site_id:
          existingLabSites.find((ls) => ls.id === 'AY')?.id ||
          existingLabSites[0]?.id ||
          'AY',
        status_request_id:
          existingStatusRequest.find((sr) => sr.id === 'APPROVED')?.id ||
          existingStatusRequest[0]?.id,
      },
      {
        id: 2,
        request_number: 'REQ-002',
        request_type_id:
          existingRequestTypes.find((rt) => rt.id === 'STANDARD')?.id ||
          existingRequestTypes[0]?.id ||
          'STANDARD',
        lab_site_id:
          existingLabSites.find((ls) => ls.id === 'HM')?.id ||
          existingLabSites[0]?.id ||
          'HM',
        status_request_id:
          existingStatusRequest.find((sr) => sr.id === 'APPROVED')?.id ||
          existingStatusRequest[0]?.id,
      },
      {
        id: 3,
        request_number: 'REQ-003',
        request_type_id:
          existingRequestTypes.find((rt) => rt.id === 'URGENT')?.id ||
          existingRequestTypes[0]?.id ||
          'URGENT',
        lab_site_id:
          existingLabSites.find((ls) => ls.id === 'AY')?.id ||
          existingLabSites[0]?.id ||
          'AY',
        status_request_id:
          existingStatusRequest.find((sr) => sr.id === 'APPROVED')?.id ||
          existingStatusRequest[0]?.id,
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
          status_sample_id:
            existingStatusSample.find((ss) => ss.id === 'TESTING')?.id ||
            existingStatusSample[0]?.id ||
            'TESTING',
          review_role_id:
            existingRoles.find((r) => r.id === 'LAB_LEAD')?.id ||
            existingRoles[0]?.id ||
            'LAB_LEAD',
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
          status_sample_id:
            existingStatusSample.find((ss) => ss.id === 'TESTING')?.id ||
            existingStatusSample[0]?.id ||
            'TESTING',
          review_role_id:
            existingRoles.find((r) => r.id === 'LAB_LEAD')?.id ||
            existingRoles[0]?.id ||
            'LAB_LEAD',
          created_by: 1,
          updated_by: 1,
        },
      });
    }

    // Create request_log entries
    const requestLogs = [
      {
        id: 1,
        request_id: 1,
        timestamp: new Date('2025-01-17T10:30:00Z'),
        user_id: 1,
      },
      {
        id: 2,
        request_id: 2,
        timestamp: new Date('2025-01-17T14:00:00Z'),
        user_id: 1,
      },
      {
        id: 3,
        request_id: 3,
        timestamp: new Date('2025-01-17T16:30:00Z'),
        user_id: 1,
      },
    ];

    for (const log of requestLogs) {
      await prisma.request_log.upsert({
        where: { id: log.id },
        update: {
          request_id: log.request_id,
          timestamp: log.timestamp,
          status_request_id: existingStatusRequest[0]?.id || 'PENDING',
          activity_request_id:
            existingActivityRequest[0]?.id || 'REQUEST_CREATED',
          user_id: log.user_id,
        },
        create: {
          request_id: log.request_id,
          timestamp: log.timestamp,
          status_request_id: existingStatusRequest[0]?.id || 'PENDING',
          activity_request_id:
            existingActivityRequest[0]?.id || 'REQUEST_CREATED',
          user_id: log.user_id,
        },
      });
    }

    // Create request_sample entries
    const requestSamples = [
      {
        id: 1,
        sample_code: 'SAMPLE001',
        sample_name: 'Water Sample A',
        material_code: 'MAT001',
        batch_no: 'BATCH001',
        request_id: 1,
      },
      {
        id: 2,
        sample_code: 'SAMPLE002',
        sample_name: 'Water Sample B',
        material_code: 'MAT002',
        batch_no: 'BATCH002',
        request_id: 2,
      },
      {
        id: 3,
        sample_code: 'SAMPLE003',
        sample_name: 'Water Sample C',
        material_code: 'MAT003',
        batch_no: 'BATCH003',
        request_id: 3,
      },
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
      {
        id: 1,
        request_sample_id: 1,
        lab_test_id: existingLabTest.id,
        time: '10:30:00',
        seq: 1,
      },
      {
        id: 2,
        request_sample_id: 1,
        lab_test_id: existingLabTest.id,
        time: '11:00:00',
        seq: 2,
      },
      {
        id: 3,
        request_sample_id: 1,
        lab_test_id: existingLabTest.id,
        time: '11:30:00',
        seq: 3,
      },
      {
        id: 4,
        request_sample_id: 2,
        lab_test_id: existingLabTest.id,
        time: '14:00:00',
        seq: 1,
      },
      {
        id: 5,
        request_sample_id: 3,
        lab_test_id: existingLabTest.id,
        time: '16:30:00',
        seq: 1,
      },
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
    const requestSampleChemical = existingChemicalParams
      .slice(0, 3)
      .map((param, index) => ({
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
    const requestSampleMicrobiology = existingMicrobiologyParams
      .slice(0, 2)
      .map((param, index) => ({
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
    console.log(
      `   - Used ${existingChemicalParams.length} existing chemical parameters`,
    );
    console.log(
      `   - Used ${existingMicrobiologyParams.length} existing microbiology parameters`,
    );
    console.log(`   - Used existing lab_test: ${existingLabTest.name}`);
    console.log(
      `   - Used existing status_request: ${existingStatusRequest.length} found`,
    );
    console.log(`   - Created 3 test samples with different request types`);
  } catch (error) {
    console.error('❌ Error seeding request_sample_label:', error);
  }
}

async function seedMicrobiologyParameterFromNew() {
  const fileName = 'Microbiology_Parameter.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

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

      // Check if record exists by name first, then by name_abb if name doesn't exist
      let existingParameter = await prisma.microbiology_parameter.findFirst({
        where: { name: r.name },
      });

      // If not found by name, try to find by name_abb
      if (!existingParameter && r.name_abb) {
        existingParameter = await prisma.microbiology_parameter.findFirst({
          where: { name_abb: r.name_abb },
        });
      }

      // ✅ Base data object without relations
      const baseData = {
        order: r.order ? Number(r.order) : 0,
        name: r.name,
        name_abb: r.name_abb || null,
        request_min: r.request_min !== null ? Number(r.request_min) : null,
        sample_type_id: sampleTypeId ?? null,
        spec_type_id: specTypeId ?? null,
        spec: r.spec || null,
        spec_min: r.spec_min !== null ? Number(r.spec_min) : null,
        spec_max: r.spec_max !== null ? Number(r.spec_max) : null,
        warning_min: r.warning_min !== null ? Number(r.warning_min) : null,
        warning_max: r.warning_max !== null ? Number(r.warning_max) : null,
        is_enter_spec_min: toBool(r.is_enter_spec_min),
        is_enter_spec_max: toBool(r.is_enter_spec_max),
        is_enter_warning_min: toBool(r.is_enter_warning_min),
        is_enter_warning_max: toBool(r.is_enter_warning_max),
        final_result: r.final_result || '',
        decimal:
          r.decimal !== null && r.decimal !== undefined ? Number(r.decimal) : 0,
        is_enter_decimal: toBool(r.is_enter_decimal),
        status: toBool(r.status),
        updated_by: r.updated_by ? Number(r.updated_by) : 0,
      };

      if (existingParameter) {
        // ✅ Update existing record using relation syntax
        await prisma.microbiology_parameter.update({
          where: { id: existingParameter.id },
          data: {
            ...baseData,
            // ✅ Use relation syntax instead of unit_id
            ...(unitId
              ? {
                  unit: {
                    connect: { id: unitId },
                  },
                }
              : {
                  unit: {
                    disconnect: true,
                  },
                }),
          },
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (${r.name_abb})`);
      } else {
        // ✅ Create new record using relation syntax
        await prisma.microbiology_parameter.create({
          data: {
            ...baseData,
            created_by: r.created_by ? Number(r.created_by) : 0,
            // ✅ Use relation syntax instead of unit_id
            ...(unitId
              ? {
                  unit: {
                    connect: { id: unitId },
                  },
                }
              : {}),
          },
        });
        created++;
        console.log(`✅ Created: ${r.name} (${r.name_abb})`);
      }
    } catch (e) {
      console.error(
        '❌ Failed to process microbiology_parameter:',
        r,
        e.message,
      );
      skipped++;
    }
  }

  console.log(
    `✅ microbiology_parameter seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedMaterialFromNew() {
  const fileName = 'material.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Resolve foreign keys
      // Check if record exists by name first, then by id
      let existingMaterial = await prisma.material.findFirst({
        where: { name: r.name },
      });

      // If not found by name, try to find by id
      if (!existingMaterial && r.id) {
        existingMaterial = await prisma.material.findFirst({
          where: { id: r.id.toString() },
        });
      }

      // ✅ Updated materialData to match your schema
      const materialData = {
        name: r.name,
        test_report_name: r.test_report_name || null,
        conclusion: r.conclusion || null,
        status: toBool(r.status),
      };

      if (existingMaterial) {
        // Update existing record
        await prisma.material.update({
          where: { id: existingMaterial.id },
          data: materialData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (id: ${existingMaterial.id})`);
      } else {
        // Create new record
        await prisma.material.create({
          data: {
            id: r.id ? r.id.toString() : undefined, // Let Prisma generate ID if not provided
            ...materialData,
            created_by: r.created_by ? Number(r.created_by) : null,
          },
        });
        created++;
        console.log(`✅ Created: ${r.name} (id: ${r.id})`);
      }
    } catch (e) {
      console.error('❌ Failed to process material:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ material seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedMaterialChemicalParameterFromNew() {
  const fileName = 'Material_ChemicalParameter.xlsx';
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
      // ✅ Enhanced validation with type checking
      if (!r.material_id || !r.chemical_parameter_id) {
        console.warn(
          '⚠️ Skipping row with missing material_id or chemical_parameter_id:',
          r,
        );
        skipped++;
        continue;
      }

      // ✅ Validate and convert material_id to string
      let materialId: string;
      try {
        materialId = r.material_id.toString();
        if (
          !materialId ||
          materialId === 'null' ||
          materialId === 'undefined'
        ) {
          throw new Error('Invalid material_id');
        }
      } catch (e) {
        console.warn(`⚠️ Invalid material_id format:`, r.material_id);
        skipped++;
        continue;
      }

      // ✅ Validate chemical_parameter_id
      let chemicalParameterId: number | undefined;
      if (r.chemical_parameter_id != null && r.chemical_parameter_id !== '') {
        const chemicalParameter = await prisma.chemical_parameter.findFirst({
          where: {
            OR: [
              { name: r.chemical_parameter_id.toString() },
              ...(isNaN(Number(r.chemical_parameter_id))
                ? []
                : [{ id: Number(r.chemical_parameter_id) }]),
            ],
          },
          select: { id: true },
        });

        if (!chemicalParameter) {
          console.warn(
            `⚠️ Chemical parameter not found:`,
            r.chemical_parameter_id,
          );
          skipped++;
          continue;
        }

        chemicalParameterId = chemicalParameter.id;
      } else {
        console.warn(
          `⚠️ Invalid chemical_parameter_id:`,
          r.chemical_parameter_id,
        );
        skipped++;
        continue;
      }

      // Check if record exists
      const existingRelation = await prisma.material_chemical.findFirst({
        where: {
          material_id: materialId,
          chemical_parameter_id: chemicalParameterId,
        },
      });

      // ✅ Type-safe data object
      const materialChemicalData = {
        material_id: materialId,
        chemical_parameter_id: chemicalParameterId,
      };

      if (existingRelation) {
        // Update existing record
        await prisma.material_chemical.update({
          where: { id: existingRelation.id },
          data: materialChemicalData,
        });
        updated++;
        console.log(
          `✅ Updated: Material ${materialId} <-> Chemical Parameter ${chemicalParameterId}`,
        );
      } else {
        // Create new record
        await prisma.material_chemical.create({
          data: materialChemicalData,
        });
        created++;
        console.log(
          `✅ Created: Material ${materialId} <-> Chemical Parameter ${chemicalParameterId}`,
        );
      }
    } catch (e) {
      console.error('❌ Failed to process material_chemical:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ material_chemical seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
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

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const r of rows) {
    try {
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Check if record exists by name first, then by code if available
      let existingCategory = await prisma.category_edit.findFirst({
        where: { name: r.name },
      });

      // Common data object
      const categoryEditData = {
        order: r.order ? Number(r.order) : 0,
        name: r.name,
        status: toBool(r.status),
      };

      if (existingCategory) {
        // Update existing record
        await prisma.category_edit.update({
          where: { id: existingCategory.id },
          data: categoryEditData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (code: ${r.code})`);
      } else {
        // Create new record
        await prisma.category_edit.create({
          data: {
            ...categoryEditData,
            created_by: r.created_by ? Number(r.created_by) : 0,
          },
        });
        created++;
        console.log(`✅ Created: ${r.name} (code: ${r.code})`);
      }
    } catch (e) {
      console.error('❌ Failed to process category_edit:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ category_edit seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedSectionFromNew() {
  const fileName = 'Section.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Resolve foreign keys
      let locationId: number | undefined;
      if (r.location_id != null && r.location_id !== '') {
        const location = await prisma.location.findFirst({
          where: {
            OR: [{ name: r.location_id }],
          },
          select: { id: true },
        });
        locationId = location ? location.id : undefined;
      }

      // Check if record exists by name first, then by code if available
      let existingSection = await prisma.section.findFirst({
        where: { name: r.name },
      });

      // Common data object
      // Create base section data without location_id
      const sectionData = {
        location_id: locationId,
        name: r.name || '',
        number_of_box: r.number_of_box ? Number(r.number_of_box) : 0,
        status: toBool(r.status),
      };

      if (existingSection) {
        // Update existing record
        await prisma.section.update({
          where: { id: existingSection.id },
          data: sectionData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (code: ${r.code})`);
      } else {
        // Create new record with conditional location_id
        const createData = {
          ...sectionData,
          created_by: r.created_by ? Number(r.created_by) : 0,
        };

        if (typeof locationId === 'number') {
          (createData as any).location_id = locationId;
        }

        await prisma.section.create({
          data: createData,
        });
        created++;
        console.log(`✅ Created: ${r.name} (code: ${r.code})`);
      }
    } catch (e) {
      console.error('❌ Failed to process section:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ section seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedBoxFromNew() {
  const fileName = 'Box.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Resolve foreign keys
      let sectionId: number | undefined;
      if (r.section_id != null && r.section_id !== '') {
        const section = await prisma.section.findFirst({
          where: {
            OR: [{ name: r.section_id }],
          },
          select: { id: true },
        });
        sectionId = section ? section.id : undefined;
      }

      let locationid: number | undefined;
      if (r.location_id != null && r.location_id !== '') {
        const location = await prisma.location.findFirst({
          where: {
            OR: [{ name: r.location_id }],
          },
          select: { id: true },
        });
        locationid = location ? location.id : undefined;
      }

      // Check if record exists by name first, then by code if available
      let existingBox = await prisma.box.findFirst({
        where: { name: r.name },
      });

      // Common data object
      const boxData: any = {
        location_id: locationid,
        section_id: sectionId,
        name: r.name || '',
        number_of_bottle: r.number_of_bottle ? Number(r.number_of_bottle) : 0,
        status: toBool(r.status),
      };

      if (existingBox) {
        // Update existing record
        await prisma.box.update({
          where: { id: existingBox.id },
          data: {
            ...boxData,
          },
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (code: ${r.code})`);
      } else {
        // Create new record
        await prisma.box.create({
          data: {
            ...boxData,
            created_by: r.created_by ? Number(r.created_by) : 0,
          },
        });
        created++;
        console.log(`✅ Created: ${r.name} (code: ${r.code})`);
      }
    } catch (e) {
      console.error('❌ Failed to process box:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ box seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedManufacturerFromNew() {
  const fileName = 'Brand.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Check if record exists by name first, then by code if available
      let existingManufacturer = await prisma.manufacturer.findFirst({
        where: { name: r.name },
      });

      // If not found by name and code exists, try to find by code
      if (!existingManufacturer && r.code) {
        existingManufacturer = await prisma.manufacturer.findFirst({
          where: { name: r.name },
        });
      }

      // Common data object
      const manufacturerData = {
        name: r.name,
        is_chemical_stock: toBool(r.is_chemical_stock),
        is_equipment_stock: toBool(r.is_equipment_stock),
        status: toBool(r.status),
      };

      if (existingManufacturer) {
        // Update existing record
        await prisma.manufacturer.update({
          where: { id: existingManufacturer.id },
          data: manufacturerData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (code: ${r.code})`);
      } else {
        // Create new record
        await prisma.manufacturer.create({
          data: {
            ...manufacturerData,
            created_by: r.created_by ? Number(r.created_by) : 0,
          },
        });
        created++;
        console.log(`✅ Created: ${r.name} (code: ${r.code})`);
      }
    } catch (e) {
      console.error('❌ Failed to process manufacturer:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ manufacturer seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedChemicalFromNew() {
  const fileName = 'Chemical Stock.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Resolve foreign keys
      let unitId: number | undefined;
      if (r.unit_id != null && r.unit_id !== '') {
        const unit = await prisma.unit.findFirst({
          where: {
            OR: [{ name: r.unit_id }],
          },
          select: { id: true },
        });
        unitId = unit ? unit.id : undefined;
      }

      let manufacturerId: number | undefined;
      if (r.manufacturer_id != null && r.manufacturer_id !== '') {
        const manufacturer = await prisma.manufacturer.findFirst({
          where: {
            OR: [{ name: r.manufacturer_id }],
          },
          select: { id: true },
        });
        manufacturerId = manufacturer ? manufacturer.id : undefined;
      }

      let categoryChemicalId: string | undefined;
      if (r.category_chemical_id != null && r.category_chemical_id !== '') {
        const categoryChemical = await prisma.category_chemical.findFirst({
          where: {
            OR: [
              { name: r.category_chemical_id },
              { id: r.category_chemical_id },
            ],
          },
          select: { id: true },
        });
        categoryChemicalId = categoryChemical ? categoryChemical.id : undefined;
      }

      // Check if record exists by name first, then by code if available
      let existingChemical = await prisma.chemical.findFirst({
        where: { name: r.name },
      });

      // If not found by name and code exists, try to find by code
      if (!existingChemical && r.code) {
        existingChemical = await prisma.chemical.findFirst({
          where: { code: r.code },
        });
      }

      // Common data object
      const baseChemicalData = {
        code: r.code,
        name: r.name,
        storage_condition: r.storage_condition || null,
        min_stock: r.min_stock !== null ? Number(r.min_stock) : 0,
        email_notification: r.email_notification || null,
        status: toBool(r.status),
      };

      if (existingChemical) {
        // Update existing record with conditional fields
        await prisma.chemical.update({
          where: { id: existingChemical.id },
          data: {
            ...baseChemicalData,
            ...(manufacturerId
              ? { manufacturer_id: manufacturerId }
              : { manufacturer_id: 0 }),
            ...(categoryChemicalId
              ? { category_chemical_id: categoryChemicalId }
              : { category_chemical_id: '' }),
            ...(unitId ? { unit_id: unitId } : { unit_id: 0 }),
          },
        });
        updated++;
      } else {
        // Create new record with conditional fields
        await prisma.chemical.create({
          data: {
            ...baseChemicalData,
            ...(manufacturerId
              ? { manufacturer_id: manufacturerId }
              : { manufacturer_id: 0 }),
            ...(categoryChemicalId
              ? { category_chemical_id: categoryChemicalId }
              : { category_chemical_id: '' }),
            ...(unitId ? { unit_id: unitId } : { unit_id: 0 }),
          },
        });
        created++;
      }
    } catch (e) {
      console.error('❌ Failed to process chemical:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ chemical seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedEquipmentTypeFromNew() {
  const fileName = 'Equipment_Type.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Check if record exists by name first, then by code if available
      let existingEquipmentType = await prisma.equipment_type.findFirst({
        where: { name: r.name },
      });

      // Build equipment type data conditionally
      const equipmentTypeData = {
        order: r.order ? Number(r.order) : 0,
        name: r.name,
        status: toBool(r.status),
      };

      if (existingEquipmentType) {
        // Update existing record
        await prisma.equipment_type.update({
          where: { id: existingEquipmentType.id },
          data: equipmentTypeData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (code: ${r.code})`);
      } else {
        // Create new record
        const createData = {
          ...equipmentTypeData,
        };

        await prisma.equipment_type.create({
          data: createData,
        });
        created++;
        console.log(`✅ Created: ${r.name} (code: ${r.code})`);
      }
    } catch (e) {
      console.error('❌ Failed to process equipment_type:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ equipment_type seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedLocationEmailFromNew() {
  const fileName = 'Equipment_Due_Date_Notification.xlsx';
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
      // Skip rows without required data
      if (!r.email_notification || r.email_notification === null || r.email_notification === '') {
        console.warn('⚠️ Skipping row with missing email_notification:', r);
        skipped++;
        continue;
      }
      let userLocationId: string | undefined;
      if (r.user_location_id != null && r.user_location_id !== '') {
        const userLocation = await prisma.user_location.findFirst({
          where: {
            OR: [
              { name: r.user_location_id },
              { id: r.user_location_id },
            ],
          },
          select: { id: true },
        });
        userLocationId = userLocation ? userLocation.id : undefined;
      }
      
      // Check if record exists by email first
      let existingLocationEmail = await prisma.location_email.findFirst({
        where: {
          email_notification: r.email_notification,
        },
      });

      // Base location email data
      const baseLocationEmailData = {
        email_notification: r.email_notification,
        status: toBool(r.status),
        updated_by: r.updated_by ? Number(r.updated_by) : 0,
      };

      if (existingLocationEmail) {
        // Update existing record using relation syntax
        await prisma.location_email.update({
          where: { id: existingLocationEmail.id },
          data: {
            ...baseLocationEmailData,
            // ✅ Use relation syntax instead of direct field assignment
            ...(userLocationId ? {
              user_location: {
                connect: { id: userLocationId }
              }
            } : {}),
          },
        });
        updated++;
        console.log(`✅ Updated: ${r.email_notification} (location: ${r.user_location_id})`);
      } else {
        // Create new record using relation syntax
        await prisma.location_email.create({
          data: {
            ...baseLocationEmailData,
            created_by: r.created_by ? Number(r.created_by) : 0,
            // ✅ Use relation syntax instead of direct field assignment
            ...(userLocationId ? {
              user_location: {
                connect: { id: userLocationId }
              }
            } : {}),
          },
        });
        created++;
        console.log(`✅ Created: ${r.email_notification} (location: ${r.user_location_id})`);
      }
    } catch (e) {
      console.error('❌ Failed to process location_email:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ location_email seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

async function seedLocationFromNew() {
  const fileName = 'Location.xlsx';
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
      // Skip rows without required data
      if (!r.name || r.name === null || r.name === '') {
        console.warn('⚠️ Skipping row with missing name:', r);
        skipped++;
        continue;
      }

      // Check if record exists by name first, then by code if available
      let existingLocation = await prisma.location.findFirst({
        where: { name: r.name },
      });

      // Common data object
      const locationData = {
        name: r.name,
        status: toBool(r.status),
      };

      if (existingLocation) {
        // Update existing record
        await prisma.location.update({
          where: { id: existingLocation.id },
          data: locationData,
        });
        updated++;
        console.log(`✅ Updated: ${r.name} (code: ${r.code})`);
      } else {
        // Create new record
        await prisma.location.create({
          data: {
            ...locationData,
            created_by: r.created_by ? Number(r.created_by) : 0,
          },
        });
        created++;
        console.log(`✅ Created: ${r.name} (code: ${r.code})`);
      }
    } catch (e) {
      console.error('❌ Failed to process location:', r, e.message);
      skipped++;
    }
  }

  console.log(
    `✅ location seeded: ${created} created, ${updated} updated, ${skipped} skipped`,
  );
}

/* ---------- main runner ---------- */

async function main() {
  // Comment out clearOldData if you want to preserve existing data
  // await clearOldData();

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
  await seedSampleDescription();
  await seedReportHeading();

  // Migrate By Art
  await seedObjectiveFromNew();
  await seedSampleStage();
  await seedLabProcess();
  await seedSampleRetaining();
  await seedLineFromNew();
  await seedUnitFromNew();
  await seedChemicalParameterFromNew();
  await seedMicrobiologyParameterFromNew();
  await seedMaterialFromNew();
  await seedMaterialChemicalParameterFromNew();
  await seedEditCategoryFromNew();
  await seedUserLocation();
  await seedLocationFromNew();
  await seedSectionFromNew();
  await seedBoxFromNew();
  await seedManufacturerFromNew();
  await seedChemicalFromNew();
  await seedEquipmentTypeFromNew();
  await seedLocationEmailFromNew();

  // await upsert_user_api();

  // await seedRequestSampleLabel();

  await createOrUpdateUser();
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
