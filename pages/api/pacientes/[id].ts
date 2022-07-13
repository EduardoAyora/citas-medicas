import { Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../src/lib/db'
import { withMiddleware } from "../../../src/lib/withMiddleware";
import authMiddleware from "../../../src/middlewares/authMiddleware";
import roleMiddleware from "../../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse<{
  paciente?: PacienteResponse
  message?: string
}>) {
  const {
    query: {
      id
    },
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const paciente = await prisma.paciente.findUnique({
      where: {
        personaId: Number(id)
      },
      include: {
        persona: true,
        historiaClinica: true,
      }
    })
    if (!paciente) return res.status(404).json({
      message: 'Paciente no encontrado'
    })

    const {sexo} = paciente
    const {persona, historiaClinica} = paciente
    const {nombre, apellido, cedula, direccion, celular, email} = persona

    const historiaClinicaFormateada = historiaClinica.map(hc => {
      const {fecha, motivoConsulta, tratamiento} = hc
      return {
        fecha,
        motivoConsulta,
        tratamiento,
      }
    })

    const pacienteFormateado: PacienteResponse =  {
      sexo,
      id: persona.id, 
      nombre, 
      apellido, 
      cedula, 
      direccion, 
      celular, 
      email,
      historiaClinica: historiaClinicaFormateada
    }
    
    return res.status(200).json({
      paciente: pacienteFormateado
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