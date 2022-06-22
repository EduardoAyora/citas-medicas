import { render, screen } from '@testing-library/react'
import Layout from './Layout'

describe('Layout', () => {
  test('Renderiza el layout con los enlaces en la barra de navegación', () => {
    const links: Link[] = [
      { name: 'Inicio', href: '/' },
      { name: 'Horario', href: '/horario' },
    ]
    render(
      <Layout currentPath='/' links={links}>
        <div>children</div>
      </Layout>
    )
    screen.getByRole('link', { name: 'Inicio' })
    screen.getByRole('link', { name: 'Horario' })
  })
})
