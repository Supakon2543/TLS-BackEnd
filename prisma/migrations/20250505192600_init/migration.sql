-- CreateTable
CREATE TABLE "chemical" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer_id" INTEGER NOT NULL,
    "category_chemical_id" TEXT NOT NULL,
    "storage_condition" TEXT NOT NULL,
    "min_stock" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "email_notification" TEXT,
    "status" BOOLEAN,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "employee_id" TEXT,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "tel" TEXT,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "dept_code" TEXT,
    "dept_name" TEXT,
    "user_location_id" TEXT,
    "supervisor_code" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "user_id" SERIAL NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chemical_id_key" ON "chemical"("id");
