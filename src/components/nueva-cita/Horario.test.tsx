import { render, screen } from '@testing-library/react'

import HorarioDia from './Horario'

describe('HorarioDia', () => {
  test('Muestra un listado con la disponibilidad de horario', () => {
    const availableHours: string[] = ['10:40', '11:00', '11:40', '12:20']
    render(<HorarioDia availableHours={availableHours} />)

    screen.getByRole('button', { name: '10:40' })
    screen.getByRole('button', { name: '11:00' })
    screen.getByRole('button', { name: '11:40' })
    screen.getByRole('button', { name: '12:20' })
  })
})
