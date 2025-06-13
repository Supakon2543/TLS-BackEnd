/*
  Warnings:

  - You are about to drop the column `lead_name` on the `signature` table. All the data in the column will be lost.
  - Added the required column `filename` to the `signature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `signature` table without a default value. This is not possible if the table is not empty.
  - Made the column `path` on table `signature` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "signature" DROP COLUMN "lead_name",
ADD COLUMN     "filename" VARCHAR(100) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "path" SET NOT NULL;
