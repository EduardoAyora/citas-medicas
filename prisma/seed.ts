import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.cita.createMany({
    data: [
      {
        time: '11:30',
        durationInMinutes: 45,
        day: '2022-05-26',
        servicioId: 1,
      },
      {
        time: '12:40',
        durationInMinutes: 45,
        day: '2022-05-26',
        servicioId: 1,
      },
      {
        time: '11:20',
        durationInMinutes: 20,
        day: '2022-05-27',
        servicioId: 1,
      },
      {
        time: '12:00',
        durationInMinutes: 20,
        day: '2022-05-27',
        servicioId: 1,
      },
      {
        time: '12:40',
        durationInMinutes: 20,
        day: '2022-05-27',
        servicioId: 1,
      },
      {
        time: '12:30',
        durationInMinutes: 20,
        day: '2022-05-27',
        servicioId: 2,
      },
    ],
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