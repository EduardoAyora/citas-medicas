import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const usuarioId = parseInt(query.id as string)

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
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler