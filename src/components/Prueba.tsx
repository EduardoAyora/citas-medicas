const Prueba = () => {
  return (
    <div className='bg-white dark:bg-gray-800 sm:dark:border-gray-600 border-bookinglightest rounded-md md:border max-w-5xl'>
      <div className='block p-4 sm:p-8 md:hidden'>
        <div>
          <ul className=''>
            <li className='-mr-2 inline-block'>
              <button data-state='closed' className='cursor-default'>
                <span>
                  <img
                    alt='Antonio Ochoa'
                    className='rounded-full h-auto w-9 border-2 dark:border-gray-800 border-white'
                    src='https://app.cal.com/antonio-ochoa-d7ksji/avatar.png'
                  />
                </span>
              </button>
            </li>
          </ul>
          <div className='mt-4'>
            <p className='break-words text-sm font-medium text-black dark:text-white'>
              Antonio Ochoa
            </p>
            <div className='mt-2 gap-2 dark:text-gray-100'>
              <h1 className='text-bookingdark mb-4 break-words text-xl font-semibold dark:text-white'>
                15 Min Meeting
              </h1>
              <div className='flex flex-col space-y-4'>
                <p className='text-gray-600 dark:text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4 text-gray-400'
                  >
                    <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z'></path>
                  </svg>
                  Cal Video
                </p>
                <p className='text-gray-600 dark:text-white'>
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
                <div data-state='closed'>
                  <button
                    type='button'
                    aria-controls='radix-:r1:'
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
                  <div data-state='closed' id='radix-:r1:'></div>
                </div>
                <div className='md:hidden'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 sm:flex sm:p-4 sm:py-5'>
        <div className='hidden overflow-hidden pr-8 sm:border-r sm:dark:border-gray-700 md:flex md:flex-col sm:w-1/3'>
          <ul className=''>
            <li className='-mr-2 inline-block'>
              <button data-state='closed' className='cursor-default'>
                <span>
                  <img
                    alt='Antonio Ochoa'
                    className='rounded-full h-auto w-10 border-2 dark:border-gray-800 border-white'
                    src='https://app.cal.com/antonio-ochoa-d7ksji/avatar.png'
                  />
                </span>
              </button>
            </li>
          </ul>
          <h2 className='mt-3 break-words font-medium text-gray-500 dark:text-gray-300'>
            Antonio Ochoa
          </h2>
          <h1 className='font-cal mb-4 break-words text-xl font-semibold text-gray-900 dark:text-white'>
            15 Min Meeting
          </h1>
          <div className='flex flex-col space-y-4'>
            <p className='text-gray-600 dark:text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
                className='mr-[10px] ml-[2px] -mt-1 inline-block h-4 w-4 text-gray-400'
              >
                <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z'></path>
              </svg>
              Cal Video
            </p>
            <p className='text-gray-600 dark:text-white'>
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
            <div data-state='closed'>
              <button
                type='button'
                aria-controls='radix-:r3:'
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
              <div data-state='closed' id='radix-:r3:'></div>
            </div>
          </div>
        </div>
        <div className='mt-8 w-full sm:mt-0 sm:min-w-[455px] sm:w-1/2 sm:border-r sm:pl-4 sm:pr-6 sm:dark:border-gray-700 md:w-1/3 '>
          <div className='mb-4 flex justify-between text-xl font-light'>
            <span className='w-1/2 dark:text-white'>
              <strong className='text-bookingdarker dark:text-white'>
                June
              </strong>{' '}
              <span className='text-bookinglight'>2022</span>
            </span>
            <div className='text-black dark:text-white'>
              <svg
                className='mt-[-9px] mr-1 inline h-5 w-5 animate-spin text-black dark:text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              <button
                className='group p-1 opacity-50 hover:opacity-100 ltr:mr-2 rtl:ml-2 disabled:text-bookinglighter hover:opacity-50'
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
              Sun
            </div>
            <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
              Mon
            </div>
            <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
              Tue
            </div>
            <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
              Wed
            </div>
            <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
              Thu
            </div>
            <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
              Fri
            </div>
            <div className='text-bookinglight my-4 text-xs uppercase tracking-widest'>
              Sat
            </div>
          </div>
          <div className='grid grid-cols-7 gap-2 text-center'>
            <div className='relative w-full pt-[100%]'>
              <div></div>
            </div>
            <div className='relative w-full pt-[100%]'>
              <div></div>
            </div>
            <div className='relative w-full pt-[100%]'>
              <div></div>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                1
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                2
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                3
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                4
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                5
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                6
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                7
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                8
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                9
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                10
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                11
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                12
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                13
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                14
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                15
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                16
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                17
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                18
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                19
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                20
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                21
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                22
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                23
                <span className=' absolute left-0 bottom-1 mx-auto w-full text-4xl'>
                  .
                </span>
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent bg-brand text-brandcontrast dark:bg-darkmodebrand dark:text-darkmodebrandcontrast'
                data-testid='day'
                data-disabled='true'
              >
                24
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                25
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                26
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                27
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                28
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                29
              </button>
            </div>
            <div className='relative w-full pt-[100%]'>
              <button
                className='hover:border-brand disabled:text-bookinglighter absolute top-0 left-0 right-0 bottom-0 mx-auto w-full rounded-sm border border-transparent text-center font-medium disabled:cursor-default disabled:border-transparent disabled:font-light dark:hover:border-white disabled:dark:border-transparent'
                data-testid='day'
                data-disabled='true'
              >
                30
              </button>
            </div>
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
        <div className='mt-8 flex flex-col text-center sm:mt-0 sm:w-1/3 sm:pl-4 md:-mb-5'>
          <div className='mb-4 text-left text-lg font-light text-gray-600'>
            <span className='text-bookingdarker w-1/2 dark:text-white'>
              <strong>Friday</strong>
              <span className='text-bookinglight'>, 24 June</span>
            </span>
          </div>
          <div className='flex-grow overflow-y-auto md:h-[364px]'>
            <div className='-mt-4 flex h-full w-full flex-col content-center items-center justify-center'>
              <h1 className='my-6 text-xl text-black dark:text-white'>
                All booked today.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prueba
