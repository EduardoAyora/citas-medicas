import { Servicio } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

type Data = {
  servicios?: Servicio[]
  message?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req

  switch (method) {
  case 'GET':
    try {
      const servicioId = parseInt(servicio as string)
      const informacionServicio = await prisma.servicio.findUnique({
        where: {
          id: servicioId,
        },
      })

      return res.status(200).json({ cita: citaCreada })
    } catch (error) {
      return res.status(500).json({ message: 'Ha ocurrido un error' })
    }
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}