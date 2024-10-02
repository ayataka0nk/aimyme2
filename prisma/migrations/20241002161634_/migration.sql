/*
  Warnings:

  - You are about to drop the column `month` on the `time_entries` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `time_entries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "time_entries" DROP COLUMN "month",
DROP COLUMN "year";
