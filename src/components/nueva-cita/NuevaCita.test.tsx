import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import NuevaCita from './NuevaCita'

const patient = {
  nombre: 'Eduardo',
  apellido: 'Ayora',
  cedula: '0104236571',
}
const servicio = {
  id: 1,
  descripcion: 'Consulta general',
  usuario: { name: 'Eduardo' },
}

const host = process.env.HOST || ''

nock(host)
  .get('/api/servicios')
  .reply(200, JSON.stringify({ servicios: [servicio] }))
nock(host)
  .get(/\/api\/servicios\/1\/horario-disponible\/.*/)
  .reply(
    200,
    JSON.stringify({ horarioDisponible: ['10:40', '11:00', '11:40', '12:20'] })
  )
nock(host)
  .get(`/api/personas/${patient.cedula}`)
  .reply(200, JSON.stringify(patient))
nock(host).post(`/api/servicios/1/citas`).reply(200, JSON.stringify({}))

describe('NuevaCita', () => {
  test('Seleccionar el horario y agendar cita para el paciente', async () => {
    render(<NuevaCita />)

    const serviceButton = await screen.findByRole('button', {
      name: `${servicio.descripcion}-${servicio.usuario.name}`,
    })
    await userEvent.click(serviceButton)
    const hourButton = await screen.findByRole('button', { name: '11:00' })

    await userEvent.click(hourButton)

    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    await userEvent.type(searchBox, patient.cedula)
    await userEvent.click(searchButton)

    await screen.findByText(`${patient.nombre} ${patient.apellido}`)
    await userEvent.click(screen.getByRole('button', { name: 'Agendar' }))
    await screen.findByText('Se ha agendado la cita')
  })
})
