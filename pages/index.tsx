import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Home: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div>
      <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='relative grid items-center grid-cols-2 lg:grid-cols-3'>
          <ul className='items-center hidden space-x-8 lg:flex'>
            {/* <li>
              <Link
                href='/'
                aria-label='Product pricing'
                title='Product pricing'
                className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
              >
                Pricing
              </Link>
            </li> */}
          </ul>
          <Link href='/' aria-label='agendaling' title='Agendaling'>
            <a className='inline-flex items-center lg:mx-auto'>
              <Image
                alt='logo-eduardo-ayora'
                src='/images/logo/celeste-EA.png'
                width={40}
                height={40}
              />
              <span className='ml-2 text-xl font-bold tracking-wide text-gray-800'>
                Agendaling.com
              </span>
            </a>
          </Link>
          <ul className='items-center hidden ml-auto space-x-8 lg:flex'>
            <li>
              <Link href='/login' title='Login'>
                <a className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none'>
                  Login
                </a>
              </Link>
            </li>
          </ul>
          <div className='ml-auto lg:hidden'>
            <button
              aria-label='Open Menu'
              title='Open Menu'
              className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                />
                <path
                  fill='currentColor'
                  d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                />
                <path
                  fill='currentColor'
                  d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className='absolute top-0 left-0 w-full'>
                <div className='p-5 bg-white border rounded shadow-sm'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <Link href='/' title='Agendaling'>
                        <a className='inline-flex items-center lg:mx-auto'>
                          <Image
                            alt='logo-eduardo-ayora'
                            src='/images/logo/celeste-EA.png'
                            width={40}
                            height={40}
                          />
                          <span className='ml-2 text-xl font-bold tracking-wide text-gray-800'>
                            Agendaling.com
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label='Close Menu'
                        title='Close Menu'
                        className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                          <path
                            fill='currentColor'
                            d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className='space-y-4'>
                      {/* <li>
                        <Link
                          href='/'
                          aria-label='Product pricing'
                          title='Product pricing'
                          className='font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                        >
                          Pricing
                        </Link>
                      </li> */}
                      <li>
                        <Link href='/login' title='Login'>
                          <a className='inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none'>
                            Login
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='pb-16 flex flex-col items-center justify-center px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:pt-32 md:px-0'>
        <div className='flex flex-col items-center max-w-2xl md:px-8'>
          <div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12'>
            <div>
              <p className='inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-300'>
                Regístrate
              </p>
            </div>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
              <span className='relative inline-block'>
                <svg
                  viewBox='0 0 52 24'
                  fill='currentColor'
                  className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
                >
                  <defs>
                    <pattern
                      id='192913ce-1f29-4abd-b545-0fbccfd2b0ec'
                      x='0'
                      y='0'
                      width='.135'
                      height='.30'
                    >
                      <circle cx='1' cy='1' r='.7' />
                    </pattern>
                  </defs>
                  <rect
                    fill='url(#192913ce-1f29-4abd-b545-0fbccfd2b0ec)'
                    width='52'
                    height='24'
                  />
                </svg>
                <span className='relative'>Sistema</span>
              </span>{' '}
              de agendamiento de citas para tu empresa
            </h2>
            <p className='text-base text-gray-700 md:text-lg'>
              Solo tienes que configurar horarios de atención y tus clientes
              podrán agendar citas.
            </p>
          </div>
          <form className='flex flex-col items-center w-full mb-4'>
            <input
              placeholder='Email'
              type='text'
              className='flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
            />
            <input
              placeholder='Contraseña'
              type='password'
              className='flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
            />
            <input
              placeholder='Confirmar contraseña'
              type='password'
              className='flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
            />
            <button
              type='button'
              className='inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none'
            >
              Registrarse
            </button>
          </form>
          <p className='max-w-md mb-10 text-xs text-gray-600 sm:text-sm md:text-center'>
            Puedes empezar a utilizar el sistema sin costo alguno.
          </p>
        </div>
        <Image
          src='/images/landing-page/fondo-calendario.png'
          className='w-full max-w-screen-sm mx-auto rounded shadow-2xl md:w-auto lg:max-w-screen-md'
          alt=''
          width={1400}
          height={640}
        />
      </div>
    </div>
  )
}

export default Home
