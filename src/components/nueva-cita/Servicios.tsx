import { useEffect, useState } from 'react'
import Loading from '../common/Loading'

interface Props {
  setServiceId: (serviceId: number) => void
}

const Servicios: React.FC<Props> = ({ setServiceId }) => {
  const [servicios, setServicios] = useState<ServicioJSON[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      const servicesData = await fetch('/api/servicios')
      const services = await servicesData.json()
      setIsLoading(false)
      if (!servicesData.ok) return alert(services.message)
      const { servicios } = services
      setServicios(servicios)
    }
    fetchServices()
  }, [])

  if (isLoading) return <Loading />

  return (
    <main className='mx-auto max-w-3xl py-24 px-4'>
      {servicios.map((service, index) => (
        <li key={index}>
          <button
            onClick={() => setServiceId(service.id)}
            aria-label={`${service.descripcion}-${service.usuario.name}`}
          >
            {service.descripcion}
          </button>
        </li>
      ))}
      {/* <div className='mb-8 text-center'>
        <h1 className='font-cal mb-1 text-3xl text-neutral-900 dark:text-white'>
          Antonio Ochoa
        </h1>
        <p className='text-neutral-500 dark:text-white'></p>
      </div>
      <div className='space-y-6' data-testid='event-types'>
        <div
          style={{ display: 'flex' }}
          className='hover:border-brand group relative rounded-sm border border-neutral-200 bg-white hover:bg-gray-50 dark:border-neutral-700 dark:bg-gray-800 dark:hover:border-neutral-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            aria-hidden='true'
            className='absolute right-3 top-3 h-4 w-4 text-black opacity-0 transition-opacity group-hover:opacity-100 dark:text-white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14 5l7 7m0 0l-7 7m7-7H3'
            ></path>
          </svg>
          <a
            className='block w-full px-6 py-4'
            data-testid='event-type-link'
            href='/antonio-ochoa-wflg5m/30min'
          >
            <h2 className='grow font-semibold text-neutral-900 dark:text-white'>
              30 Min Meeting
            </h2>
            <div className='text-neutral-500 dark:text-white'>
              <ul className='mt-2 flex flex-wrap sm:flex-nowrap'>
                <li className='mr-4 mb-1 flex items-center whitespace-nowrap'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='mr-1.5 inline h-4 w-4 text-neutral-400'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  30m
                </li>
                <li className='mr-4 mb-1 flex items-center whitespace-nowrap'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='mr-1.5 inline h-4 w-4 text-neutral-400'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  1-on-1
                </li>
              </ul>
            </div>
          </a>
        </div>
        <div
          style={{ display: 'flex' }}
          className='hover:border-brand group relative rounded-sm border border-neutral-200 bg-white hover:bg-gray-50 dark:border-neutral-700 dark:bg-gray-800 dark:hover:border-neutral-600'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            aria-hidden='true'
            className='absolute right-3 top-3 h-4 w-4 text-black opacity-0 transition-opacity group-hover:opacity-100 dark:text-white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14 5l7 7m0 0l-7 7m7-7H3'
            ></path>
          </svg>
          <a
            className='block w-full px-6 py-4'
            data-testid='event-type-link'
            href='/antonio-ochoa-wflg5m/15min'
          >
            <h2 className='grow font-semibold text-neutral-900 dark:text-white'>
              15 Min Meeting
            </h2>
            <div className='text-neutral-500 dark:text-white'>
              <ul className='mt-2 flex flex-wrap sm:flex-nowrap'>
                <li className='mr-4 mb-1 flex items-center whitespace-nowrap'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='mr-1.5 inline h-4 w-4 text-neutral-400'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  15m
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div> */}
    </main>
  )
}

export default Servicios
