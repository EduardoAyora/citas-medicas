import { Rol } from '@prisma/client'
import VerCitas from '../../../src/components/ver-citas/VerCitas'

const Citas = () => {
  return <VerCitas role={Rol.SECRETARY} />
}

export default Citas
