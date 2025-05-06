-- AlterTable
ALTER TABLE "StorageUnit" ALTER COLUMN "created_on" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_on" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "location" ALTER COLUMN "created_on" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_on" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "section" ALTER COLUMN "created_on" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_on" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_on" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_on" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "category_edit" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "category_edit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "is_sample" BOOLEAN NOT NULL,
    "is_chemical" BOOLEAN NOT NULL,
    "is_microbiology" BOOLEAN NOT NULL,
    "is_chemical_stock" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_microbiology" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "microbiology_parameter_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "material_microbiology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_chemical" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "chemical_parameter_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,

    CONSTRAINT "material_chemical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "microbiology_parameter" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "request_min" DECIMAL,
    "unit_id" INTEGER NOT NULL,
    "sample_type_id" TEXT NOT NULL,
    "spec_type_id" TEXT NOT NULL,
    "spec" VARCHAR(100) NOT NULL,
    "spec_min" DECIMAL,
    "spec_max" DECIMAL,
    "warning_min" DECIMAL,
    "warning_max" DECIMAL,
    "is_enter_spec_min" BOOLEAN NOT NULL,
    "is_enter_spec_max" BOOLEAN NOT NULL,
    "is_enter_warning_min" BOOLEAN NOT NULL,
    "is_enter_warning_max" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "microbiology_parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chemical_parameter" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "request_min" DECIMAL(65,30),
    "unit_id" INTEGER NOT NULL,
    "sample_type_id" TEXT NOT NULL,
    "spec_type_id" TEXT NOT NULL,
    "spec" VARCHAR(100) NOT NULL,
    "spec_min" DECIMAL(65,30) NOT NULL,
    "spec_max" DECIMAL(65,30) NOT NULL,
    "warning_min" DECIMAL(65,30) NOT NULL,
    "warning_max" DECIMAL(65,30) NOT NULL,
    "is_enter_spec_min" BOOLEAN NOT NULL,
    "is_enter_spec_max" BOOLEAN NOT NULL,
    "is_enter_warning_min" BOOLEAN NOT NULL,
    "is_enter_warning_max" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "chemical_parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "test_report_name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample_retaining" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "text_input" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "sample_retaining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_process" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "text_input" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "lab_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample_stage" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "text_input" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "sample_stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objective" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "text_input" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "objective_pkey" PRIMARY KEY ("id")
);
