import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import 'isomorphic-fetch'

export default async function roleMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(403).json({
      error: 'No tiene los permisos necesarios para acceder a este recurso.',
    })
  }
}
