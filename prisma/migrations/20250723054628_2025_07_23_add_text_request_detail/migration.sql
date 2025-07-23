-- AlterTable
ALTER TABLE "request_detail" ADD COLUMN     "lab_process_text" VARCHAR(100),
ADD COLUMN     "objective_text" VARCHAR(100),
ADD COLUMN     "sample_retaining_text" VARCHAR(100),
ADD COLUMN     "sample_stage_text" VARCHAR(100);
