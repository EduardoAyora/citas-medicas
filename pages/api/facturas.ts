import { Factura, Persona } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse<{ facturas: (Factura & { cliente: Persona; })[]; }>) {
  const {
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const facturas = await prisma.factura.findMany({
      include: {
        cliente: true,
      }
    })

    return res.status(200).json({facturas})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler