import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
    method,
  } = req
  
  switch (method) {
  case 'PUT':
    const idCita = parseInt(query.cita as string) 
    await prisma.cita.update({
      where: { id: idCita },
      data: { esCancelada: true }
    })
    return res.status(200).json({message: 'Cita cancelada'})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler