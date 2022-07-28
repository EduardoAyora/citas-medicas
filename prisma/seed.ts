import { Dia, PrismaClient, Rol } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.admin.create({
    data: {
      email: 'admin@gmail.com',
      password: 'admin',
      id: 1,
    }
  })

  await prisma.persona.createMany({
    data: [
      {
        id: 1,
        adminId: 1,
        nombre: 'Eduardo',
        apellido: 'Ayora',
        cedula: '0101010151',
        direccion: 'calle falsa 123',
        celular: '1234567890',
        email: 'j@gmail.com',
      },
      {
        id: 2,
        adminId: 1,
        nombre: 'Karen',
        apellido: 'Ayora',
        cedula: '0101010152',
        direccion: 'calle falsa 123',
        celular: '1234567890',
        email: 'k@gmail.com',
      },
      {
        id: 3,
        adminId: 1,
        nombre: 'Admin',
        apellido: '',
        cedula: '0101010153',
        direccion: 'calle falsa 123',
        celular: '1234567890',
        email: 'a@gmail.com',
      },
    ]
  })
  await prisma.usuario.createMany({
    data: [
      {
        id: 1,
        name: 'Eduardo Ayora',
        password: '123',
        username: 'edu',
        role: Rol.DOCTOR,
        personaId: 1,
      },
      {
        id: 2,
        name: 'Karen Ayora',
        password: '123',
        username: 'karen',
        role: Rol.SECRETARY,
        personaId: 2
      },
      {
        id: 3,
        name: 'Admin',
        password: '123',
        username: 'admin',
        role: Rol.ADMIN,
        personaId: 3
      },
    ]
  })
    
  await prisma.servicio.createMany({
    data: [
      {
        id: 1,
        costo: 20,
        descripcion: 'Consulta general',
        duracionEnMinutos: 20,
        usuarioId: 1
      }
    ]
  })

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