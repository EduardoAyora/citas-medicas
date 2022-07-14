import { RegistroHistoriaClinica, Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../../src/lib/db'
import { withMiddleware } from "../../../../src/lib/withMiddleware";
import authMiddleware from "../../../../src/middlewares/authMiddleware";
import roleMiddleware from "../../../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse<{
  registroHistoria?: RegistroHistoriaClinica
  message?: string
}>) {
  const {
    query: {
      id
    },
    body: {
      motivo,
      tratamiento
    },
    method,
  } = req
  
  switch (method) {
  case 'POST':
    const paciente = await prisma.paciente.findUnique({
      where: {
        personaId: Number(id)
      }
    })
    if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' })

    const registroHistoria = await prisma.registroHistoriaClinica.create({
      data: {
        motivoConsulta: motivo,
        tratamiento,
        fecha: new Date(),
        pacienteId: paciente.personaId
      }
    })
    
    return res.status(200).json({
      registroHistoria
    })
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withMiddleware(
  authMiddleware,
  roleMiddleware([Rol.SECRETARY, Rol.DOCTOR, Rol.ADMIN]),
  handler
)