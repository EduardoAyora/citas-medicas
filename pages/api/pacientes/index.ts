import { Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../src/lib/db'
import { withMiddleware } from "../../../src/lib/withMiddleware";
import authMiddleware from "../../../src/middlewares/authMiddleware";
import roleMiddleware from "../../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse<{
  pacientes: PacienteResponse[]
}>) {
  const {
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const pacientes = await prisma.paciente.findMany({
      include: {
        persona: true,
      }
    })

    const pacientesFormateados: PacienteResponse[] = pacientes.map(({persona, sexo}) => {
      const {id, nombre, apellido, cedula, direccion, celular, email} = persona
      return {
        sexo,
        id, 
        nombre, 
        apellido, 
        cedula, 
        direccion, 
        celular, 
        email
      }
    })

    return res.status(200).json({
      pacientes: pacientesFormateados
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