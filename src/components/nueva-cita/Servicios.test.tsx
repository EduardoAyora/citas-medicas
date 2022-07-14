import { render, screen } from '@testing-library/react'
import nock from 'nock'

import Servicios from './Servicios'

const servicios = [
  {
    id: 1,
    costo: 15.5,
    descripcion: 'Consulta general',
    duracionEnMinutos: 20,
    usuario: {
      name: 'Eduardo',
    },
  },
  {
    id: 2,
    costo: 25,
    descripcion: 'Consulta con especialista de dermatología',
    duracionEnMinutos: 30,
    usuario: {
      name: 'Karen',
    },
  },
]

const host = process.env.HOST || ''
nock(host).get('/api/servicios').reply(
  200,
  JSON.stringify({
    servicios,
  })
)

describe('Servicios', () => {
  test('Consulta y muestra los servicios disponibles', async () => {
    render(<Servicios setService={() => {}} />)
    await screen.findByRole('button', {
      name: `${servicios[0].descripcion}-${servicios[0].usuario.name}`,
    })
    await screen.findByRole('button', {
      name: `${servicios[1].descripcion}-${servicios[1].usuario.name}`,
    })
  })
})
