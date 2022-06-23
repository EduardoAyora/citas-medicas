import { CheckCircleIcon } from '@heroicons/react/solid'
import MainCard from '../layout/MainCard'

const Exito = () => {
  return (
    <MainCard>
      <div className='flex flex-col w-full justify-center items-center text-white py-20'>
        <CheckCircleIcon className='h-36 w-36 text-green-500' />
        <p className='text-lg'>Se ha agendado la cita</p>
      </div>
    </MainCard>
  )
}

export default Exito
