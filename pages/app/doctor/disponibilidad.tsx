import { useEffect, useState } from 'react'

import PageLayout from '../../../src/components/layout/PageLayout'
import Combobox from '../../../src/components/common/Combobox'
import { getFormattedHourFromTimeInHours } from '../../../src/controllers/appointmentController'
import { useSession } from 'next-auth/react'

const Disponibilidad = () => {
  const { data } = useSession()
  const [horarios, setHorarios] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getHorarios = async () => {
      setIsLoading(true)
      if (!data) return
      const horariosData = await fetch(
        `/api/doctores/${data.user.id}/horarios`
      )
      const horarios = await horariosData.json()
      setHorarios(horarios)
      setIsLoading(false)
    }
    getHorarios()
  }, [data])

  const availableHours = Array.from(Array(24).keys()).map((hour) => ({
    value: hour.toString(),
    text: `${getFormattedHourFromTimeInHours(hour)}:00`,
  }))

  return (
    <PageLayout
      pageTitle='Horas de trabajo'
      pageDescription='Cambia los horarios de inicio y fin de tu días'
    >
      <>
        <div className='col-span-3 space-y-2 lg:col-span-2'>
          <div className='divide-y rounded-sm border border-gray-200 bg-white px-4 py-5 sm:p-6'>
            <h3 className='mb-5 text-base font-medium leading-6 text-gray-900'>
              Cambia los horarios de inicio y fin de tu días
            </h3>
            <fieldset className='divide-y divide-gray-200'>
              <fieldset className='relative flex flex-col justify-between space-y-2 py-5 sm:flex-row sm:space-y-0'>
                <label className='flex space-x-2 rtl:space-x-reverse w-1/3'>
                  <div className='w-full'>
                    <input
                      type='checkbox'
                      className='inline-block rounded-sm border-gray-300 text-neutral-900 focus:ring-neutral-500'
                    />
                    <span className='ml-2 inline-block text-sm capitalize'>
                      Miércoles
                    </span>
                  </div>
                </label>
                <div className='flex-grow'>
                  <div className='space-y-2'>
                    <div className='flex items-center rtl:space-x-reverse'>
                      <div className='flex flex-grow sm:flex-grow-0'>
                        <div className='flex flex-grow items-center space-x-3'>
                          <Combobox options={availableHours} />
                          <span>-</span>
                          <Combobox options={availableHours} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset className='relative flex flex-col justify-between space-y-2 py-5 sm:flex-row sm:space-y-0'>
                <label className='flex space-x-2 rtl:space-x-reverse w-full'>
                  <div className='w-1/3'>
                    <input
                      type='checkbox'
                      className='inline-block rounded-sm border-gray-300 text-neutral-900 focus:ring-neutral-500'
                    />
                    <span className='ml-2 inline-block text-sm capitalize'>
                      Sábado
                    </span>
                  </div>
                  <div className='flex-grow text-right text-sm text-gray-500 sm:flex-shrink'>
                    No disponible
                  </div>
                </label>
              </fieldset>
              <fieldset className='relative flex flex-col justify-between space-y-2 py-5 sm:flex-row sm:space-y-0'>
                <label className='flex space-x-2 rtl:space-x-reverse w-full'>
                  <div className='w-1/3'>
                    <input
                      type='checkbox'
                      className='inline-block rounded-sm border-gray-300 text-neutral-900 focus:ring-neutral-500'
                    />
                    <span className='ml-2 inline-block text-sm capitalize'>
                      Domingo
                    </span>
                  </div>
                  <div className='flex-grow text-right text-sm text-gray-500 sm:flex-shrink'>
                    No disponible
                  </div>
                </label>
              </fieldset>
            </fieldset>
          </div>
          <div className='space-x-2 text-right'>
            <button className='text-white inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent dark:text-darkmodebrandcontrast text-brandcontrast bg-gray-900 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900'>
              Guardar
            </button>
          </div>
        </div>
      </>
    </PageLayout>
  )
}

export default Disponibilidad
