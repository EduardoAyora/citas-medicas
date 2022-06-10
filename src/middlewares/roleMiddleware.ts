import { NextApiRequest, NextApiResponse } from 'next'
import { Rol } from '@prisma/client'

export default function roleMiddleware(allowedRoles: Rol[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = req.body.session
    const userRoleIsAllowed = allowedRoles.some(
      (allowedRole) => allowedRole === session.user.role
    )
    if (!userRoleIsAllowed)
      return res.status(403).json({
        message:
          'No tiene los permisos necesarios para acceder a este recurso.',
      })
  }
}
