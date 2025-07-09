/*
  Warnings:

  - Added the required column `is_enter_decimal` to the `chemical_parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chemical_parameter" ADD COLUMN     "is_enter_decimal" BOOLEAN NOT NULL;
