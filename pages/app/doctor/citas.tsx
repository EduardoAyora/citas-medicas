import { Rol } from '@prisma/client'
import React from 'react'
import VerCitas from '../../../src/components/ver-citas/VerCitas'

const citas = () => {
  return <VerCitas role={Rol.DOCTOR} />
}

export default citas
