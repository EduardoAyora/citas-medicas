import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const facturasDelDia = await prisma.factura.findMany({
      where: {
        fecha: new Date()
      }
    })

    return res.status(200).json({cobrosDelDia: facturasDelDia})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler