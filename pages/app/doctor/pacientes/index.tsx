import { Paciente } from '@prisma/client'
import { useEffect, useState } from 'react'
import Loading from '../../../../src/components/common/Loading'

import PageLayout from '../../../../src/components/layout/PageLayout'

const Index = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true)
      const response = await fetch(`/api/pacientes`)
      const { pacientes } = await response.json()
      setIsLoading(false)
      setPacientes(pacientes)
    }
    fetchAppointments()
  }, [])

  return (
    <PageLayout
      pageTitle='Pacientes'
      pageDescription='Listado de todos los pacientes'
    >
      <main>
        <div className='-mx-4 flex flex-col sm:mx-auto'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
              {isLoading ? (
                <div className='p-4 flex justify-center items-center mt-12'>
                  <Loading isDarkMode={false} />
                </div>
              ) : (
                <div className='mt-6 overflow-hidden rounded-sm border border-b border-gray-200'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <tbody
                      className='divide-y divide-gray-200 bg-white'
                      data-testid='bookings'
                    >
                      {pacientes.map(
                        (
                          {
                            id,
                            day,
                            durationInMinutes,
                            time,
                            doctor,
                            paciente,
                          },
                          index
                        ) => {
                          return (
                            <tr
                              key={index}
                              className='flex hover:bg-neutral-50 px-6'
                            >
                              <td className='hidden align-top ltr:pl-6 rtl:pr-6 sm:table-cell sm:w-64'>
                                <div className='cursor-pointer py-4'>
                                  <div className='text-sm leading-6 text-gray-900'>
                                    {formattedDate}
                                  </div>
                                  <div className='text-sm text-gray-500'>
                                    {time}
                                  </div>
                                  <div className='text-sm text-gray-400'></div>
                                </div>
                              </td>
                              <td className='flex-1 ltr:pl-4 rtl:pr-4'>
                                <div className='cursor-pointer py-4'>
                                  <div className='sm:hidden'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      <span>{formattedDate}</span>{' '}
                                      <small className='text-sm text-gray-500'>
                                        {time}
                                      </small>
                                    </div>
                                  </div>
                                  <div
                                    title='30 Min Meeting between Antonio Ochoa and Eduardo Ayora'
                                    className='max-w-56 truncate text-sm font-medium leading-6 text-neutral-900 md:max-w-max'
                                  >
                                    {`Cita de ${durationInMinutes} minutos del paciente ${paciente} con el doctor/a ${doctor}`}
                                  </div>
                                </div>
                              </td>
                              <td className='whitespace-nowrap py-4 text-right text-sm font-medium ltr:pr-4 rtl:pl-4'>
                                {appointmentsState === 'proximas' && (
                                  <div className='hidden space-x-2 rtl:space-x-reverse lg:block'>
                                    <button
                                      onClick={() =>
                                        onCancelAppointmentClick(id)
                                      }
                                      aria-label={`cancelar-${index}`}
                                      className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:bg-transparent'
                                    >
                                      <XIcon className='inline -ml-1 h-5 w-5 ltr:mr-2 rtl:ml-2 rtl:-mr-1' />
                                      Cancelar
                                    </button>
                                  </div>
                                )}
                                <div className='inline-block text-left lg:hidden'>
                                  <button
                                    type='button'
                                    id='radix-:r1i:'
                                    aria-haspopup='menu'
                                    data-state='closed'
                                    className='inline-flex items-center bg-transparent px-3 py-2 text-sm font-medium hover:bg-gray-50 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-1 group-hover:text-black h-[38px] w-[38px] cursor-pointer rounded-sm border border-transparent text-neutral-500 hover:border-gray-300 hover:text-neutral-900'
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      aria-hidden='true'
                                      className='h-5 w-5 group-hover:text-gray-800'
                                    >
                                      <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              <div className='p-4 text-center'>
                <button
                  disabled={false}
                  className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative text-gray-400 bg-transparent cursor-not-allowed'
                >
                  No hay más resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}

export default Index
