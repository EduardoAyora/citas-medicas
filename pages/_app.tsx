import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className='min-h-screen bg-gray-50'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
