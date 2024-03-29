import { CurrencyDollarIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import Loading from '../../../src/components/common/Loading'
import PageLayout from '../../../src/components/layout/PageLayout'

const DiarioCaja = () => {
  const [cobros, setCobros] = useState<
    {
      nombre: string
      apellido: string
      total: string
      descripcionServicio: string
    }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCobros = async () => {
      setIsLoading(true)
      const cobrosData = await fetch('/api/diario-caja')
      const { cobrosDelDia } = await cobrosData.json()
      setCobros(cobrosDelDia)
      setIsLoading(false)
    }
    fetchCobros()
  }, [])

  const totalEnCaja = cobros.reduce(
    (total, cobro) => total + parseInt(cobro.total),
    0
  )

  return (
    <PageLayout
      pageTitle='Diario de Caja'
      pageDescription='Revise cuanto dinero debería haber en caja'
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
                      {cobros.map(
                        (
                          { nombre, apellido, total, descripcionServicio },
                          index
                        ) => {
                          return (
                            <tr key={index} className='flex px-6'>
                              <td className='hidden align-top ltr:pl-6 rtl:pr-6 sm:table-cell sm:w-64'>
                                <div className='py-4'>
                                  <div className='text-sm leading-6 text-gray-900 flex items-center'>
                                    <CurrencyDollarIcon className='mr-2 h-6 w-6' />
                                    {nombre} {apellido}
                                  </div>
                                  <div className='text-sm text-gray-400'></div>
                                </div>
                              </td>
                              <td className='flex-1 ltr:pl-4 rtl:pr-4'>
                                <div className='py-4'>
                                  <div className='sm:hidden'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      <span>formattedDate</span>{' '}
                                      <small className='text-sm text-gray-500'>
                                        time
                                      </small>
                                    </div>
                                  </div>
                                  <div
                                    title='30 Min Meeting between Antonio Ochoa and Eduardo Ayora'
                                    className='max-w-56 truncate text-sm font-medium leading-6 text-neutral-900 md:max-w-max'
                                  >
                                    {descripcionServicio}
                                  </div>
                                </div>
                              </td>
                              <td className='whitespace-nowrap py-4 text-right text-sm font-medium ltr:pr-4 rtl:pl-4'>
                                <div className='hidden space-x-2 rtl:space-x-reverse lg:block'>
                                  <div className='inline-flex px-3 items-center text-lg font-bold rounded-sm relative text-gray-700 bg-white hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:bg-transparent'>
                                    ${total}
                                  </div>
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
              {!isLoading && (
                <div className='p-4 text-right'>
                  <div className='inline-flex items-end px-3 py-2 rounded-sm relative text-gray-900 bg-transparent cursor-not-allowed'>
                    Debe haber{' '}
                    <span className='text-2xl font-bold ml-2'>
                      ${totalEnCaja}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}

export default DiarioCaja
