import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAvailableTimesToSchedule,
  getDayOfWeekFromDate,
} from '../../../../../controllers/appointmentController'
import { prisma } from '../../../../../lib/db'

type Data = {
  horarioDia?: string[]
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { fecha, servicio } = req.query
  if (!fecha) return res.status(400).json({ message: 'La fecha es requerida' })

  const diaDeLaSemana = getDayOfWeekFromDate(fecha as string)
  if (!diaDeLaSemana)
    return res.status(400).json({ message: 'La fecha no es válida' })

  try {
    const citasDia = await prisma.cita.findMany({
      where: {
        day: {
          equals: fecha as string,
        },
      },
    })

    const horarioDia = getAvailableTimesToSchedule({
      startTime: 11,
      endTime: 14,
      newAppointmentDuration: 20,
      appointments: citasDia,
    })

    return res.status(200).json({
      horarioDia,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ha ocurrido un error' })
  }
}
