/*
  Warnings:

  - A unique constraint covering the columns `[cedula,adminId]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `pacienteId` on the `Cita` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `adminId` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_pacienteId_fkey";

-- DropIndex
DROP INDEX "Persona_cedula_key";

-- AlterTable
ALTER TABLE "Cita" DROP COLUMN "pacienteId",
ADD COLUMN     "pacienteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Persona" ADD COLUMN     "adminId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_cedula_adminId_key" ON "Persona"("cedula", "adminId");

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
