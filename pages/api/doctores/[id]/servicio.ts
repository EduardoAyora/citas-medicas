import { Dia } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
    body: {
      costo,
      descripcion,
      duracion,
    },
    method,
  } = req
  
  const usuarioId = parseInt(query.id as string)

  switch (method) {
  case 'PUT': {
    const servicio = await prisma.servicio.findFirst({
      where: {
        usuarioId,
      },
    })

    if (!servicio) return res.status(404).json({error: 'No se encontró el servicio del médico'})
    
    await prisma.servicio.update({
      where: {
        id: servicio.id,
      },
      data: {
        costo,
        descripcion,
        duracionEnMinutos: duracion,
      },
    })

    return res.status(200).json({ message: 'Se ha guardado la información del servicio' })
  }

  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler