-- AlterTable
ALTER TABLE "material" ADD COLUMN     "is_external" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "staging_material" ADD COLUMN     "is_external" BOOLEAN DEFAULT false;
