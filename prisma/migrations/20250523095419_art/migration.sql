/*
  Warnings:

  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_location` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "location_email" DROP CONSTRAINT "location_email_user_location_id_fkey";

-- AlterTable
ALTER TABLE "chemical_parameter" ADD COLUMN     "name_abb" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "location_email" ALTER COLUMN "user_location_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "microbiology_parameter" ADD COLUMN     "name_abb" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "role" DROP CONSTRAINT "role_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_location" DROP CONSTRAINT "user_location_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "user_location_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "location_email" ADD CONSTRAINT "location_email_user_location_id_fkey" FOREIGN KEY ("user_location_id") REFERENCES "user_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
