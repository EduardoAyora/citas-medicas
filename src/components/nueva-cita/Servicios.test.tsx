import { render, screen } from '@testing-library/react'
import nock from 'nock'

import Servicios from './Servicios'

const host = process.env.HOST || ''
nock(host)
  .get('/api/servicios')
  .reply(200, JSON.stringify({ servicios: [{}, {}] }))

describe('Servicios', () => {
  test.skip('Consulta y muestra los servicios disponibles', () => {
    render(<Servicios />)
    screen.getByRole('button', { name: 'Consulta general' })
  })
})
