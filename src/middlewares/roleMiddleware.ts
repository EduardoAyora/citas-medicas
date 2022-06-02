import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Rol } from '@prisma/client'
import 'isomorphic-fetch'

export default async function roleMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session || session.user.role !== Rol.SECRETARY) {
    return res.status(403).json({
      message: 'No tiene los permisos necesarios para acceder a este recurso.',
    })
  }
}
