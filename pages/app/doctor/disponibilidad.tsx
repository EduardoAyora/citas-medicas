import { useEffect, useReducer, useState } from 'react'

import PageLayout from '../../../src/components/layout/PageLayout'
import Combobox from '../../../src/components/common/Combobox'
import { getFormattedHourFromTimeInHours } from '../../../src/controllers/appointmentController'
import { useSession } from 'next-auth/react'
import { Dia, HorarioDia, Prisma, Servicio } from '@prisma/client'
import Loading from '../../../src/components/common/Loading'
import useSuccessError from '../../../src/hooks/modals/useSuccessError'
import SuccessErrorModal from '../../../src/components/common/SuccessErrorModal'

const Disponibilidad = () => {
  const { data } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isServiceParametersLoading, setIsServiceParametersLoading] =
    useState(false)
  const [service, setService] = useState<Servicio>()

  const [state, dispatch] = useReducer(reducer, createInitialState())

  const {
    isModalOpen,
    isSuccessModal,
    modalMessage,
    setIsModalOpen,
    showModal,
  } = useSuccessError()

  useEffect(() => {
    const getHorarios = async () => {
      setIsLoading(true)
      if (!data) return
      const servicioData = await fetch(
        `/api/doctores/${data.user.id}/servicio-con-horarios`
      )
      const { horarios, servicio } = await servicioData.json()
      configureInitialState(horarios)
      setIsLoading(false)
      setService(servicio)
    }
    getHorarios()
  }, [data])

  const configureInitialState = (horarios: HorarioDia[]) => {
    const initialState = createInitialState()
    horarios.forEach(({ dia, horaFin, horaInicio }) => {
      initialState[dia].inicio = horaInicio
      initialState[dia].fin = horaFin
    })
    dispatch({ type: actionTypes.SET_INITIAL_STATE, payload: initialState })
  }

  const saveServiceParameters = async () => {
    if (!data) return
    if (!service) return
    const costo = service.costo
    const descripcion = service.descripcion
    const duracion = service.duracionEnMinutos
    const body = {
      costo,
      descripcion,
      duracion,
    }
    setIsServiceParametersLoading(true)
    const response = await fetch(`/api/doctores/${data.user.id}/servicio`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setIsServiceParametersLoading(false)
    const { message } = await response.json()
    if (!response.ok)
      return showModal({
        message,
        isSuccess: false,
      })
    showModal({
      message,
      isSuccess: true,
    })
  }

  const onSaveClick = async () => {
    if (!data) return
    setIsLoading(true)
    const responseData = await fetch(
      `/api/doctores/${data.user.id}/servicio-con-horarios`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      }
    )
    setIsLoading(false)
    if (!responseData.ok)
      return showModal({
        message: 'Ocurrió un error al guardar los cambios',
        isSuccess: false,
      })
    const { message } = await responseData.json()
    showModal({ message, isSuccess: responseData.ok })
  }

  const comboboxOptions = Array.from(Array(24).keys()).map((hour) => ({
    value: hour.toString(),
    text: `${getFormattedHourFromTimeInHours(hour)}:00`,
  }))

  const days = [
    { texto: 'Lunes', dbEquivalent: Dia.LUNES },
    { texto: 'Martes', dbEquivalent: Dia.MARTES },
    { texto: 'Miércoles', dbEquivalent: Dia.MIERCOLES },
    { texto: 'Jueves', dbEquivalent: Dia.JUEVES },
    { texto: 'Viernes', dbEquivalent: Dia.VIERNES },
    { texto: 'Sábado', dbEquivalent: Dia.SABADO },
    { texto: 'Domingo', dbEquivalent: Dia.DOMINGO },
  ]

  return (
    <>
      <PageLayout
        pageTitle='Servicio'
        pageDescription='Establece información del servicio que ofreces'
      >
        {isLoading ? (
          <div className='flex justify-center items-center'>
            <Loading isDarkMode={false} />
          </div>
        ) : (
          <>
            <div className='lg:pb-4 grid xl:grid-cols-3 gap-6'>
              <div>
                <label
                  htmlFor='costo'
                  className='block text-sm font-medium text-gray-700'
                >
                  Costo:
                </label>
                <input
                  value={service && service.costo.toString()}
                  onChange={(e) => {
                    if (!service) return
                    setService({
                      ...service,
                      costo: new Prisma.Decimal(Number(e.target.value)),
                    })
                  }}
                  type='number'
                  name='costo'
                  id='costo'
                  placeholder='Costo'
                  className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
                />
              </div>
              <div>
                <label
                  htmlFor='descripcion'
                  className='block text-sm font-medium text-gray-700'
                >
                  Descripción:
                </label>
                <input
                  value={service && service.descripcion}
                  onChange={(e) => {
                    if (!service) return
                    setService({
                      ...service,
                      descripcion: e.target.value,
                    })
                  }}
                  type='text'
                  name='descripcion'
                  id='descripcion'
                  placeholder='Descripción'
                  className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
                />
              </div>
              <div>
                <label
                  htmlFor='duracion'
                  className='block text-sm font-medium text-gray-700'
                >
                  Duración en minutos:
                </label>
                <input
                  value={service && service.duracionEnMinutos}
                  onChange={(e) => {
                    if (!service) return
                    setService({
                      ...service,
                      duracionEnMinutos: Number(e.target.value),
                    })
                  }}
                  type='text'
                  name='duracion'
                  id='duracion'
                  placeholder='Duración en minutos'
                  className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
                />
              </div>
            </div>
            <div className='flex justify-end'>
              <button
                disabled={isServiceParametersLoading}
                onClick={saveServiceParameters}
                className={`button flex justify-center items-center px-4 relative ${
                  isServiceParametersLoading && 'cursor-default'
                }`}
              >
                {isServiceParametersLoading ? (
                  <div className='mt-1 ml-1'>
                    <Loading />
                  </div>
                ) : (
                  'Guardar'
                )}
              </button>
            </div>
          </>
        )}
      </PageLayout>
      <PageLayout
        pageTitle='Horas de trabajo'
        pageDescription='Cambia los horarios de inicio y fin de tu días'
      >
        <>
          <SuccessErrorModal
            isOpen={isModalOpen}
            isSuccess={isSuccessModal}
            message={modalMessage}
            setIsOpen={setIsModalOpen}
          />
          <div className='col-span-3 space-y-2 lg:col-span-2'>
            <div className='divide-y rounded-sm border border-gray-200 bg-white px-4 py-5 sm:p-6'>
              <h3 className='mb-5 text-base font-medium leading-6 text-gray-900'>
                Cambia los horarios de inicio y fin de tus días
              </h3>
              <fieldset className='divide-y divide-gray-200'>
                {isLoading ? (
                  <div className='w-full flex justify-center items-center mt-8'>
                    <Loading isDarkMode={false} />
                  </div>
                ) : (
                  days.map(({ texto, dbEquivalent }, index) => {
                    const isDayAvailable =
                      state[dbEquivalent].inicio !== null &&
                      state[dbEquivalent].fin !== null
                    if (isDayAvailable)
                      return (
                        <fieldset
                          key={index}
                          className='relative flex flex-col justify-between space-y-2 py-5 sm:flex-row sm:space-y-0'
                        >
                          <label className='flex space-x-2 rtl:space-x-reverse w-1/3'>
                            <div className='w-full'>
                              <input
                                defaultChecked={isDayAvailable}
                                onClick={() =>
                                  dispatch(
                                    enableOrDisableDayActionCreator(
                                      dbEquivalent
                                    )
                                  )
                                }
                                type='checkbox'
                                className='inline-block rounded-sm border-gray-300 text-neutral-900 focus:ring-neutral-500'
                              />
                              <span className='ml-2 inline-block text-sm capitalize'>
                                {texto}
                              </span>
                            </div>
                          </label>
                          <div className='flex-grow'>
                            <div className='space-y-2'>
                              <div className='flex items-center rtl:space-x-reverse'>
                                <div className='flex flex-grow sm:flex-grow-0'>
                                  <div className='flex flex-grow items-center space-x-3'>
                                    <Combobox
                                      options={comboboxOptions}
                                      selected={
                                        comboboxOptions.find(
                                          (comboboxOption) =>
                                            comboboxOption.value ==
                                            state[dbEquivalent].inicio
                                        ) || comboboxOptions[0]
                                      }
                                      setSelected={(hour: number) =>
                                        dispatch(
                                          changeStartHourActionCreator(
                                            dbEquivalent,
                                            hour
                                          )
                                        )
                                      }
                                    />
                                    <span>-</span>
                                    <Combobox
                                      options={comboboxOptions}
                                      selected={
                                        comboboxOptions.find(
                                          (comboboxOption) =>
                                            comboboxOption.value ==
                                            state[dbEquivalent].fin
                                        ) || comboboxOptions[0]
                                      }
                                      setSelected={(hour: number) =>
                                        dispatch(
                                          changeEndHourActionCreator(
                                            dbEquivalent,
                                            hour
                                          )
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      )
                    else
                      return (
                        <fieldset
                          key={index}
                          className='relative flex flex-col justify-between space-y-2 py-5 sm:flex-row sm:space-y-0'
                        >
                          <label className='flex space-x-2 rtl:space-x-reverse w-full'>
                            <div className='w-1/3'>
                              <input
                                defaultChecked={isDayAvailable}
                                onClick={() =>
                                  dispatch(
                                    enableOrDisableDayActionCreator(
                                      dbEquivalent
                                    )
                                  )
                                }
                                type='checkbox'
                                className='inline-block rounded-sm border-gray-300 text-neutral-900 focus:ring-neutral-500'
                              />
                              <span className='ml-2 inline-block text-sm capitalize'>
                                {texto}
                              </span>
                            </div>
                            <div className='flex-grow text-right text-sm text-gray-500 sm:flex-shrink'>
                              No disponible
                            </div>
                          </label>
                        </fieldset>
                      )
                  })
                )}
              </fieldset>
            </div>
            <div className='space-x-2 text-right'>
              <button
                onClick={onSaveClick}
                className='text-white inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent dark:text-darkmodebrandcontrast text-brandcontrast bg-gray-900 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900'
              >
                Guardar
              </button>
            </div>
          </div>
        </>
      </PageLayout>
    </>
  )
}

export default Disponibilidad

const createInitialState = (): {
  [dia: string]: { inicio: number | null; fin: number | null }
} => ({
  [Dia.LUNES]: {
    inicio: null,
    fin: null,
  },
  [Dia.MARTES]: {
    inicio: null,
    fin: null,
  },
  [Dia.MIERCOLES]: {
    inicio: null,
    fin: null,
  },
  [Dia.JUEVES]: {
    inicio: null,
    fin: null,
  },
  [Dia.VIERNES]: {
    inicio: null,
    fin: null,
  },
  [Dia.SABADO]: {
    inicio: null,
    fin: null,
  },
  [Dia.DOMINGO]: {
    inicio: null,
    fin: null,
  },
})

enum actionTypes {
  ENABLE_OR_DISABLE,
  CHANGE_START_HOUR,
  CHANGE_END_HOUR,
  SET_INITIAL_STATE,
}

const enableOrDisableDayActionCreator = (day: Dia) => ({
  type: actionTypes.ENABLE_OR_DISABLE,
  payload: day,
})

const changeStartHourActionCreator = (day: Dia, hour: number) => ({
  type: actionTypes.CHANGE_START_HOUR,
  payload: { day, hour },
})

const changeEndHourActionCreator = (day: Dia, hour: number) => ({
  type: actionTypes.CHANGE_END_HOUR,
  payload: { day, hour },
})

function reducer(
  state = createInitialState(),
  action: { type: number; payload: any }
) {
  switch (action.type) {
  case actionTypes.ENABLE_OR_DISABLE:
    if (
      state[action.payload].inicio === null ||
        state[action.payload].fin === null
    )
      return { ...state, [action.payload]: { inicio: 8, fin: 17 } }
    return {
      ...state,
      [action.payload]: { inicio: null, fin: null },
    }
  case actionTypes.CHANGE_START_HOUR:
    return {
      ...state,
      [action.payload.day]: {
        ...state[action.payload.day],
        inicio: action.payload.hour,
      },
    }
  case actionTypes.CHANGE_END_HOUR:
    return {
      ...state,
      [action.payload.day]: {
        ...state[action.payload.day],
        fin: action.payload.hour,
      },
    }
  case actionTypes.SET_INITIAL_STATE:
    return { ...action.payload }
  default:
    throw new Error()
  }
}
