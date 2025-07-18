-- AlterTable
ALTER TABLE "request_sample" ADD COLUMN     "input_sample_name" VARCHAR(50),
ADD COLUMN     "packing_size" VARCHAR(50);

-- CreateTable
CREATE TABLE "activity_retain" (
    "id" VARCHAR(15) NOT NULL,
    "order" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "activity_retain_pkey" PRIMARY KEY ("id")
);

-- Insert required data for activity_retain
INSERT INTO "activity_retain" ("id", "order", "name", "status") VALUES
('AR01', 1, 'Initial', true),
('AR02', 2, 'In Progress', true),
('AR03', 3, 'Completed', true)
ON CONFLICT ("id") DO NOTHING;

-- Insert required data for status_retain (if it doesn't exist)
INSERT INTO "status_retain" ("id", "name", "description") VALUES
('SR01', 'Active', 'Active retain status'),
('SR02', 'Inactive', 'Inactive retain status'),
('SR03', 'Pending', 'Pending retain status')
ON CONFLICT ("id") DO NOTHING;

-- AddForeignKey
ALTER TABLE "status_request" ADD CONSTRAINT "status_request_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "user" ADD CONSTRAINT "user_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "microbiology_parameter" ADD CONSTRAINT "microbiology_parameter_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chemical_parameter" ADD CONSTRAINT "chemical_parameter_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain" ADD CONSTRAINT "stock_retain_request_sample_id_fkey" FOREIGN KEY ("request_sample_id") REFERENCES "request_sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain" ADD CONSTRAINT "stock_retain_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain" ADD CONSTRAINT "stock_retain_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain" ADD CONSTRAINT "stock_retain_box_id_fkey" FOREIGN KEY ("box_id") REFERENCES "box"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain_item" ADD CONSTRAINT "stock_retain_item_stock_retain_id_fkey" FOREIGN KEY ("stock_retain_id") REFERENCES "stock_retain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain_item" ADD CONSTRAINT "stock_retain_item_sample_item_id_fkey" FOREIGN KEY ("sample_item_id") REFERENCES "request_sample_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain_item" ADD CONSTRAINT "stock_retain_item_status_retain_id_fkey" FOREIGN KEY ("status_retain_id") REFERENCES "status_retain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_retain_item_log" ADD CONSTRAINT "stock_retain_item_log_activity_fkey" FOREIGN KEY ("activity") REFERENCES "activity_retain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
