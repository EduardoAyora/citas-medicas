import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Paciente from './Paciente'

describe('Paciente', () => {
  beforeEach(() => {
    render(<Paciente />)
  })

  test('Buscar un paciente', () => {
    const scheduleButton = screen.getByRole('button', { name: 'Agendar' })
    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    expect(scheduleButton).toBeDisabled()

    userEvent.type(searchBox, '0104236571')
    userEvent.click(searchButton)

    screen.getByText('Eduardo')
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
