/*
  Warnings:

  - The primary key for the `material` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "material_chemical" DROP CONSTRAINT "material_chemical_material_id_fkey";

-- DropForeignKey
ALTER TABLE "material_microbiology" DROP CONSTRAINT "material_microbiology_material_id_fkey";

-- DropForeignKey
ALTER TABLE "request_sample" DROP CONSTRAINT "request_sample_material_id_fkey";

-- AlterTable
ALTER TABLE "material" DROP CONSTRAINT "material_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "material_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "material_id_seq";

-- AlterTable
ALTER TABLE "material_chemical" ALTER COLUMN "material_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "material_microbiology" ALTER COLUMN "material_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "request_sample" ALTER COLUMN "material_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "material_microbiology" ADD CONSTRAINT "material_microbiology_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_chemical" ADD CONSTRAINT "material_chemical_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE SET NULL ON UPDATE CASCADE;
