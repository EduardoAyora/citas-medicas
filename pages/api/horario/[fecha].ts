import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'

type Data = {
  horarioDia: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
  } = req

  const citasDia = await prisma.cita.findMany()

  const horarioDia: string[] = []
  res.status(200).json({ horarioDia })
}
