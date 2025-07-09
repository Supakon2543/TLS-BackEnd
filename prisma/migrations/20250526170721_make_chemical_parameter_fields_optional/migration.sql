/*
  Warnings:

  - The primary key for the `lab_site` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "chemical_parameter" ALTER COLUMN "unit_id" DROP NOT NULL,
ALTER COLUMN "sample_type_id" DROP NOT NULL,
ALTER COLUMN "spec_type_id" DROP NOT NULL,
ALTER COLUMN "spec" DROP NOT NULL,
ALTER COLUMN "spec_min" DROP NOT NULL,
ALTER COLUMN "spec_max" DROP NOT NULL,
ALTER COLUMN "warning_min" DROP NOT NULL,
ALTER COLUMN "warning_max" DROP NOT NULL,
ALTER COLUMN "is_enter_spec_min" DROP NOT NULL,
ALTER COLUMN "is_enter_spec_max" DROP NOT NULL,
ALTER COLUMN "is_enter_warning_min" DROP NOT NULL,
ALTER COLUMN "is_enter_warning_max" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "decimal" DROP NOT NULL,
ALTER COLUMN "final_result" DROP NOT NULL,
ALTER COLUMN "is_enter_decimal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lab_site" DROP CONSTRAINT "lab_site_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "lab_site_pkey" PRIMARY KEY ("id");
