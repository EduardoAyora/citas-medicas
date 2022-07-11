import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import Layout from '../src/components/layout/Layout'

const adminLinks: Link[] = [{ name: 'Inicio', href: '/' }]
const doctorLinks: Link[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Pacientes', href: '/pacientes' },
  { name: 'Ver citas', href: '/citas' },
  { name: 'Disponibilidad', href: '/disponibilidad' },
]
const secretarioLinks: Link[] = [
  { name: 'Inicio', href: '/' },
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
        <Layout
          currentPath={currentPath}
          links={links}
          isDarkModeEnabled={isDarkModeEnabled(currentPath)}
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

  const linksWithCompletePath: Link[] = links.map((link) => {
    const indexOfThirdSlash = currentPath.indexOf(
      '/',
      currentPath.indexOf('/', currentPath.indexOf('/') + 1) + 1
    )
    if (indexOfThirdSlash !== -1)
      currentPath = currentPath.substring(0, indexOfThirdSlash)

    let href = `${currentPath}${link.href}`
    if (link.href === '/') href = currentPath
    return {
      ...link,
      href,
    }
  })
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

export const isDarkModeEnabled = currentPathMatcher('/agendar-cita')
