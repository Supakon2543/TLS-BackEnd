/*
  Warnings:

  - A unique constraint covering the columns `[sample_code]` on the table `request_sample` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "request_sample_sample_code_key" ON "request_sample"("sample_code");
