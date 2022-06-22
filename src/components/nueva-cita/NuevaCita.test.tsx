import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import NuevaCita from './NuevaCita'
import { Patient } from './Paciente'

const patient: Patient = {
  name: 'Eduardo',
  id: '0104236571',
}

const host = process.env.HOST || ''
nock(host)
  .get(`/api/servicio/1/horario-disponible/2022-05-26`)
  .reply(
    200,
    JSON.stringify({ horarioDisponible: ['10:40', '11:00', '11:40', '12:20'] })
  )
nock(host)
  .get(`/api/persona/${patient.id}`)
  .reply(200, JSON.stringify(patient))

describe('NuevaCita', () => {
  test('Seleccionar el horario y agendar cita para el paciente', async () => {
    render(<NuevaCita />)

    const hourButton = await screen.findByRole('button', { name: '11:00' })

    await userEvent.click(hourButton)

    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    await userEvent.type(searchBox, patient.id)
    await userEvent.click(searchButton)

    await screen.findByText(patient.name)
    await userEvent.click(screen.getByRole('button', { name: 'Agendar' }))
    screen.getByText('Se ha agendado la cita')
  })
})
