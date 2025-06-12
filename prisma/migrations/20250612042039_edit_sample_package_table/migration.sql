-- AlterTable
ALTER TABLE "sample_packaging" ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "created_on" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_by" INTEGER,
ADD COLUMN     "updated_on" TIMESTAMPTZ(6);
