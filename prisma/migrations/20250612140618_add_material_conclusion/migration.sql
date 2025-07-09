-- AlterTable
ALTER TABLE "material" ADD COLUMN     "conclusion" VARCHAR(100),
ADD COLUMN     "is_special_parameter" BOOLEAN,
ADD COLUMN     "reg_no" VARCHAR(50),
ADD COLUMN     "remark_report" VARCHAR(200),
ADD COLUMN     "special_parameter_name" VARCHAR(100),
ADD COLUMN     "special_parameter_type" TEXT;
