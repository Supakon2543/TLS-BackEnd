
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created_on" DROP NOT NULL,
ALTER COLUMN "updated_on" DROP NOT NULL;


-- AlterTable
ALTER TABLE "user_role" ALTER COLUMN "created_on" DROP NOT NULL;

-- CreateTable
CREATE TABLE "location_email" (
    "id" VARCHAR(15) NOT NULL,
    "user_location_id" INTEGER NOT NULL,
    "email_notification" VARCHAR(500),
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "location_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_type" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER,

    CONSTRAINT "equipment_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "is_chemical_stock" BOOLEAN NOT NULL,
    "is_equipment_stock" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageUnit" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number_of_box" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMPTZ(6),
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "StorageUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number_of_box" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMPTZ(6),
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMPTZ(6),
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);
