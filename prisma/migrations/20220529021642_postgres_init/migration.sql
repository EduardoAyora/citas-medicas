/*
  Warnings:

  - Added the required column `servicioId` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cita" ADD COLUMN     "servicioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
