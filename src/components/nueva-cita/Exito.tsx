import { CheckCircleIcon } from '@heroicons/react/solid'

const Exito = () => {
  return (
    <main className='mx-auto sm:my-24 my-0 max-w-3xl'>
      <div className='main overflow-hidden border border-gray-200 dark:border-1 bg-white dark:bg-gray-800 rounded-md dark:border-gray-600 sm:border'>
        <div className='px-4 py-5 sm:flex sm:p-4'>
          <div className='flex flex-col w-full justify-center items-center text-white py-20'>
            <CheckCircleIcon className='h-36 w-36 text-green-500' />
            <p className='text-lg'>Se ha agendado la cita</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Exito
