import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({
      error: 'Primero debe autenticarse.',
    })
  }
  
  if (typeof req.body === 'string') {
    if (req.body) req.body = JSON.parse(req.body)
    else req.body = {}
  }
    
  req.body.session = session
}
