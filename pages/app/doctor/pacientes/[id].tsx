import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Loading from '../../../../src/components/common/Loading'
import PageLayout from '../../../../src/components/layout/PageLayout'
import useSuccessError from '../../../../src/hooks/modals/useSuccessError'
import SuccessErrorModal from '../../../../src/components/common/SuccessErrorModal'

const Paciente = () => {
  const [paciente, setPaciente] = useState<PacienteResponse>()
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)
  const [isCreateHistoryRecordLoading, setIsCreateHistoryRecordLoading] =
    useState(false)
  const router = useRouter()

  const {
    isModalOpen,
    isSuccessModal,
    modalMessage,
    setIsModalOpen,
    showModal,
  } = useSuccessError()

  const motivoInputRef = useRef<HTMLTextAreaElement>(null)
  const tratamientoInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { id } = router.query
      if (!id) return
      const pacienteData = await fetch(`/api/pacientes/${id}`)
      const { paciente, message } = await pacienteData.json()
      if (!pacienteData.ok) alert(message)
      setPaciente(paciente)
    }
    fetchData()
  }, [router.query])

  const crearRegistroDeHistoriaClinica = async () => {
    if (!paciente) return
    if (!paciente.historiaClinica) return
    const motivo = motivoInputRef.current?.value
    const tratamiento = tratamientoInputRef.current?.value
    if (!motivo || !tratamiento)
      return showModal({
        isSuccess: false,
        message: 'El motivo de la consulta y el tratamiento son obligatorios',
      })
    const { id } = router.query
    if (!id) return
    setIsCreateHistoryRecordLoading(true)
    const pacienteData = await fetch(`/api/pacientes/${id}/historia-clinica`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ motivo, tratamiento }),
    })
    type Response = { registroHistoria: RegistroHistoriaClinica } & {
      message: string
    }
    const pacienteJSON: Response = await pacienteData.json()
    setIsCreateHistoryRecordLoading(false)
    console.log(pacienteJSON)

    if (!pacienteData.ok)
      return showModal({
        isSuccess: false,
        message: pacienteJSON.message,
      })
    const newHistory = [
      {
        motivoConsulta: pacienteJSON.registroHistoria.motivoConsulta,
        tratamiento: pacienteJSON.registroHistoria.tratamiento,
        fecha: pacienteJSON.registroHistoria.fecha,
      },
      ...paciente.historiaClinica,
    ]
    setPaciente({ ...paciente, historiaClinica: newHistory })
    setIsAddMenuOpen(false)
  }

  return (
    <div>
      {!paciente ? (
        <div className='flex justify-center h-full'>
          <Loading isDarkMode={false} />
        </div>
      ) : (
        <PageLayout
          pageTitle={`Paciente ${paciente.nombre} ${paciente.apellido}`}
          pageDescription={`Cédula: ${paciente.cedula} / Celular: ${paciente.celular} / Email: ${paciente.email} / Dirección: ${paciente.direccion}`}
        >
          <>
            <SuccessErrorModal
              isOpen={isModalOpen}
              isSuccess={isSuccessModal}
              message={modalMessage}
              setIsOpen={setIsModalOpen}
            />
            <div>
              <button
                onClick={() => {
                  setIsAddMenuOpen(!isAddMenuOpen)
                }}
                className='button'
              >
                {isAddMenuOpen ? '-' : '+'} Agregar registro a historia clínica
              </button>
              {isAddMenuOpen &&
                (isCreateHistoryRecordLoading ? (
                  <div className='flex justify-center items-center h-20'>
                    <Loading isDarkMode={false} />
                  </div>
                ) : (
                  <>
                    <div className='mb-4 mt-4'>
                      <label
                        htmlFor='motivo_consulta'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Motivo de consulta
                      </label>
                      <div className='mt-1'>
                        <textarea
                          ref={motivoInputRef}
                          rows={4}
                          id='motivo_consulta'
                          className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                          placeholder='Motivo de consulta'
                        />
                      </div>
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor='tratamiento'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Tratamiento
                      </label>
                      <div className='mt-1'>
                        <textarea
                          ref={tratamientoInputRef}
                          rows={4}
                          id='tratamiento'
                          className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                          placeholder='Tratamiento'
                        />
                      </div>
                    </div>
                    <div className='flex items-start justify-end space-x-2 rtl:space-x-reverse mb-4'>
                      <button
                        type='button'
                        onClick={crearRegistroDeHistoriaClinica}
                        className='button'
                      >
                        Agregar
                      </button>
                    </div>
                  </>
                ))}
            </div>
            <main>
              <div className='-mx-4 flex flex-col sm:mx-auto'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                    <div className='mt-6 overflow-hidden rounded-sm border border-b border-gray-200'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <tbody
                          className='divide-y divide-gray-200 bg-white'
                          data-testid='bookings'
                        >
                          {paciente.historiaClinica &&
                            paciente.historiaClinica.map(
                              (
                                { fecha, motivoConsulta, tratamiento },
                                index
                              ) => {
                                return (
                                  <tr key={index} className='flex px-6'>
                                    <td className='hidden align-top ltr:pl-6 rtl:pr-6 sm:table-cell sm:w-32'>
                                      <div className='py-4'>
                                        <div className='text-sm leading-6 text-gray-900'>
                                          {new Date(fecha).toLocaleDateString()}
                                        </div>
                                        <div className='text-sm text-gray-400'></div>
                                      </div>
                                    </td>
                                    <td className='flex-1 ltr:pl-4 rtl:pr-4'>
                                      <div className='py-4'>
                                        <div className='max-w-56 w-full text-sm font-medium leading-6 text-neutral-900'>
                                          <div className='grid grid-cols-1 xl:grid-cols-1 gap-4 w-full'>
                                            <div>
                                              <div className='font-bold'>
                                                Motivo de consulta:
                                              </div>
                                              <p className='font-normal'>
                                                {motivoConsulta}
                                              </p>
                                            </div>
                                            <div>
                                              <div className='font-bold'>
                                                Tratamiento:
                                              </div>{' '}
                                              <p className='font-normal'>
                                                {tratamiento}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                    <div className='p-4 text-center'>
                      <button className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative text-gray-400 bg-transparent cursor-not-allowed'>
                        No hay más resultados
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </>
        </PageLayout>
      )}
    </div>
  )
}

export default Paciente
