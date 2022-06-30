import { Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../src/lib/db'
import { withMiddleware } from "../../../src/lib/withMiddleware";
import authMiddleware from "../../../src/middlewares/authMiddleware";
import roleMiddleware from "../../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { 
      cedula,
      nombre,
      apellido,
      direccion,
      celular,
      email,
    },
    method,
  } = req
  
  switch (method) {
  case 'POST':
    const persona = await prisma.persona.findUnique({
      where:{
        cedula,
      }
    })

    if (persona) return res.status(400).json({message: 'Ya existe una persona con esa cedula'})

    const personaConCedula = await prisma.persona.findUnique({
      where:{
        email
      }
    })

    if (personaConCedula) return res.status(400).json({message: 'Ya existe una persona con ese email'})

    const personaCreada = await prisma.persona.create({
      data: {
        cedula,
        nombre,
        apellido,
        direccion,
        celular,
        email,
      }
    })
    return res.status(200).json(personaCreada)
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withMiddleware(
  authMiddleware,
  roleMiddleware([Rol.SECRETARY, Rol.DOCTOR, Rol.ADMIN]),
  handler
)