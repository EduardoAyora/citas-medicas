/*
  Warnings:

  - A unique constraint covering the columns `[facturaId]` on the table `Servicio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facturaId` to the `Servicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicio" ADD COLUMN     "facturaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "celular" TEXT NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servicio_facturaId_key" ON "Servicio"("facturaId");

-- AddForeignKey
ALTER TABLE "Servicio" ADD CONSTRAINT "Servicio_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
