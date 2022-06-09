import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Rol } from '@prisma/client'

export default function roleMiddleware(allowedRoles: Rol[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    const message =
      'No tiene los permisos necesarios para acceder a este recurso.'
    if (!session)
      return res.status(403).json({
        message,
      })

    const userRoleIsAllowed = allowedRoles.some(
      (allowedRole) => allowedRole === session.user.role
    )
    if (!userRoleIsAllowed)
      return res.status(403).json({
        message,
      })
  }
}
