import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getAvailableTimesToSchedule,
  getDayOfWeekFromDate,
} from '../../../../../controllers/appointmentController'
import { prisma } from '../../../../../lib/db'

export type Data = {
  horarioDisponible?: string[]
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
    const servicioId = parseInt(servicio as string)

    const citasDia = await prisma.cita.findMany({
      where: {
        day: {
          equals: fecha as string,
        },
        servicioId: {
          equals: servicioId,
        },
      },
    })
    const informacionServicio = await prisma.servicio.findUnique({
      where: {
        id: servicioId,
      },
    })

    if (!informacionServicio)
      return res
        .status(404)
        .json({ message: 'El servicio solicitado no se ha encontrado' })

    const informacionHorarioDia = await prisma.horarioDia.findUnique({
      where: {
        servicioId_dia: {
          dia: diaDeLaSemana,
          servicioId,
        },
      },
    })

    if (!informacionHorarioDia)
      return res.status(200).json({
        horarioDisponible: [],
      })

    const { horaInicio, horaFin } = informacionHorarioDia
    const { duracionEnMinutos } = informacionServicio

    const horarioDisponible = getAvailableTimesToSchedule({
      startTime: horaInicio,
      endTime: horaFin,
      newAppointmentDuration: duracionEnMinutos,
      appointments: citasDia,
    })

    return res.status(200).json({
      horarioDisponible,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ha ocurrido un error' })
  }
}
