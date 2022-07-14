-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id");
