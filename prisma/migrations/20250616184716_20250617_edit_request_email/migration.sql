/*
  Warnings:

  - You are about to drop the `request_detail_email` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "request_detail_email" DROP CONSTRAINT "request_detail_email_request_id_fkey";

-- DropForeignKey
ALTER TABLE "request_detail_email" DROP CONSTRAINT "request_detail_email_user_id_fkey";

-- AlterTable
-- ALTER TABLE "material" ADD COLUMN     "conclusion" BOOLEAN,
-- ADD COLUMN     "is_special_parameter" BOOLEAN,
-- ADD COLUMN     "reg_no" VARCHAR(50),
-- ADD COLUMN     "remark_report" VARCHAR(200),
-- ADD COLUMN     "special_parameter_name" VARCHAR(100),
-- ADD COLUMN     "special_parameter_type" TEXT;

-- AlterTable
ALTER TABLE "request_sample" ADD COLUMN     "is_display_special" BOOLEAN DEFAULT false,
ADD COLUMN     "special_test_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "request_sample_item" ADD COLUMN     "remark_lab" VARCHAR(100);

-- DropTable
DROP TABLE "request_detail_email";

-- CreateTable
CREATE TABLE "request_email" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "request_email_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "request_email" ADD CONSTRAINT "request_email_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_email" ADD CONSTRAINT "request_email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
