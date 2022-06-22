/*
  Warnings:

  - A unique constraint covering the columns `[cedula]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Persona_cedula_key" ON "Persona"("cedula");
