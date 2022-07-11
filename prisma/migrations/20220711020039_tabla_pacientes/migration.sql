/*
  Warnings:

  - A unique constraint covering the columns `[personaId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personaId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SEXO" AS ENUM ('MASCULINO', 'FEMENINO');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "personaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Paciente" (
    "sexo" "SEXO" NOT NULL,
    "personaId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_personaId_key" ON "Paciente"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_personaId_key" ON "Usuario"("personaId");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
