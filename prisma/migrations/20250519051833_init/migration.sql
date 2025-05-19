/*
  Warnings:

  - The primary key for the `location_email` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `location_email` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "location_email" DROP CONSTRAINT "location_email_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "location_email_pkey" PRIMARY KEY ("id");
