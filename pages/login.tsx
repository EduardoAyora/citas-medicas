import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

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
    if (result && !result.error) {
      router.replace('/')
    }
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
