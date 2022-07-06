import { CheckCircleIcon } from '@heroicons/react/solid'
import { RefreshIcon } from '@heroicons/react/outline'
import MainCard from '../layout/MainCard'

interface Props {
  onGoBack: () => void
}

const Exito: React.FC<Props> = ({ onGoBack }) => {
  return (
    <MainCard>
      <>
        <button
          onClick={onGoBack}
          type='button'
          className='absolute right-0 -top-12 inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm border border-gray-300 text-gray-700 bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:bg-primary dark:text-white dark:border-gray-600'
        >
          <RefreshIcon className='w-5 h-5' />{' '}
          <span className='ml-2'>Agendar nueva cita</span>
        </button>
        <div className='flex flex-col w-full justify-center items-center dark:text-white py-20'>
          <CheckCircleIcon className='h-36 w-36 text-green-500' />
          <p className='text-xl'>Se ha agendado la cita</p>
        </div>
      </>
    </MainCard>
  )
}

export default Exito
