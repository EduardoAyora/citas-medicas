import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NuevaCita from './NuevaCita'

describe('NuevaCita', () => {
  test('Seleccionar el horario y agendar cita para el paciente', () => {
    render(<NuevaCita />)

    const hourButton = screen.getByRole('button', { name: '11:00' })

    userEvent.click(hourButton)

    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    userEvent.type(searchBox, '0104236571')
    userEvent.click(searchButton)

    screen.getByText('Eduardo')
    userEvent.click(screen.getByRole('button', { name: 'Agendar' }))
    screen.getByText('Se ha agendado la cita')
  })
})
