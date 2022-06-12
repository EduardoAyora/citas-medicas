import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import Paciente, { Patient } from './Paciente'

const patient: Patient = {
  name: 'Eduardo',
  id: '0104236571',
}

const host = process.env.HOST || ''
nock(host)
  .get(`/api/paciente/${patient.id}`)
  .reply(200, JSON.stringify(patient))

nock(host)
  .post(
    `/api/paciente`,
    (body) => body.id === patient.id && body.name === patient.name
  )
  .reply(200, JSON.stringify(patient))

describe('Paciente', () => {
  const onScheduleClick = jest.fn()
  beforeEach(() => {
    render(<Paciente onScheduleClick={onScheduleClick} />)
  })

  afterEach(() => {
    onScheduleClick.mockClear()
  })

  test('Buscar un paciente', async () => {
    const scheduleButton = screen.getByRole('button', { name: 'Agendar' })
    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    expect(scheduleButton).toBeDisabled()

    await userEvent.type(searchBox, patient.id)
    await userEvent.click(searchButton)

    await screen.findByText(patient.name)
    expect(scheduleButton).toBeEnabled()
    await userEvent.click(scheduleButton)

    expect(onScheduleClick).toHaveBeenCalledTimes(1)
  })

  test('Crear un paciente', async () => {
    const scheduleButton = screen.getByRole('button', { name: 'Agendar' })
    const createButton = screen.getByRole('button', { name: 'Crear Paciente' })

    expect(scheduleButton).toBeDisabled()

    await userEvent.click(createButton)
    await userEvent.type(screen.getByLabelText('Nombre'), patient.name)
    await userEvent.type(screen.getByLabelText('Cédula'), patient.id)
    await userEvent.click(screen.getByRole('button', { name: 'Crear' }))

    await screen.findByText(patient.name)
    expect(scheduleButton).toBeEnabled()
    await userEvent.click(scheduleButton)

    expect(onScheduleClick).toHaveBeenCalledTimes(1)
  })
})
