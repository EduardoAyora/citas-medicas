import { NextApiRequest, NextApiResponse } from "next"

import {prisma} from '../../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
  case 'GET':
    try {
      const servicios = await prisma.servicio.findMany({
        select: {
          id: true, costo: true, descripcion: true, duracionEnMinutos: true, 
          usuario: {
            select: {
              name: true
            }
          }
        }
      })

      return res.status(200).json({ servicios })
    } catch (error) {
      return res.status(500).json({ message: 'Ha ocurrido un error' })
    }
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler