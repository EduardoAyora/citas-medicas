-- CreateEnum
CREATE TYPE "Dia" AS ENUM ('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO');

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "costo" DECIMAL(65,30) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "duracionEnMinutos" INTEGER NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioDia" (
    "id" SERIAL NOT NULL,
    "horaInicio" INTEGER NOT NULL,
    "horaFin" INTEGER NOT NULL,
    "dia" "Dia" NOT NULL,
    "servicioId" INTEGER NOT NULL,

    CONSTRAINT "HorarioDia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HorarioDia_servicioId_dia_key" ON "HorarioDia"("servicioId", "dia");

-- AddForeignKey
ALTER TABLE "HorarioDia" ADD CONSTRAINT "HorarioDia_servicioId_fkey" FOREIGN KEY ("servicioId") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
