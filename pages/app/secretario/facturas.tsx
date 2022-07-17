import { Factura, Persona } from '@prisma/client'
import { useEffect, useState } from 'react'
import Loading from '../../../src/components/common/Loading'
import PageLayout from '../../../src/components/layout/PageLayout'

const Facturas = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [facturas, setFacturas] = useState<(Factura & { cliente: Persona })[]>(
    []
  )

  useEffect(() => {
    const fetchFacturas = async () => {
      setIsLoading(true)
      const facturasData = await fetch('/api/facturas')
      const { facturas } = await facturasData.json()
      setFacturas(facturas)
      setIsLoading(false)
    }
    fetchFacturas()
  }, [])

  return (
    <PageLayout
      pageTitle='Facturas'
      pageDescription='Mira las facturas que se han emitido'
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
                      {facturas.map(
                        (
                          {
                            cliente: {
                              nombre,
                              apellido,
                              email,
                              cedula,
                              celular,
                              direccion,
                            },
                            fecha,
                            total,
                            descripcionServicio,
                            precioServicio,
                          },
                          index
                        ) => {
                          return (
                            <tr key={index} className='flex px-6'>
                              <td className='hidden align-top ltr:pl-6 rtl:pr-6 sm:table-cell sm:w-64'>
                                <div className='py-4'>
                                  <div className='text-sm leading-6 text-gray-900'>
                                    {nombre} {apellido}
                                  </div>
                                  <div className='text-sm text-gray-500'>
                                    <span>Cédula: {cedula}</span>
                                  </div>
                                  <div className='text-sm text-gray-400'></div>
                                </div>
                              </td>
                              <td className='flex-1 ltr:pl-4 rtl:pr-4'>
                                <div className='py-4'>
                                  <div className='sm:hidden'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      <span>{nombre}</span>{' '}
                                      <small className='text-sm text-gray-500'>
                                        {apellido}
                                      </small>
                                    </div>
                                  </div>
                                  <div className='max-w-56 w-full truncate text-sm font-medium leading-6 text-neutral-900'>
                                    <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 w-full'>
                                      <div className='xl:col-span-3'>
                                        <span className='font-bold text-base'>
                                          Datos personales
                                        </span>
                                      </div>
                                      <div className='truncate'>
                                        <span className='font-bold'>
                                          Email:
                                        </span>{' '}
                                        {email}
                                      </div>
                                      <div className='truncate'>
                                        <span className='font-bold'>
                                          Celular:
                                        </span>{' '}
                                        {celular}
                                      </div>
                                      <div className='truncate'>
                                        <span className='font-bold'>
                                          Fecha:
                                        </span>{' '}
                                        {new Date(fecha).toLocaleDateString('es-ES')}
                                      </div>
                                      <div className='truncate xl:col-span-3'>
                                        <span className='font-bold'>
                                          Dirección:
                                        </span>{' '}
                                        {direccion}
                                      </div>
                                      <div className='xl:col-span-3'>
                                        <span className='font-bold text-base'>
                                          Detalles
                                        </span>
                                      </div>
                                      <div className='xl:col-span-2 truncate'>
                                        <span className='font-bold'>
                                          Concepto:
                                        </span>{' '}
                                        {descripcionServicio}
                                      </div>
                                      <div className='truncate'>
                                        <span className='font-bold'>
                                          Precio servicio:
                                        </span>{' '}
                                        {precioServicio.toString()}
                                      </div>
                                      <div className='xl:col-span-2'></div>
                                      <div className='truncate'>
                                        <span className='font-bold'>
                                          Total:
                                        </span>{' '}
                                        ${precioServicio.toString()}
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

export default Facturas
