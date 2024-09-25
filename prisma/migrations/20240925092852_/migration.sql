/*
  Warnings:

  - Added the required column `notes` to the `estimates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "estimates" ADD COLUMN     "notes" TEXT NOT NULL;
