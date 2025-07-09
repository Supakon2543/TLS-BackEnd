/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
import * as xlsx from 'xlsx';
import * as path from 'path';

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
  }
  console.log('✅ request_type seeded');
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
  }
  console.log('✅ status_retain seeded');
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
  }
  console.log('✅ lab_test seeded');
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
