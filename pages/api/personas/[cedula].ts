import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query,
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const cedula = query.cedula as string
    
    const persona = await prisma.persona.findUnique({
      where:{
        cedula
      }
    })

    if (!persona) return res.status(404).json({message: 'No se encontró la persona'})

    return res.status(200).json(persona)
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler