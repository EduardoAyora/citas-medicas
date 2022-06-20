import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import Layout from '../src/components/layout/Layout'

const adminLinks: Link[] = []
const doctorLinks: Link[] = [{ name: 'Ver citas', href: '/citas' }]
const secretarioLinks: Link[] = [
  { name: 'Ver citas', href: '/citas' },
  { name: 'Agendar cita', href: '/agendar-cita' },
]

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: AppProps) {
  const currentPath = appProps.router.pathname

  const links = getPageLinks(currentPath, {
    adminLinks,
    doctorLinks,
    secretarioLinks,
  })

  return (
    <SessionProvider session={session}>
      {isAppPage(currentPath) ? (
        <Layout links={links}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp

export const getPageLinks = (
  currentPath: string,
  linksByRole: {
    adminLinks: Link[]
    secretarioLinks: Link[]
    doctorLinks: Link[]
  }
): Link[] => {
  let links: Link[] = []
  const { adminLinks, doctorLinks, secretarioLinks } = linksByRole
  if (isAdminAppPage(currentPath)) links = adminLinks
  if (isDoctorAppPage(currentPath)) links = doctorLinks
  if (isSecretarioAppPage(currentPath)) links = secretarioLinks

  const linksWithCompletePath: Link[] = links.map((link) => ({
    ...link,
    href: `${currentPath}${link.href}`,
  }))
  return linksWithCompletePath
}

const currentPathMatcher = (
  regex: string
): ((currentPath: string) => boolean) => {
  return (currentPath: string): boolean => {
    return new RegExp(regex).test(currentPath)
  }
}

export const isAppPage = currentPathMatcher('/app')

export const isAdminAppPage = currentPathMatcher('/app/admin')

export const isSecretarioAppPage = currentPathMatcher('/app/secretario')

export const isDoctorAppPage = currentPathMatcher('/app/doctor')
