import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../src/lib/db'

interface Cita {
  id: number
  day: string
  durationInMinutes: number
  time: string
  doctor: string
  paciente: string
}
async function handler(req: NextApiRequest, res: NextApiResponse<{citas: Cita[]}>) {
  const {
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const citas = await prisma.cita.findMany({
      where: {
        day: {
          gte: new Date().toISOString().split('T')[0]
        }
      },
      include: {
        servicio: {
          include: {
            usuario: true
          }
        },
        paciente: true
      }
    })
    const mappedCitas = citas.map(cita => ({
      id: cita.id,
      day: cita.day,
      durationInMinutes: cita.durationInMinutes,
      time: cita.time,
      doctor: cita.servicio.usuario.name,
      paciente: `${cita.paciente.nombre} ${cita.paciente.apellido}`
    }))

    return res.status(200).json({citas: mappedCitas})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler