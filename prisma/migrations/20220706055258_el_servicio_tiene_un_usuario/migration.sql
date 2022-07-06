/*
  Warnings:

  - Made the column `usuarioId` on table `Servicio` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Servicio" ALTER COLUMN "usuarioId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
