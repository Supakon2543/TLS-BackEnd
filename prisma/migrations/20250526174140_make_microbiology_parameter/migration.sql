-- AlterTable
ALTER TABLE "microbiology_parameter" ALTER COLUMN "unit_id" DROP NOT NULL,
ALTER COLUMN "sample_type_id" DROP NOT NULL,
ALTER COLUMN "spec_type_id" DROP NOT NULL,
ALTER COLUMN "name_abb" DROP NOT NULL;
