import Image from 'next/image'
import Link from 'next/link'
import { LogoutIcon } from '@heroicons/react/solid'
import { signOut } from 'next-auth/react'

interface Props {
  links: Link[]
  currentPath: string
  children: JSX.Element
  isDarkModeEnabled: boolean
}

const Layout: React.FC<Props> = ({
  links,
  currentPath,
  children,
  isDarkModeEnabled = false,
}) => {
  return (
    <div className='h-screen bg-gray-100'>
      <div className='sidebar z-10 absolute bg-white min-h-screen w-[3.25rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg'>
        <div className='flex h-screen flex-col justify-between pt-2 pb-6'>
          <div>
            <div className='w-max p-2.5'>
              <Image
                src='/images/logo/logo-EA.png'
                className='w-8'
                height='32'
                width='32'
                alt='Logo'
              />
            </div>
            <ul className='mt-6 space-y-2 tracking-wide'>
              {links.map((link, index) => (
                <li key={index} className='min-w-max'>
                  <Link href={link.href} aria-label='dashboard'>
                    <a
                      className={`relative flex items-center space-x-4 bg-gradient-to-r px-4 py-3 ${
                        currentPath === link.href &&
                        'from-sky-600 to-cyan-400 text-white'
                      }`}
                    >
                      <svg
                        className='-ml-1 h-6 w-6'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z'
                          className='fill-current text-cyan-400 dark:fill-slate-600'
                        ></path>
                        <path
                          d='M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z'
                          className='fill-current text-cyan-200 group-hover:text-cyan-300'
                        ></path>
                        <path
                          d='M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z'
                          className='fill-current group-hover:text-sky-300'
                        ></path>
                      </svg>
                      <span className='-mr-1 font-medium'>{link.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-max -mb-3'>
            <button
              onClick={() => signOut()}
              className='group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600'
            >
              <LogoutIcon className='h-5 w-5 group-hover:fill-cyan-600' />
              <span className='group-hover:text-gray-700'>Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`pl-14 h-screen overflow-y-auto ${
          isDarkModeEnabled && 'dark:bg-primary-dark'
        }`}
      >
        <div className='mx-auto px-4 sm:px-6 lg:px-20 xl:px-32'>
          <div className='py-10'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
