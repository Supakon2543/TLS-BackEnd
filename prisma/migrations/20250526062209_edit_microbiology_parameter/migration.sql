/*
  Warnings:

  - Added the required column `decimal` to the `microbiology_parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_result` to the `microbiology_parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_enter_decimal` to the `microbiology_parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "microbiology_parameter" ADD COLUMN     "decimal" INTEGER NOT NULL,
ADD COLUMN     "final_result" TEXT NOT NULL,
ADD COLUMN     "is_enter_decimal" BOOLEAN NOT NULL;
