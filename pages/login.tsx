import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { Rol } from '@prisma/client'
import { LockClosedIcon } from '@heroicons/react/solid'

const Login: NextPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] =
    useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (username && password) setIsLoginButtonEnabled(true)
    else setIsLoginButtonEnabled(false)
  }, [username, password])

  const handleLogin = async () => {
    const result = await signIn<'credentials'>('credentials', {
      redirect: false,
      username,
      password,
    })
    if (!result || result.error) return
    const session = await getSession()
    if (!session) return
    const { user } = session
    if (user.role === Rol.SECRETARY) return router.replace('/app/secretario')
    if (user.role === Rol.DOCTOR) return router.replace('/app/doctor')
    if (user.role === Rol.ADMIN) return router.replace('/app/admin')
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Ingresa en tu cuenta
            </h2>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='username' className='sr-only'>
                  Usuario
                </label>
                <input
                  id='username'
                  onChange={(e) => setUsername(e.target.value)}
                  type='text'
                  value={username}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Usuario'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Contraseña
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  type='password'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Contraseña'
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={!isLoginButtonEnabled}
                type='button'
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isLoginButtonEnabled
                    ? 'focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700'
                    : 'focus:ring-gray-500 bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className={`h-5 w-5 ${
                      isLoginButtonEnabled
                        ? 'text-indigo-500 group-hover:text-indigo-400'
                        : 'text-gray-500 group-hover:text-gray-400'
                    } `}
                    aria-hidden='true'
                  />
                </span>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
