/*
  Warnings:

  - You are about to drop the column `supervisor_code` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `employee_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `fullname` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `tel` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `company` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `dept_code` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `dept_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[employee_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "equipment_type" ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "location_email" ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "manufacturer" ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "supervisor_code",
ADD COLUMN     "supervisor_id" TEXT,
ALTER COLUMN "employee_id" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "tel" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "company" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "dept_code" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "dept_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMPTZ(3);

-- CreateTable
CREATE TABLE "lab_site" (
    "id" VARCHAR(5) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "lab_site_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_employee_id_key" ON "user"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
