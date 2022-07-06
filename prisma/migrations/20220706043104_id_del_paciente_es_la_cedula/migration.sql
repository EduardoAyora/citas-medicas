-- DropForeignKey
ALTER TABLE "Cita" DROP CONSTRAINT "Cita_pacienteId_fkey";

-- AlterTable
ALTER TABLE "Cita" ALTER COLUMN "pacienteId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Persona"("cedula") ON DELETE RESTRICT ON UPDATE CASCADE;
