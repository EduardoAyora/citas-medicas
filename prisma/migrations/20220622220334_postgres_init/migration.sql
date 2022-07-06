/*
  Warnings:

  - You are about to drop the column `facturaId` on the `Servicio` table. All the data in the column will be lost.
  - Added the required column `descripcionServicio` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioServicio` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Factura` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_facturaId_fkey";

-- DropIndex
DROP INDEX "Servicio_facturaId_key";

-- AlterTable
ALTER TABLE "Factura" ADD COLUMN     "descripcionServicio" TEXT NOT NULL,
ADD COLUMN     "precioServicio" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Servicio" DROP COLUMN "facturaId";
