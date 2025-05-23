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

interface RetainingRow
  extends Omit<CommonRow, 'created_by' | 'updated_by'> {
  created_by?: number;
  updated_by?: number;
}

/** Convert TRUE/FALSE strings to boolean and numbers to number */
const toBool = (v: unknown): boolean =>
  v === true ||
  v === 'TRUE' ||
  v === 'true' ||
  v === 1 ||
  v === '1';

/** Read an excel file under prisma/staticfile/ and return typed JSON rows */
function readExcel<T>(fileName: string): T[] {
  const filePath = path.join(__dirname, 'staticfile', fileName);
  const wb = xlsx.readFile(filePath);
  const sheet = wb.SheetNames[0];
  return xlsx.utils.sheet_to_json<T>(wb.Sheets[sheet], { defval: null });
}

/* ---------- delete existing data ---------- */

async function clearOldData() {
  await prisma.sample_retaining.deleteMany();
  await prisma.sample_stage.deleteMany();
  await prisma.lab_process.deleteMany();
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



/* ---------- main runner ---------- */

async function main() {
  await clearOldData();
  await seedLabProcess();
  await seedSampleStage();
  await seedSampleRetaining();
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
