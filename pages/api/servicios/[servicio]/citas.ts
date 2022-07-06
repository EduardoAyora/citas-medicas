import { Cita, Rol } from '@prisma/client'
import { NextApiResponse, NextApiRequest } from 'next'
import { prisma } from '../../../../src/lib/db'
import { withMiddleware } from '../../../../src/lib/withMiddleware'
import authMiddleware from '../../../../src/middlewares/authMiddleware'
import roleMiddleware from '../../../../src/middlewares/roleMiddleware'

export type Data = {
  cita?: Cita
  message?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { servicio },
    body: { day, time, pacienteId },
    method,
  } = req

  switch (method) {
  case 'POST':
    if (!servicio || !day || !time)
      return res
        .status(400)
        .json({ message: 'El servicio el día y la hora son requeridos' })

    try {
      const servicioId = parseInt(servicio as string)

      const informacionServicio = await prisma.servicio.findUnique({
        where: {
          id: servicioId,
        },
      })
      if (!informacionServicio)
        return res
          .status(404)
          .json({ message: 'El servicio solicitado no se ha encontrado' })
      
      const paciente = await prisma.persona.findUnique({
        where: {
          cedula: pacienteId,
        }
      })
      if (!paciente)
        return res
          .status(404)
          .json({ message: 'El paciente no se ha encontrado' })

      const citaCreada = await prisma.cita.create({
        data: {
          day,
          time,
          pacienteId,
          durationInMinutes: informacionServicio.duracionEnMinutos,
          servicioId,
        },
      })

      return res.status(200).json({ cita: citaCreada })
    } catch (error) {
      return res.status(500).json({ message: 'Ha ocurrido un error' })
    }
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withMiddleware(
  authMiddleware,
  roleMiddleware([Rol.SECRETARY, Rol.ADMIN]),
  handler
)
