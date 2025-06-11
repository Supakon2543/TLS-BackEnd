/*
  Warnings:

  - The `supervisor_id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "position_name" VARCHAR(100),
DROP COLUMN "supervisor_id",
ADD COLUMN     "supervisor_id" INTEGER;

-- CreateTable
CREATE TABLE "sample_description" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "sample_description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_heading" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "report_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request" (
    "id" SERIAL NOT NULL,
    "request_number" VARCHAR(20),
    "lab_site_id" TEXT,
    "request_type_id" TEXT,
    "requester_id" INTEGER,
    "request_date" TIMESTAMP(3),
    "due_date" TIMESTAMP(3),
    "telephone" VARCHAR(20),
    "status_request_id" TEXT,
    "status_sample_id" TEXT,
    "review_role_id" TEXT,
    "original_id" INTEGER,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_detail" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "test_report_format_id" TEXT,
    "accredited_id" TEXT,
    "report_heading_id" TEXT,
    "objective_id" INTEGER,
    "sample_stage_id" INTEGER,
    "lab_process_id" INTEGER,
    "sample_retaining_id" INTEGER,
    "note" VARCHAR(200),
    "lab_receiver_id" INTEGER,
    "received_date" TIMESTAMP(3),
    "lab_note" VARCHAR(200),
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "request_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_log" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "sample_code" VARCHAR(10),
    "status_request_id" TEXT NOT NULL,
    "activity_request_id" TEXT NOT NULL,
    "user_id" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remark" VARCHAR(200),

    CONSTRAINT "request_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_detail_email" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "request_detail_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_detail_attachment" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "filename" VARCHAR(100) NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "request_detail_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_sample" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "sample_description_id" VARCHAR(10),
    "material_id" INTEGER,
    "material_code" VARCHAR(20),
    "sample_code" VARCHAR(10),
    "sample_name" VARCHAR(100),
    "line_id" INTEGER,
    "sampling_date" TIMESTAMP(3),
    "expiry_date" TIMESTAMP(3),
    "batch_no" VARCHAR(10),
    "due_date" TIMESTAMP(3),
    "status_sample_id" TEXT,
    "note" VARCHAR(200),
    "category_edit_id" INTEGER,
    "certificate_name" VARCHAR(150),
    "path" VARCHAR(500),
    "revision" INTEGER,
    "is_parameter_completed" BOOLEAN DEFAULT false,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "request_sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_sample_item" (
    "id" SERIAL NOT NULL,
    "request_sample_id" INTEGER NOT NULL,
    "seq" INTEGER NOT NULL,
    "quantity" INTEGER,
    "unit_id" INTEGER,
    "time" TIMESTAMP(3),
    "sample_condition_id" TEXT,
    "lab_test_id" TEXT,
    "remark" VARCHAR(100),
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "request_sample_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_sample_chemical" (
    "id" SERIAL NOT NULL,
    "request_sample_id" INTEGER NOT NULL,
    "chemical_parameter_id" INTEGER,
    "lab_result" VARCHAR(15),
    "test_by" INTEGER,
    "test_date" TIMESTAMP(3),
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "request_sample_chemical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_sample_microbiology" (
    "id" SERIAL NOT NULL,
    "request_sample_id" INTEGER NOT NULL,
    "microbiology_parameter_id" INTEGER,
    "lab_result" VARCHAR(15),
    "test_by" INTEGER,
    "test_date" TIMESTAMP(3),
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "request_sample_microbiology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_lab_site_id_fkey" FOREIGN KEY ("lab_site_id") REFERENCES "lab_site"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_request_type_id_fkey" FOREIGN KEY ("request_type_id") REFERENCES "request_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_status_request_id_fkey" FOREIGN KEY ("status_request_id") REFERENCES "status_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_status_sample_id_fkey" FOREIGN KEY ("status_sample_id") REFERENCES "status_sample"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_review_role_id_fkey" FOREIGN KEY ("review_role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_original_id_fkey" FOREIGN KEY ("original_id") REFERENCES "request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_test_report_format_id_fkey" FOREIGN KEY ("test_report_format_id") REFERENCES "test_report_format"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_accredited_id_fkey" FOREIGN KEY ("accredited_id") REFERENCES "accredited"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_report_heading_id_fkey" FOREIGN KEY ("report_heading_id") REFERENCES "report_heading"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_objective_id_fkey" FOREIGN KEY ("objective_id") REFERENCES "objective"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_sample_stage_id_fkey" FOREIGN KEY ("sample_stage_id") REFERENCES "sample_stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_lab_process_id_fkey" FOREIGN KEY ("lab_process_id") REFERENCES "lab_process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_sample_retaining_id_fkey" FOREIGN KEY ("sample_retaining_id") REFERENCES "sample_retaining"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail" ADD CONSTRAINT "request_detail_lab_receiver_id_fkey" FOREIGN KEY ("lab_receiver_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_log" ADD CONSTRAINT "request_log_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_log" ADD CONSTRAINT "request_log_status_request_id_fkey" FOREIGN KEY ("status_request_id") REFERENCES "status_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_log" ADD CONSTRAINT "request_log_activity_request_id_fkey" FOREIGN KEY ("activity_request_id") REFERENCES "activity_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_log" ADD CONSTRAINT "request_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail_email" ADD CONSTRAINT "request_detail_email_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail_email" ADD CONSTRAINT "request_detail_email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail_attachment" ADD CONSTRAINT "request_detail_attachment_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_detail_attachment" ADD CONSTRAINT "request_detail_attachment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_sample_description_id_fkey" FOREIGN KEY ("sample_description_id") REFERENCES "sample_description"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "line"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_status_sample_id_fkey" FOREIGN KEY ("status_sample_id") REFERENCES "status_sample"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample" ADD CONSTRAINT "request_sample_category_edit_id_fkey" FOREIGN KEY ("category_edit_id") REFERENCES "category_edit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_item" ADD CONSTRAINT "request_sample_item_request_sample_id_fkey" FOREIGN KEY ("request_sample_id") REFERENCES "request_sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_item" ADD CONSTRAINT "request_sample_item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_item" ADD CONSTRAINT "request_sample_item_sample_condition_id_fkey" FOREIGN KEY ("sample_condition_id") REFERENCES "sample_condition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_item" ADD CONSTRAINT "request_sample_item_lab_test_id_fkey" FOREIGN KEY ("lab_test_id") REFERENCES "lab_test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_chemical" ADD CONSTRAINT "request_sample_chemical_request_sample_id_fkey" FOREIGN KEY ("request_sample_id") REFERENCES "request_sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_chemical" ADD CONSTRAINT "request_sample_chemical_chemical_parameter_id_fkey" FOREIGN KEY ("chemical_parameter_id") REFERENCES "chemical_parameter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_microbiology" ADD CONSTRAINT "request_sample_microbiology_request_sample_id_fkey" FOREIGN KEY ("request_sample_id") REFERENCES "request_sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_sample_microbiology" ADD CONSTRAINT "request_sample_microbiology_microbiology_parameter_id_fkey" FOREIGN KEY ("microbiology_parameter_id") REFERENCES "microbiology_parameter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chemical_sample_description" ADD CONSTRAINT "chemical_sample_description_sample_description_id_fkey" FOREIGN KEY ("sample_description_id") REFERENCES "sample_description"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
