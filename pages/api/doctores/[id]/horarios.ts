import { Dia } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
    body,
    method,
  } = req
  
  const usuarioId = parseInt(query.id as string)

  switch (method) {
  case 'GET': {
    const servicio = await prisma.servicio.findFirst({
      where: {
        usuarioId,
      },
    })

    if (!servicio) return res.status(404).json({error: 'No se encontró el servicio del médico'})
    const servicioId = servicio.id
    
    const horarios = await prisma.horarioDia.findMany({
      where:{
        servicioId
      }
    })

    return res.status(200).json({ horarios })
  }
  case 'POST': {
    const servicio = await prisma.servicio.findFirst({
      where: {
        usuarioId,
      },
    })

    if (!servicio) return res.status(404).json({error: 'No se encontró el servicio del médico'})
    const servicioId = servicio.id

    const dayKeys = Object.keys(body)
    for (const dayKey of dayKeys) {
      const dia = dayKey as Dia
      const horaInicio = parseInt(body[dia].inicio) || null
      const horaFin = parseInt(body[dia].fin) || null
      
      await prisma.horarioDia.upsert({
        where: {
          servicioId_dia: {
            servicioId,
            dia,
          }
        },
        update: {
          horaInicio,
          horaFin,
        },
        create: {
          servicioId,
          horaInicio,
          horaFin,
          dia,
        },
      })
    }

    return res.status(200).json({ message: 'Se han guardado los horarios' })
  }

  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler