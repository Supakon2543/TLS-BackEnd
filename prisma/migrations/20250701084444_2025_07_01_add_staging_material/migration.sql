-- CreateTable
CREATE TABLE "staging_material" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "test_report_name" VARCHAR(100),
    "conclusion" BOOLEAN,
    "reg_no" VARCHAR(50),
    "is_special_parameter" BOOLEAN,
    "special_parameter_name" VARCHAR(100),
    "special_parameter_type" TEXT,
    "remark_report" VARCHAR(200),
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "staging_material_pkey" PRIMARY KEY ("id")
);
