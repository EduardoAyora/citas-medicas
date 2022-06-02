import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import 'isomorphic-fetch'

export default async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.json({
      error: 'You must be sign in to view the protected content on this page.',
    })
  }
}
