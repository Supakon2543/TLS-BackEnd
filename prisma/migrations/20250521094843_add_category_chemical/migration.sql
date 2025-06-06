-- CreateTable
CREATE TABLE "request_type" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "request_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_request" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "state_id" TEXT,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "status_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_sample" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "status_sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_retain" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "status_retain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_equipment" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "status_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample_type" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "sample_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lab_test" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "lab_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_chemical" (
    "id" VARCHAR(5) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "category_chemical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sample_condition" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "sample_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_report_format" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "test_report_format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accredited" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "accredited_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spec_type" (
    "id" VARCHAR(10) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "spec_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_request" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "activity_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_equipment" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "activity_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" VARCHAR(5) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_location" (
    "id" VARCHAR(5) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "lab_site_id" TEXT,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "user_location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chemical" ADD CONSTRAINT "chemical_manufacturer_id_fkey" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chemical" ADD CONSTRAINT "chemical_category_chemical_id_fkey" FOREIGN KEY ("category_chemical_id") REFERENCES "category_chemical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
