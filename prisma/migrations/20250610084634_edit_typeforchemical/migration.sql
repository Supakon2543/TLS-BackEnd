/*
  Warnings:

  - Changed the type of `chemical_parameter_id` on the `chemical_sample_description` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "chemical_sample_description" DROP COLUMN "chemical_parameter_id",
ADD COLUMN     "chemical_parameter_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chemical_sample_description" ADD CONSTRAINT "chemical_sample_description_chemical_parameter_id_fkey" FOREIGN KEY ("chemical_parameter_id") REFERENCES "chemical_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
