/*
  Warnings:

  - Changed the type of `microbiology_parameter_id` on the `microbiology_sample_description` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "microbiology_sample_description" DROP COLUMN "microbiology_parameter_id",
ADD COLUMN     "microbiology_parameter_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sample_packaging" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "text_input" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "sample_packaging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "microbiology_sample_description" ADD CONSTRAINT "microbiology_sample_description_sample_description_id_fkey" FOREIGN KEY ("sample_description_id") REFERENCES "sample_description"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "microbiology_sample_description" ADD CONSTRAINT "microbiology_sample_description_microbiology_parameter_id_fkey" FOREIGN KEY ("microbiology_parameter_id") REFERENCES "microbiology_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
