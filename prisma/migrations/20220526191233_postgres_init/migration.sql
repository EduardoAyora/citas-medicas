/*
  Warnings:

  - Added the required column `day` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "day" TEXT NOT NULL;
