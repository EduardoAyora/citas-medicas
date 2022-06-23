import React, { SetStateAction } from 'react'

import Prueba from '../Prueba'

interface Props {
  availableHours: string[]
  setHour: React.Dispatch<SetStateAction<string | undefined>>
}

const HorarioDia: React.FC<Props> = ({ availableHours, setHour }) => {
  return (
    <>
      {/* <Prueba /> */}
      <div className='mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5'>
        <div className='mb-4 text-left text-lg font-light text-gray-600'>
          <span className='text-bookingdarker w-1/2'>
            <strong>Thursday</strong>
            <span className='text-bookinglight'>, 23 June</span>
          </span>
        </div>
        <ul className='flex-grow overflow-y-auto md:h-[364px]'>
          {availableHours.map((availableHour, indice) => (
            <li key={indice}>
              <button
                onClick={() => setHour(availableHour)}
                className='text-gray-900 w-full hover:bg-brand hover:text-brandcontrast mb-2 block rounded-sm border-2 bg-white py-4 font-medium hover:text-white hover:bg-black border-black'
              >
                {availableHour}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HorarioDia
