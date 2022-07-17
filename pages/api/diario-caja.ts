import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const currentDate = new Date()
    const facturasDelDia = await prisma.factura.findMany({
      where: {
        fecha: {
          gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
          lte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
        }
      },
      include: {
        cliente: true,
      }
    })

    const cobrosDelDia = facturasDelDia.map(factura => ({
      nombre: factura.cliente.nombre,
      apellido: factura.cliente.apellido,
      total: factura.total,
      descripcionServicio: factura.descripcionServicio,
    }))

    return res.status(200).json({cobrosDelDia})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler