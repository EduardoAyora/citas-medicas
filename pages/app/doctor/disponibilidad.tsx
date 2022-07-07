import PageLayout from '../../../src/components/layout/PageLayout'

const Disponibilidad = () => {
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
                          <div className='text-sm shadow-sm w-[120px]'>
                            <span className=''></span>
                            <div className='flex cursor-default text-gray-700 border items-center h-10 px-2 justify-between border-gray-300 hover:border-gray-400'>
                              <div className=''>
                                <div className=''>9:00am</div>
                              </div>
                              <div className=''>
                                <div className='' aria-hidden='true'>
                                  <svg
                                    height='20'
                                    width='20'
                                    viewBox='0 0 20 20'
                                    aria-hidden='true'
                                    focusable='false'
                                    className='fill-gray-400 hover:fill-gray-500'
                                  >
                                    <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span>-</span>
                          <div className='text-sm shadow-sm w-[120px]'>
                            <span className=''></span>
                            <div className='flex cursor-default text-gray-700 border items-center h-10 px-2 justify-between border-gray-300 hover:border-gray-400'>
                              <div className=''>
                                <div className=''>11:00am</div>
                              </div>
                              <div className=''>
                                <div className='' aria-hidden='true'>
                                  <svg
                                    height='20'
                                    width='20'
                                    viewBox='0 0 20 20'
                                    aria-hidden='true'
                                    focusable='false'
                                    className='fill-gray-400 hover:fill-gray-500'
                                  >
                                    <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
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
