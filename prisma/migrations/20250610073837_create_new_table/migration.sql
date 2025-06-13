-- CreateTable
CREATE TABLE "customer_contact_info" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN,
    "created_on" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "customer_contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signature" (
    "id" SERIAL NOT NULL,
    "lead_name" VARCHAR(100) NOT NULL,
    "path" VARCHAR(500),
    "created_on" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "signature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chemical_sample_description" (
    "id" SERIAL NOT NULL,
    "sample_description_id" TEXT NOT NULL,
    "chemical_parameter_id" TEXT NOT NULL,
    "lod_value" TEXT,
    "loq_value" TEXT,
    "created_on" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "chemical_sample_description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "microbiology_sample_description" (
    "id" SERIAL NOT NULL,
    "sample_description_id" TEXT NOT NULL,
    "microbiology_parameter_id" TEXT NOT NULL,
    "lod_value" TEXT,
    "loq_value" TEXT,
    "created_on" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMPTZ(6),
    "updated_by" INTEGER,

    CONSTRAINT "microbiology_sample_description_pkey" PRIMARY KEY ("id")
);
