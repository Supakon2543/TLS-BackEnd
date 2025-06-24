-- CreateTable
CREATE TABLE "stock_retain" (
    "id" SERIAL NOT NULL,
    "request_sample_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "box_id" INTEGER NOT NULL,
    "status_retain_id" TEXT,
    "created_on" TIMESTAMPTZ,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ,
    "updated_by" INTEGER,

    CONSTRAINT "stock_retain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_retain_item" (
    "id" SERIAL NOT NULL,
    "stock_retain_id" INTEGER NOT NULL,
    "sample_item_id" INTEGER NOT NULL,
    "status_retain_id" TEXT,
    "approve_role_id" TEXT,
    "plan_return_date" TIMESTAMPTZ,
    "return_date" TIMESTAMPTZ,
    "created_on" TIMESTAMPTZ,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ,
    "updated_by" INTEGER,

    CONSTRAINT "stock_retain_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_retain_item_log" (
    "id" SERIAL NOT NULL,
    "stock_retain_item_id" INTEGER NOT NULL,
    "stock_retain_id" INTEGER NOT NULL,
    "activity" VARCHAR(200),
    "user_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "remark" VARCHAR(200),

    CONSTRAINT "stock_retain_item_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_chemical" (
    "id" SERIAL NOT NULL,
    "chemical_id" INTEGER NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,
    "created_on" TIMESTAMPTZ,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ,
    "updated_by" INTEGER,

    CONSTRAINT "stock_chemical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_chemical_item" (
    "id" SERIAL NOT NULL,
    "stock_chemical_id" INTEGER NOT NULL,
    "lot_no" VARCHAR(10) NOT NULL,
    "number_of_bottle" VARCHAR(6) NOT NULL,
    "received_date" TIMESTAMPTZ NOT NULL,
    "expiry_date" TIMESTAMPTZ NOT NULL,
    "withdraw_date" TIMESTAMPTZ,
    "prepare_date" TIMESTAMPTZ,
    "prepare_by" INTEGER,
    "created_on" TIMESTAMPTZ,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ,
    "updated_by" INTEGER,

    CONSTRAINT "stock_chemical_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_equipment" (
    "id" SERIAL NOT NULL,
    "equipment_type_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "serial_no" VARCHAR(50) NOT NULL,
    "equipment_code" VARCHAR(50) NOT NULL,
    "asset_no" VARCHAR(50) NOT NULL,
    "status_equipment_id" TEXT,
    "created_on" TIMESTAMPTZ,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ,
    "updated_by" INTEGER,

    CONSTRAINT "stock_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_equipment_calibration" (
    "id" SERIAL NOT NULL,
    "stock_equipment_id" INTEGER NOT NULL,
    "calibration_date" TIMESTAMPTZ NOT NULL,
    "due_date" TIMESTAMPTZ NOT NULL,
    "certification_no" VARCHAR(50) NOT NULL,
    "note" VARCHAR(200),
    "filename" VARCHAR(100) NOT NULL,
    "path" VARCHAR(200) NOT NULL,
    "created_on" TIMESTAMPTZ,
    "created_by" INTEGER,

    CONSTRAINT "stock_equipment_calibration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_equipment_log" (
    "id" SERIAL NOT NULL,
    "stock_equipment_id" INTEGER NOT NULL,
    "status_equipment_id" INTEGER NOT NULL,
    "activity_equipment_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "note" VARCHAR(200),

    CONSTRAINT "stock_equipment_log_pkey" PRIMARY KEY ("id")
);
