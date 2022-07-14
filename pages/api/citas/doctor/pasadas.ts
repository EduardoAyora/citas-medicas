import { Rol } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../src/lib/db'
import { withMiddleware } from "../../../../src/lib/withMiddleware";
import authMiddleware from "../../../../src/middlewares/authMiddleware";
import roleMiddleware from "../../../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse<{citas: CitaResponse[]}>) {
  const {
    body: {
      session: {
        user: {
          id
        }
      }
    },
    method,
  } = req
  
  switch (method) {
  case 'GET':
    const citas = await prisma.cita.findMany({
      where: {
        day: {
          lt: new Date().toISOString().split('T')[0]
        },
        servicioId: id,
      },
      orderBy: [
        {
          day: 'asc',
        },
        {
          time: 'asc',
        }
      ],
      include: {
        servicio: {
          include: {
            usuario: true
          }
        },
        paciente: true
      }
    })
    const mappedCitas = citas.map(cita => ({
      id: cita.id,
      day: cita.day,
      durationInMinutes: cita.durationInMinutes,
      time: cita.time,
      doctor: cita.servicio.usuario.name,
      paciente: `${cita.paciente.nombre} ${cita.paciente.apellido}`
    }))

    return res.status(200).json({citas: mappedCitas})
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withMiddleware(
  authMiddleware,
  roleMiddleware([Rol.SECRETARY, Rol.DOCTOR, Rol.ADMIN]),
  handler
)