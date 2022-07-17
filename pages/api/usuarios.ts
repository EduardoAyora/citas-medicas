import { Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../src/lib/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { username, password, nombre, apellido, email, cedula, celular, direccion, role },
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

    const persona = await prisma.persona.upsert({
      where: {
        cedula
      },
      create: {
        nombre,
        apellido,
        email,
        cedula,
        celular,
        direccion
      },
      update: {
        nombre,
        apellido,
        email,
        cedula,
        celular,
        direccion
      }
    })

    const usuarioCreado = await prisma.usuario.create({
      data: {
        personaId: persona.id,
        name: `${nombre} ${apellido}`,
        password,
        username,
        role,
      }
    })

    if (role !== Rol.DOCTOR) return res.status(200).json({message: 'Usuario creado'})

    const servicio = await prisma.servicio.findFirst({
      where: {
        usuarioId: usuarioCreado.id
      }
    })

    if (!servicio) {
      await prisma.servicio.create({
        data: {
          costo: 15,
          descripcion: '',
          duracionEnMinutos: 20,
          usuarioId: usuarioCreado.id,
        }
      })
    }

    return res.status(200).json({message: 'Usuario creado'})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler