import { XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

import { getFormattedDateString } from '../../lib/dateFormatters'
import Loading from '../common/Loading'
import ConfirmModal from '../common/ConfirmModal'
import useSuccessError from '../../hooks/modals/useSuccessError'
import SuccessErrorModal from '../common/SuccessErrorModal'

const VerCitas = () => {
  const [appointmentsState, setAppointmentsState] = useState<
    'proximas' | 'pasadas' | 'canceladas'
  >('proximas')
  const [appointments, setAppointments] = useState<CitaResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [idCitaToDelete, setIdCitaToDelete] = useState<number>()

  const {
    isModalOpen,
    isSuccessModal,
    modalMessage,
    setIsModalOpen,
    showModal,
  } = useSuccessError()

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true)
      const response = await fetch(`/api/citas/${appointmentsState}`)
      const { citas } = await response.json()
      setIsLoading(false)
      setAppointments(citas)
    }
    fetchAppointments()
  }, [appointmentsState])

  const cancelAppointment = async () => {
    const response = await fetch(`/api/citas/${idCitaToDelete}/cancelar`, {
      method: 'PUT',
    })
    const { message } = await response.json()
    if (!response.ok) return showModal({ message, isSuccess: false })
    setAppointments(
      appointments.filter((appointment) => appointment.id !== idCitaToDelete)
    )
    setIdCitaToDelete(undefined)
    setIsConfirmModalOpen(false)
    showModal({ message, isSuccess: true })
  }

  const onCancelAppointmentClick = (idCita: number) => {
    setIdCitaToDelete(idCita)
    setIsConfirmModalOpen(true)
  }

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        title='¿Seguro que desea cancelar la cita?'
        message='No podrá deshacer esta acción'
        onConfirm={cancelAppointment}
      />
      <SuccessErrorModal
        isOpen={isModalOpen}
        isSuccess={isSuccessModal}
        message={modalMessage}
        setIsOpen={setIsModalOpen}
      />
      <main className='relative z-0 flex-1 overflow-y-auto focus:outline-none max-w-[1700px]'>
        <div className='py-8'>
          <div className='block min-h-[80px] justify-between px-4 sm:flex sm:px-6 md:px-8'>
            <div className='mb-8 w-full'>
              <h1 className='font-cal mb-1 text-xl font-bold capitalize tracking-wide text-gray-900'>
                Citas
              </h1>
              <p className='min-h-10 text-sm text-neutral-500 ltr:mr-4 rtl:ml-4'>
                Mira las citas próximas y pasadas.
              </p>
            </div>
          </div>
          <div className='px-4 sm:px-6 md:px-8'>
            <div></div>
            <nav className='no-scrollbar -mb-px flex space-x-5 rtl:space-x-reverse sm:rtl:space-x-reverse'>
              <button
                onClick={() => setAppointmentsState('proximas')}
                className={`text-neutral-900 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium ${
                  appointmentsState === 'proximas'
                    ? 'border-neutral-900'
                    : 'border-transparent'
                }`}
              >
                Próximas
              </button>
              <button
                onClick={() => setAppointmentsState('pasadas')}
                className={`text-neutral-900 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium ${
                  appointmentsState === 'pasadas'
                    ? 'border-neutral-900'
                    : 'border-transparent'
                }`}
              >
                Pasadas
              </button>
              <button
                onClick={() => setAppointmentsState('canceladas')}
                className={`text-neutral-900 group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium ${
                  appointmentsState === 'canceladas'
                    ? 'border-neutral-900'
                    : 'border-transparent'
                }`}
              >
                Canceladas
              </button>
            </nav>
            <hr />
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
                            {appointments.map(
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
                                const appointmentDate = new Date(day)
                                const formattedDate = getFormattedDateString(
                                  new Date(
                                    appointmentDate.getUTCFullYear(),
                                    appointmentDate.getUTCMonth(),
                                    appointmentDate.getUTCDate()
                                  )
                                )
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
          </div>
          <div className='block pt-12 md:hidden'></div>
        </div>
      </main>
    </div>
  )
}

export default VerCitas
