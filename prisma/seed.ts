import { Dia, PrismaClient, Rol } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // await prisma.usuario.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       name: 'Eduardo Ayora',
  //       password: '123',
  //       username: 'edu',
  //       role: Rol.DOCTOR,
  //     },
  //     {
  //       name: 'Karen Ayora',
  //       password: '123',
  //       username: 'karen',
  //       role: Rol.SECRETARY,
  //     },
  //     {
  //       name: 'Admin',
  //       password: '123',
  //       username: 'admin',
  //       role: Rol.ADMIN,
  //     },
  //   ]
  // })
    
  // await prisma.servicio.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       costo: 20,
  //       descripcion: 'Consulta general',
  //       duracionEnMinutos: 20,
  //       usuarioId: 1
  //     },
  //     {
  //       id: 2,
  //       costo: 35,
  //       descripcion: 'Consulta con especialista - Dermatología',
  //       duracionEnMinutos: 30,
  //       usuarioId: 1
  //     }
  //   ]
  // })

  await prisma.horarioDia.createMany({
    data: [
      {
        horaInicio: 10,
        horaFin: 14,
        dia: Dia.LUNES,
        servicioId: 1
      },
      {
        horaInicio: 9,
        horaFin: 14,
        dia: Dia.JUEVES,
        servicioId: 1
      },
      {
        horaInicio: 11,
        horaFin: 14,
        dia: Dia.VIERNES,
        servicioId: 1
      },
      {
        horaInicio: 11,
        horaFin: 15,
        dia: Dia.VIERNES,
        servicioId: 2
      },
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })