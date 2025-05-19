-- CreateTable
CREATE TABLE "box" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "number_of_bottle" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_on" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_on" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "box_pkey" PRIMARY KEY ("id")
);
