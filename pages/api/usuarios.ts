import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { username, password, name, role },
    method,
  } = req
  
  switch (method) {
  case 'POST':
    const usuario = await prisma.usuario.findUnique({
      where:{
        username
      }
    })

    if (usuario) return res.status(400).json({message: 'El usuario ya existe'})

    const citaCreada = await prisma.usuario.create({
      data: {
        name,
        password,
        username,
        role,
      }
    })
    return res.status(200).json(citaCreada)
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler