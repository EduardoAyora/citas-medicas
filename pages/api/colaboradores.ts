import { Rol, Usuario } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from '../../src/lib/db'
import { withMiddleware } from "../../src/lib/withMiddleware";
import authMiddleware from "../../src/middlewares/authMiddleware";
import roleMiddleware from "../../src/middlewares/roleMiddleware";

async function handler(req: NextApiRequest, res: NextApiResponse<{
    colaboradores?: Usuario[],
    message?: string
  }>) {
  const {
    body,
    method,
  } = req
    
  switch (method) {
  case 'GET':
    const colaboradores = await prisma.usuario.findMany({
      include: {
        persona: true,
      }
    })
  
    return res.status(200).json({
      colaboradores
    })
  default:
    return res.status(405).end(`Method ${method} Not Allowed`)
  }
}
  
export default withMiddleware(
  authMiddleware,
  roleMiddleware([Rol.SECRETARY, Rol.DOCTOR, Rol.ADMIN]),
  handler
)
