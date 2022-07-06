import { useState, useRef } from 'react'
import { Persona } from 'prisma/prisma-client'

import Modal from '../common/SuccessErrorModal'
import MainCard from '../layout/MainCard'
import { ServicioJSON } from './Servicios'
import { getFormattedDateString } from '../../lib/dateFormatters'
import Loading from '../common/Loading'
import useSuccessErrorModal from '../../hooks/modals/useSuccessError'

interface Props {
  onScheduleClick: () => void
  servicio: ServicioJSON
  selectedDate: Date
  selectedHour: string
  onGoBack: () => void
}

const Paciente: React.FC<Props> = ({
  onScheduleClick,
  onGoBack,
  servicio,
  selectedDate,
  selectedHour,
}) => {
  const [isScheduleButtonEnabled, setIsScheduleButtonEnabled] =
    useState<boolean>(false)
  const [isCreatePatientEnabled, setIsCreatePatientEnabled] =
    useState<boolean>(false)
  const [patient, setPatient] = useState<Persona>()
  const [isPatientLoading, setIsPatientLoading] = useState<boolean>(false)
  const {
    isModalOpen,
    isSuccessModal,
    modalMessage,
    setIsModalOpen,
    showModal,
  } = useSuccessErrorModal()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const createPatientIdInputRef = useRef<HTMLInputElement>(null)
  const createPatientNameInputRef = useRef<HTMLInputElement>(null)
  const createPatientSurnameInputRef = useRef<HTMLInputElement>(null)
  const createPatientDirectionInputRef = useRef<HTMLInputElement>(null)
  const createPatientPhoneInputRef = useRef<HTMLInputElement>(null)
  const createPatientEmailInputRef = useRef<HTMLInputElement>(null)

  const searchPatient = async () => {
    const id = searchInputRef.current?.value
    setIsPatientLoading(true)
    const patientData = await fetch(`/api/personas/${id}`)
    const patient = await patientData.json()
    setIsPatientLoading(false)
    if (!patientData.ok) {
      setPatient(undefined)
      setIsScheduleButtonEnabled(false)
      showModal({ isSuccess: false, message: patient.message })
      return
    }
    setPatient(patient)
    setIsScheduleButtonEnabled(true)
    if (searchInputRef.current) searchInputRef.current.value = ''
  }

  const createPatient = async () => {
    const id = createPatientIdInputRef.current?.value
    const name = createPatientNameInputRef.current?.value
    const surname = createPatientSurnameInputRef.current?.value
    const direction = createPatientDirectionInputRef.current?.value
    const phone = createPatientPhoneInputRef.current?.value
    const email = createPatientEmailInputRef.current?.value
    setIsPatientLoading(true)
    const patientData = await fetch(`/api/personas`, {
      method: 'POST',
      body: JSON.stringify({
        cedula: id,
        nombre: name,
        apellido: surname,
        direccion: direction,
        celular: phone,
        email,
      }),
    })
    const patient = await patientData.json()
    setIsPatientLoading(false)
    if (!patientData.ok) {
      setPatient(undefined)
      setIsScheduleButtonEnabled(false)
      showModal({ isSuccess: false, message: patient.message })
      return
    }
    setPatient(patient)
    setIsScheduleButtonEnabled(true)
    showModal({
      isSuccess: true,
      message: 'El paciente se ha creado con éxito',
    })
  }

  return (
    <MainCard>
      <>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          message={modalMessage}
          isSuccess={isSuccessModal}
        />
        <div className='sm:w-1/2 sm:border-r sm:dark:border-gray-700'>
          <ul className=''>
            <li className='-mr-2 inline-block'>
              <span>
                <span></span>
              </span>
            </li>
          </ul>
          <h2 className='font-cal text-bookinglight mt-2 font-medium dark:text-gray-300'>
            {servicio.usuario.name}
          </h2>
          <h1 className='text-bookingdark mb-4 text-xl font-semibold dark:text-white'>
            {servicio.descripcion}
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
            {servicio.duracionEnMinutos} Minutos
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
            <div className='-mt-1'>
              {selectedHour}, {getFormattedDateString(selectedDate)},{' '}
              {selectedDate.getFullYear()}
            </div>
          </div>
          <div>
            <p className='font-cal text-bookinglight font-medium dark:text-gray-300'>
              {isPatientLoading ? (
                <Loading />
              ) : patient ? (
                <span>
                  <span className='font-bold'>Paciente: </span>
                  <span>{`${patient.nombre} ${patient.apellido}`}</span>
                </span>
              ) : (
                <span className='text-red-400'>Debe asignar un paciente</span>
              )}
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
              <button
                type='button'
                onClick={() => {
                  if (!isCreatePatientEnabled) setIsCreatePatientEnabled(true)
                  else setIsCreatePatientEnabled(false)
                }}
                className='mb-1 block text-sm font-medium hover:cursor-pointer dark:text-white'
              >
                {!isCreatePatientEnabled ? '+' : '-'} Crear Paciente
              </button>
            </div>

            {isCreatePatientEnabled && (
              <>
                <div className='mb-4'>
                  <label
                    htmlFor='cedula_en_crear'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Cédula
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={createPatientIdInputRef}
                      type='text'
                      id='cedula_en_crear'
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Cédula'
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='nombre_en_crear'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Nombre
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={createPatientNameInputRef}
                      type='text'
                      id='nombre_en_crear'
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Nombre'
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='apellido_en_crear'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Apellido
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={createPatientSurnameInputRef}
                      type='text'
                      id='apellido_en_crear'
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Apellido'
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='direccion_en_crear'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Dirección
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={createPatientDirectionInputRef}
                      type='text'
                      id='direccion_en_crear'
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Dirección'
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='celular_en_crear'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Celular
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={createPatientPhoneInputRef}
                      type='text'
                      id='celular_en_crear'
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Celular'
                    />
                  </div>
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='email_en_crear'
                    className='block text-sm font-medium text-gray-700 dark:text-white'
                  >
                    Email
                  </label>
                  <div className='mt-1'>
                    <input
                      ref={createPatientEmailInputRef}
                      type='text'
                      id='email_en_crear'
                      className='focus:border-brand block w-full rounded-sm border-gray-300 shadow-sm focus:ring-black disabled:bg-gray-200 disabled:hover:cursor-not-allowed dark:border-gray-900 dark:bg-gray-700 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500 sm:text-sm'
                      placeholder='Email'
                    />
                  </div>
                </div>
                <div className='flex items-start justify-end space-x-2 rtl:space-x-reverse mb-4'>
                  <button
                    type='button'
                    onClick={createPatient}
                    className='btn-confirm'
                  >
                    Crear Paciente
                  </button>
                </div>
              </>
            )}

            <div className='flex items-start space-x-2 rtl:space-x-reverse'>
              <button
                disabled={!isScheduleButtonEnabled}
                onClick={onScheduleClick}
                type='button'
                className={`btn-confirm ${
                  !isScheduleButtonEnabled && 'bg-gray-400'
                }`}
              >
                Agendar
              </button>
              <button
                onClick={onGoBack}
                type='button'
                className='inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-gray-300 text-gray-700 bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:bg-transparent dark:text-white dark:border-gray-600'
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </>
    </MainCard>
  )
}

export default Paciente
