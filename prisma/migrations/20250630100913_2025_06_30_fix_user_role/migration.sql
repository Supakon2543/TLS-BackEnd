/*
  Warnings:

  - The primary key for the `user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "user_employee_id_key";

-- AlterTable
ALTER TABLE "request_sample_item" ALTER COLUMN "time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "user_id" DROP DEFAULT,
ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_role_user_id_seq";
