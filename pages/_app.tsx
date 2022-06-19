import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import Layout from '../src/components/layout/Layout'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const currentPath = appProps.router.pathname

  return (
    <SessionProvider session={session}>
      {isUserInDashboard(currentPath) ? (
        <Layout
          links={[
            { name: 'uno', href: '#' },
            { name: 'dos', href: '#' },
          ]}
        >
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp

const isUserInDashboard = (currentPath: string): boolean => {
  return /^\/app/.test(currentPath)
}
