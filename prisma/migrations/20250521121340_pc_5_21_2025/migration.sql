-- AlterTable
ALTER TABLE "location_email" ALTER COLUMN "user_location_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "location_email" ADD CONSTRAINT "location_email_user_location_id_fkey" FOREIGN KEY ("user_location_id") REFERENCES "user_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_microbiology" ADD CONSTRAINT "material_microbiology_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_microbiology" ADD CONSTRAINT "material_microbiology_microbiology_parameter_id_fkey" FOREIGN KEY ("microbiology_parameter_id") REFERENCES "microbiology_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_chemical" ADD CONSTRAINT "material_chemical_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_chemical" ADD CONSTRAINT "material_chemical_chemical_parameter_id_fkey" FOREIGN KEY ("chemical_parameter_id") REFERENCES "chemical_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
