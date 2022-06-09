import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import Paciente, { Patient } from './Paciente'

const patientId = '0104236571'
const patient: Patient = {
  name: 'Eduardo',
}

const host = process.env.HOST || ''
nock(host).get(`/api/paciente/${patientId}`).reply(200, JSON.stringify(patient))

describe('Paciente', () => {
  beforeEach(() => {
    render(<Paciente />)
  })

  test('Buscar un paciente', async () => {
    const scheduleButton = screen.getByRole('button', { name: 'Agendar' })
    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    expect(scheduleButton).toBeDisabled()

    await userEvent.type(searchBox, patientId)
    userEvent.click(searchButton)

    await screen.findByText(patient.name)
    expect(scheduleButton).toBeEnabled()
  })

  test('Crear un paciente', () => {
    const scheduleButton = screen.getByRole('button', { name: 'Agendar' })
    const createButton = screen.getByRole('button', { name: 'Crear Paciente' })

    expect(scheduleButton).toBeDisabled()

    userEvent.click(createButton)
    userEvent.type(screen.getByLabelText('Nombre'), 'Eduardo')
    userEvent.click(screen.getByRole('button', { name: 'Crear' }))

    screen.getByText('Eduardo')
    expect(scheduleButton).toBeEnabled()
  })
})
