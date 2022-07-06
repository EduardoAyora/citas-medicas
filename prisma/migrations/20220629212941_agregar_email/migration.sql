/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Persona" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");
