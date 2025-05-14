/*
  Warnings:

  - Added the required column `decimal` to the `chemical_parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_result` to the `chemical_parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chemical_parameter" ADD COLUMN     "decimal" INTEGER NOT NULL,
ADD COLUMN     "final_result" TEXT NOT NULL;
