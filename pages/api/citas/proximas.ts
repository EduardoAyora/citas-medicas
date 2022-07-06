import { Cita } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../src/lib/db'

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
        }
      }
    })

    return res.status(200).json({citas})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler