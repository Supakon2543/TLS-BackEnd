/*
  Warnings:

  - The `conclusion` column on the `material` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "material" DROP COLUMN "conclusion",
ADD COLUMN     "conclusion" BOOLEAN;
