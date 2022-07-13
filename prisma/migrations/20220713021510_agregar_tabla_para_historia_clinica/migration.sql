-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "antecedentes" TEXT;

-- CreateTable
CREATE TABLE "RegistroHistoriaClinica" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivoConsulta" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "RegistroHistoriaClinica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistroHistoriaClinica_pacienteId_key" ON "RegistroHistoriaClinica"("pacienteId");

-- AddForeignKey
ALTER TABLE "RegistroHistoriaClinica" ADD CONSTRAINT "RegistroHistoriaClinica_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("personaId") ON DELETE RESTRICT ON UPDATE CASCADE;
