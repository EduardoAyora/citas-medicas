import { Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../../src/lib/db'
import { withMiddleware } from "../../../src/lib/withMiddleware";
import authMiddleware from "../../../src/middlewares/authMiddleware";
import roleMiddleware from "../../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse<{
  pacientes?: PacienteResponse[],
  pacienteCreado?: PacienteResponse,
  message?: string
}>) {
  const {
    body,
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
  case 'POST':
    const { 
      cedula,
      nombre,
      apellido,
      direccion,
      celular,
      email,
      sexo
    } = body

    const paciente = await prisma.paciente.findFirst({
      where:{
        persona: {
          cedula
        }
      }
    })
  
    if (paciente) return res.status(400).json({message: 'Ya existe un paciente con esa cédula'})

    const persona = await prisma.persona.findUnique({
      where: {
        cedula
      }
    })
    const personaCreada = persona ? persona : await prisma.persona.create({
      data: {
        cedula,
        nombre,
        apellido,
        direccion,
        celular,
        email,
      }
    })
  
    const pacienteCreado = await prisma.paciente.create({
      data: {
        sexo: sexo,
        personaId: personaCreada.id
      }
    })
    return res.status(200).json({
      pacienteCreado: {
        id: personaCreada.id,
        apellido: personaCreada.apellido,
        nombre: personaCreada.nombre,
        cedula: personaCreada.cedula,
        direccion: personaCreada.direccion,
        celular: personaCreada.celular,
        email: personaCreada.email,
        sexo: pacienteCreado.sexo
      }
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