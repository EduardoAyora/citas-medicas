import { useState, useRef } from 'react'
import { Persona } from 'prisma/prisma-client'

interface Props {
  onScheduleClick: () => void
}

const Paciente: React.FC<Props> = ({ onScheduleClick }) => {
  const [isScheduleButtonEnabled, setIsScheduleButtonEnabled] =
    useState<boolean>(false)
  const [isCreatePatientEnabled, setIsCreatePatientEnabled] =
    useState<boolean>(false)
  const [patient, setPatient] = useState<Persona>()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const createPatientNameInputRef = useRef<HTMLInputElement>(null)
  const createPatientIdInputRef = useRef<HTMLInputElement>(null)

  const searchPatient = async () => {
    const id = searchInputRef.current?.value
    const patientData = await fetch(`/api/personas/${id}`)
    if (!patientData.ok) return setIsScheduleButtonEnabled(false)
    const patient = await patientData.json()
    setPatient(patient)
    setIsScheduleButtonEnabled(true)
  }

  const createPatient = async () => {
    const id = createPatientIdInputRef.current?.value
    const name = createPatientNameInputRef.current?.value
    const patientData = await fetch(`/api/personas`, {
      method: 'POST',
      body: JSON.stringify({ id, name }),
    })
    if (!patientData.ok) return setIsScheduleButtonEnabled(false)
    const patient = await patientData.json()
    setPatient(patient)
    setIsScheduleButtonEnabled(true)
  }

  return (
    <>
      <main className='mx-auto sm:my-24 my-0 max-w-3xl'>
        <div className='main overflow-hidden border border-gray-200 dark:border-1 bg-white dark:bg-gray-800 rounded-md dark:border-gray-600 sm:border'>
          <div className='px-4 py-5 sm:flex sm:p-4'>
            <div className='sm:w-1/2 sm:border-r sm:dark:border-gray-700'>
              <ul className=''>
                <li className='-mr-2 inline-block'>
                  <span>
                    <span></span>
                  </span>
                </li>
              </ul>
              <h2 className='font-cal text-bookinglight mt-2 font-medium dark:text-gray-300'>
                Nombre Médico
              </h2>
              <h1 className='text-bookingdark mb-4 text-xl font-semibold dark:text-white'>
                Descripción Servicio
              </h1>
              <p className='text-bookinglight mb-2 dark:text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='mr-[10px] -mt-1 ml-[2px] inline-block h-4 w-4 text-gray-400'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                15 Minutes
              </p>
              <div className='text-green-500 mb-2 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='mr-[10px] ml-[2px] inline-block h-4 w-4'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <div className='-mt-1'>3:15, Friday, June 24, 2022</div>
              </div>
              <div>
                <p className='font-cal text-bookinglight font-medium dark:text-gray-300'>
                  Nombre Paciente
                </p>
              </div>
            </div>
            <div className='mt-8 sm:w-1/2 sm:pl-8 sm:pr-4'>
              <form>
                <div className='mb-4'>
                  <label
                    htmlFor='busqueda_cedula'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Busque un paciente
                  </label>
                  <div className='mt-1 flex'>
                    <input
                      ref={searchInputRef}
                      type='text'
                      id='busqueda_cedula'
                      required={false}
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Cédula'
                    />
                    <button
                      type='button'
                      onClick={searchPatient}
                      className='btn-confirm rounded-l-none h-9 mt-[0.05rem]'
                    >
                      Buscar
                    </button>
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='guests'
                    className='mb-1 block text-sm font-medium hover:cursor-pointer dark:text-white'
                  >
                    + Crear Paciente
                  </label>
                </div>
                <div className='flex items-start space-x-2 rtl:space-x-reverse'>
                  <button
                    type='submit'
                    data-testid='confirm-book-button'
                    className='btn-confirm'
                  >
                    Confirm
                  </button>
                  <button
                    type='button'
                    className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:bg-transparent dark:text-white dark:border-gray-800 dark:hover:bg-gray-800'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <div>
        <form>
          <div></div>
          <div>
            <button
              type='button'
              onClick={() => setIsCreatePatientEnabled(true)}
            >
              Crear Paciente
            </button>
            {isCreatePatientEnabled && (
              <div>
                <label htmlFor='nombre_en_crear'>Nombre</label>
                <input
                  ref={createPatientNameInputRef}
                  id='nombre_en_crear'
                  type='text'
                />
                <label htmlFor='cedula_en_crear'>Cédula</label>
                <input
                  ref={createPatientIdInputRef}
                  id='cedula_en_crear'
                  type='text'
                />
                <button type='button' onClick={createPatient}>
                  Crear
                </button>
              </div>
            )}
          </div>
          {patient && <p>{patient.nombre}</p>}
          <button
            type='button'
            onClick={onScheduleClick}
            disabled={!isScheduleButtonEnabled}
          >
            Agendar
          </button>
        </form>
      </div>
    </>
  )
}

export default Paciente
