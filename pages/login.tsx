import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { Rol } from '@prisma/client'

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
    <div>
      <form>
        <div>
          <label htmlFor='username'>Usuario</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            id='username'
          />
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='password'
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={!isLoginButtonEnabled}
          type='button'
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default Login
