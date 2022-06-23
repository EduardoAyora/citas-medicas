import React, { Fragment, SetStateAction, useState } from 'react'
import MainCard from '../layout/MainCard'

interface Props {
  availableHours: string[]
  setHour: React.Dispatch<SetStateAction<string | undefined>>
}

const HorarioDia: React.FC<Props> = ({ availableHours, setHour }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const firstDayOfWeekOfMonth = getFirstDayOfWeekOfMonth(selectedDate)
  const lastDayOfMonth = getLastDayOfMonth(selectedDate)
  let dayNodesContentOfCurrentMonth = []
  const indexOfFinalNodeOfDay = firstDayOfWeekOfMonth + lastDayOfMonth - 1
  let currentDayOfMonth = 1
  for (let i = 0; i <= indexOfFinalNodeOfDay; i++) {
    if (i < firstDayOfWeekOfMonth) {
      dayNodesContentOfCurrentMonth.push(null)
      continue
    }
    dayNodesContentOfCurrentMonth.push(currentDayOfMonth)
    currentDayOfMonth++
  }

  return (
    <MainCard>
      <>
        <div className='sm:flex w-full'>
          <div className='text-gray-200 mt-8 w-full sm:mt-0 sm:min-w-[455px] sm:w-1/2 sm:border-r sm:pl-4 sm:pr-6 sm:dark:border-gray-700 md:w-1/3 '>
            <div className='mb-4 flex justify-between text-xl font-light'>
              <span className='w-1/2 dark:text-white'>
                <strong className='text-bookingdarker dark:text-white'>
                  Junio
                </strong>{' '}
                <span className='text-bookinglight'>2022</span>
              </span>
              <div className='text-black dark:text-white'>
                <button
                  className='group p-1 opacity-50 ltr:mr-2 rtl:ml-2 disabled:text-bookinglighter hover:opacity-50'
                  data-testid='decrementMonth'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='h-5 w-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
                <button
                  className='group p-1 opacity-50 hover:opacity-100'
                  data-testid='incrementMonth'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='h-5 w-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className='border-bookinglightest grid grid-cols-7 gap-4 border-t border-b text-center dark:border-gray-800 sm:border-0'>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Dom
              </div>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Lun
              </div>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Mar
              </div>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Mié
              </div>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Jue
              </div>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Vie
              </div>
              <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
                Sab
              </div>
            </div>
            <div className='grid grid-cols-7 gap-2 text-center'>
              {dayNodesContentOfCurrentMonth.map((day, index) => {
                if (day === null) {
                  return (
                    <div key={index} className='relative w-full pt-[100%]'>
                      <div></div>
                    </div>
                  )
                }
                return (
                  <div key={index} className='relative w-full pt-[100%]'>
                    <button
                      className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                      data-disabled='true'
                    >
                      {day}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='mt-4 ml-1 block sm:hidden'>
            <div data-state='closed'>
              <button
                type='button'
                aria-controls='radix-:r4:'
                aria-expanded='false'
                data-state='closed'
                className='min-w-32 text-bookinglight mb-1 -ml-2 px-2 py-1 text-left dark:text-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4 text-gray-400'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                America/Guayaquil
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='ml-1 -mt-1 inline-block h-4 w-4'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
              <div data-state='closed' id='radix-:r4:'></div>
            </div>
          </div>
          <div className='mt-8 flex flex-col text-center sm:mt-0 sm:w-full sm:pl-4 md:-mb-5'>
            <div className='mb-4 text-left text-lg font-light text-gray-600'>
              <span className='text-bookingdarker w-1/2 dark:text-white'>
                <strong>Viernes</strong>
                <span className='text-bookinglight'>, 24 Junio</span>
              </span>
            </div>
            <div className='flex-grow overflow-y-auto md:h-[364px] w-full'>
              {true ? (
                <Fragment>
                  {availableHours.map((availableHour, indice) => (
                    <div key={indice}>
                      <button
                        onClick={() => setHour(availableHour)}
                        className='text-white bg-primary-ligth w-full hover:bg-brand hover:text-brandcontrast mb-2 block rounded-sm py-4 font-medium hover:bg-white hover:text-gray-900'
                      >
                        {availableHour}
                      </button>
                    </div>
                  ))}
                </Fragment>
              ) : (
                <div className='-mt-4 flex h-full w-full flex-col content-center items-center justify-center'>
                  <h1 className='my-6 text-xl text-black dark:text-white'>
                    No hay horarios disponibles para este día
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </MainCard>
  )
}

export default HorarioDia

const getFirstDayOfWeekOfMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  return firstDay.getDay()
}

const getLastDayOfMonth = (date: Date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return lastDay.getDate()
}
